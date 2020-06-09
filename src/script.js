let listItems = document.getElementById('items');
let dataList = [];

let currentItem;
let isEditing = false;

window.onload = loadListItems();

let sortable = Sortable.create(listItems, { 
    onEnd: function() {
        updateDataList();
    }
});

function addItem(){

    if(document.getElementById('addTextButton').style.visibility == 'visible'){
        alert('You have to finish the current item before adding another one');
        return;
    }

    switchAllButtonsVisibility();

    let newItem = createItem('','');
    currentItem = newItem;
    
    listItems.appendChild(newItem);

    itemsAmount++;
}

function addText(){
    let inputText = prompt('Enter a description: ');
    while(inputText.length < 1 || inputText.length > 300){
        alert('The description must be between 1-300 characters.');
        inputText = prompt(' Please enter a new description.');
    }

    currentItem.getElementsByTagName('p')[0].innerHTML = inputText;
}

function submitItem(){
    if(!isEditing){
        let imageText = currentItem.getElementsByTagName('p')[0].innerHTML;
        let imageSrc = currentItem.getElementsByTagName('img')[0].src;

        if(imageText == '' || imageText == 'Your Description'){
            alert('You must insert a text');
            return;
        }

        if(!imageSrc.startsWith('data')){
            alert('You must have an image');
            return;
        }

        let newItem = {imageText, imageSrc};
        dataList.push(newItem);
        
        updateCounter();
        
    }

    isEditing = false;

    updateDataList();

    switchAllButtonsVisibility();
    switchEditAndDeleteVisibility(currentItem);
}

function deleteItem(){
    listItems.removeChild(currentItem);    
    itemsAmount--;
    updateCounter();

    for (let i = 0; i < dataList.length; i++) {  
        if(dataList[i].imageSrc == currentItem.getElementsByTagName('img')[0].src){
            dataList.splice(i,1);
        }    
    }

    localStorage.setItem('items',JSON.stringify(dataList));
}

function switchAllButtonsVisibility(){
    switchButtonVisibility('addTextButton');
    switchButtonVisibility('addImageButton');
    switchButtonVisibility('submitItemButton');
}

function switchButtonVisibility(id){
    if(document.getElementById(id).style.visibility == 'hidden'){
        document.getElementById(id).style.visibility = 'visible';
    }else{
        document.getElementById(id).style.visibility = 'hidden';
    }
}

function switchEditAndDeleteVisibility(item){
    item.querySelector('#editItemButton').style.visibility = 'visible';
    item.querySelector('#deleteItemButton').style.visibility = 'visible';
}

function createItem(newText,newImage){
    let newItem = document.createElement('div');
    newItem.setAttribute('class', 'list-item');
    newItem.style.border = '2px solid lightblue';

    let image = document.createElement('img');
    image.height = 320;
    image.width = 320;
    newItem.appendChild(image);
    if(newImage == ''){
        newItem.getElementsByTagName('img')[0].src = 'images/image-placeHolder.png';
    }else{
        newItem.getElementsByTagName('img')[0].src = newImage;
    }

    let column = document.createElement('div');
    column.setAttribute('class','column-items');
    newItem.appendChild(column);

    let description = document.createElement('p');
    column.appendChild(description);
    if(newText == ''){
        newItem.getElementsByTagName('p')[0].innerHTML = 'Your Description'
    }else{
        newItem.getElementsByTagName('p')[0].innerHTML = newText;
    }
    
    let realEditButton = document.createElement('input');
    realEditButton.setAttribute('type','file');
    realEditButton.setAttribute('accept','image/*');
    realEditButton.setAttribute('id','realEditItemButton');
    realEditButton.setAttribute('hidden','hidden');
    realEditButton.style.marginLeft = '100px';
    realEditButton.style.visibility = 'hidden';
    column.appendChild(realEditButton);

    let row = document.createElement('div');
    row.setAttribute('class','row-items');
    column.appendChild(row);

    let editButton = document.createElement('input');
    editButton.setAttribute('type','button');
    editButton.setAttribute('id','editItemButton');
    editButton.setAttribute('value','Edit Item');
    editButton.setAttribute('class','editButton');
    editButton.addEventListener('click', function (e) {
        if(document.getElementById('submitItemButton').style.visibility == 'visible'){
            alert('You have to finish the current item before interacting with another one');
            return;
        }
        if(isEditing){
            alert('You have to finish editing the current item before editing another one');
            return;
        }
        currentItem = editButton.closest('div.list-item');
        isEditing = true;
        switchAllButtonsVisibility();
    }, false);
    editButton.style.visibility = 'hidden';
    row.appendChild(editButton);

    let deleteButton = document.createElement('input');
    deleteButton.setAttribute('type','button');
    deleteButton.setAttribute('id','deleteItemButton');
    deleteButton.setAttribute('value','Delete Item');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.addEventListener('click', function (e) {
        if(document.getElementById('addTextButton').style.visibility == 'visible'){
            alert('You have to finish the current item before deleting another one');
            return;
        }
        currentItem = deleteButton.closest('div.list-item'); 
        deleteItem();
    }, false);
    deleteButton.style.visibility = 'hidden';
    row.appendChild(deleteButton);

    return newItem;
}

function updateCounter(){
    localStorage.setItem('counter',itemsAmount);
    document.getElementById('counter').innerHTML = 'Counter: ' + itemsAmount;
}

function loadListItems() {
    itemsAmount = localStorage.getItem('counter');
    if(itemsAmount > 0){
        document.getElementById('counter').innerText = 'Counter: ' + itemsAmount;
        let localStorageDataList = localStorage.getItem('items');
        dataList = JSON.parse(localStorageDataList);
    }else{
        localStorage.setItem('items','[]');
    }
    
    for (let i = 0; i < dataList.length; i++) {
        let newItem = createItem(dataList[i].imageText,dataList[i].imageSrc)
        switchEditAndDeleteVisibility(newItem);
        listItems.appendChild(newItem);
    }
}

function updateDataList(){
    for (let i = 0; i < listItems.childNodes.length; i++) {              
        dataList[i] = {imageText: listItems.childNodes[i].querySelector('p').innerHTML, imageSrc: listItems.childNodes[i].querySelector('img').src};
    }
    localStorage.setItem('items',JSON.stringify(dataList));
}

const realButton = document.getElementById('real-button');
const addImageButton = document.getElementById('addImageButton');

let loadFile = function(event) {
    let newImg = new Image();
    newImg.onload = function () {
        if(this.width == 320 && this.height == 320){
            let reader = new FileReader();    
            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = function() {
                let base64data = reader.result;
                currentItem.getElementsByTagName('img')[0].src = base64data;
            }
        }else{
            alert('Wrong dimensions. It has to be 320x320');
        }
    } 
    newImg.src = URL.createObjectURL(event.target.files[0]);
};

addImageButton.addEventListener('click', function(){
    realButton.click();
});