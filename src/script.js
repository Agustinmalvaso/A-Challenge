var listItems = document.getElementById('items');
var dataList = [];

var currentItem;
var isEditing = false;
var itemsAmount = dataList.length;

var sortable = Sortable.create(listItems, { 
    onEnd: function() {
        updateDataList();
    }
});

loadListItems();

function addItem(){

    if(document.getElementById('addTextButton').style.visibility == 'visible'){
        alert('You have to finish the current item before adding another one');
        return;
    }

    switchAllButtonsVisibility();

    var newItem = createItem('','');
    currentItem = newItem;
    
    listItems.appendChild(newItem);

    itemsAmount++;
}

function addText(){
    var inputText = prompt('Enter a description: ');
    while(inputText.length < 1 || inputText.length > 300){
        alert('The description must be between 1-300 characters.');
        inputText = prompt(' Please enter a new description.');
    }

    currentItem.getElementsByTagName('p')[0].innerHTML = inputText;
}

function submitItem(){
    var imageText = currentItem.getElementsByTagName('p')[0].innerHTML;
    var imageSrc = currentItem.getElementsByTagName('img')[0].src;

    if(imageText == '' || imageText == 'Your Description'){
        alert('You must insert a text');
        return;
    }

    if(!imageSrc.startsWith('blob')){
        alert('You must have an image');
        return;
    }
    
    var newItem = {imageText, imageSrc, id: itemsAmount};
    dataList.push(newItem);
    
    document.getElementById('counter').innerHTML = 'Counter: ' + itemsAmount;

    isEditing = false;

    switchAllButtonsVisibility();
    switchEditAndDeleteVisibility();
}

function deleteItem(){
    listItems.removeChild(currentItem);    
    itemsAmount--;
    document.getElementById('counter').innerHTML = 'Counter: ' + itemsAmount;

    for (let i = 0; i < dataList.length; i++) {  
        if(dataList[i].image == currentItem.getElementsByTagName('img')[0].src){
            dataList.splice(i,1);
        }    
    }

    switchAllButtonsVisibility();
    
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

function switchEditAndDeleteVisibility(){
    currentItem.querySelector('#editItemButton').style.visibility = 'visible';
    currentItem.querySelector('#deleteItemButton').style.visibility = 'visible'
}

function createItem(newText,newImage){
    var newItem = document.createElement('div');
    newItem.setAttribute('id', itemsAmount);
    newItem.setAttribute('class', 'list-item');
    newItem.style.border = '2px solid lightblue';

    var image = document.createElement('img');
    image.setAttribute('id','image'+itemsAmount);
    image.height = 320;
    image.width = 320;
    newItem.appendChild(image);
    if(newImage == ''){
        newItem.getElementsByTagName('img')[0].src = 'images/image-placeHolder.png';
    }else{
        newItem.getElementsByTagName('img')[0].src = newImage;
    }

    var column = document.createElement('div');
    column.setAttribute('class','column-items');
    newItem.appendChild(column);

    var description = document.createElement('p');
    column.appendChild(description);
    if(newText == ''){
        newItem.getElementsByTagName('p')[0].innerHTML = 'Your Description'
    }else{
        newItem.getElementsByTagName('p')[0].innerHTML = newText;
    }
    
    var realEditButton = document.createElement('input');
    realEditButton.setAttribute('type','file');
    realEditButton.setAttribute('accept','image/*');
    realEditButton.setAttribute('id','realEditItemButton');
    realEditButton.setAttribute('hidden','hidden');
    realEditButton.style.marginLeft = '100px';
    realEditButton.style.visibility = 'hidden';
    column.appendChild(realEditButton);

    var row = document.createElement('div');
    row.setAttribute('class','row-items');
    column.appendChild(row);

    var editButton = document.createElement('input');
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

    var deleteButton = document.createElement('input');
    deleteButton.setAttribute('type','button');
    deleteButton.setAttribute('id','deleteItemButton');
    deleteButton.setAttribute('value','Delete Item');
    deleteButton.setAttribute('onclick','deleteItem()');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.style.visibility = 'hidden';
    row.appendChild(deleteButton);

    return newItem;
}

function loadListItems() {
    for (let i = 0; i < dataList.length; i++) {
        listItems.appendChild(createItem(dataList[i].imageText,dataList[i].imageSrc,dataList[i].id));
    }
}

function updateDataList(){
    for (let i = 0; i < listItems.childNodes.length; i++) {              
        dataList[i] = {imageText: listItems.childNodes[i].querySelector('p').innerHTML, imageSrc: listItems.childNodes[i].querySelector('img').src, id: listItems.childNodes[i].getAttribute('id')};
    }
}

const realButton = document.getElementById('real-button');
const addImageButton = document.getElementById('addImageButton');

var loadFile = function(event) {
    var newImg = new Image();
    newImg.onload = function () {
        if(this.width == 320 && this.height == 320){
            currentItem.getElementsByTagName('img')[0].src = URL.createObjectURL(event.target.files[0]);
        }else{
            alert('Wrong dimensions. It has to be 320x320');
        }
    } 
    newImg.src = URL.createObjectURL(event.target.files[0]);
};

addImageButton.addEventListener('click', function(){
    realButton.click();
});