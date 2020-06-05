var listItems = document.getElementById('items');
var sortable = Sortable.create(listItems);

var itemsAmount = 0;

const realButton = document.getElementById('real-button');
const addImageButton = document.getElementById('addImageButton');
var dataList = [];

class Item {
    constructor(text, image){
        this.text = text;
        this.image = image;
    }
};

function addItem(){

    if(document.getElementById('addTextButton').style.visibility == 'visible'){
        alert('You have to finish the current item before adding another one');
        return;
    }

    switchAllButtonsVisibility();

    var newItem = createItem();
    var description = document.createElement('p');
    newItem.appendChild(description);

    var newImage = document.createElement('img');
    newImage.setAttribute('id','image'+itemsAmount);
    newImage.height = 320;
    newImage.width = 320;
    newItem.appendChild(newImage);
    
    listItems.appendChild(newItem);

    itemsAmount++;
}

function addText(){
    var inputText = prompt('Enter a description: ');
    while(inputText.length < 1 || inputText.length > 300){
        alert('The description must be between 1-300 characters.');
        inputText = prompt(' Please enter a new description.');
    }

    listItems.children[itemsAmount-1].getElementsByTagName('p')[0].innerHTML = inputText;
    // console.log(listItems.childNodes.length-1);
    // console.log(listItems.children[itemsAmount-1]);
}

function submitItem(){
    var imageText = listItems.childNodes[itemsAmount].childNodes[0];
    var imageSrc = listItems.childNodes[itemsAmount].childNodes[1].src;

    if(imageText.textContent == ""){
        alert('You must insert a text');
        return;
    }

    if(imageSrc == ""){
        alert('You must have an image');
        return;
    }

    var newItem = new Item(imageText.textContent, imageSrc);
    dataList.push(newItem);
    
    document.getElementById('counter').innerHTML = 'Counter: ' + itemsAmount;

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

function createItem(){
    var newItem = document.createElement('div');
    newItem.setAttribute('id', 'item' + itemsAmount);
    newItem.setAttribute('class', 'list-item');
    newItem.style.border = '2px solid lightblue';
    return newItem;
}

var loadFile = function(event) {
	document.getElementById('items').childNodes[itemsAmount].getElementsByTagName('img')[0].src = URL.createObjectURL(event.target.files[0]);
};

addImageButton.addEventListener('click', function(){
    realButton.click();
});
