var listItems = document.getElementById('items');
var sortable = Sortable.create(listItems);

var itemsAmount = 0;

const realButton = document.getElementById('real-button');
const customButton = document.getElementById('custom-button');


function addItem(){

    if(document.getElementById('addTextButton').style.visibility == 'visible'){
        alert('You have to finish the current item before adding another one');
        return;
    }

    switchButtonsVisibility();

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

    listItems.children[0].getElementsByTagName('p')[0].innerHTML = inputText;
    console.log(listItems.childNodes.length-1);
}

function switchButtonsVisibility(){

    if(document.getElementById('addTextButton').style.visibility == 'hidden'){
        document.getElementById('addTextButton').style.visibility = 'visible';
    }else{
        document.getElementById('addTextButton').style.visibility = 'hidden';
    }
    
    if(document.getElementById('addImageButton').style.visibility == 'hidden'){
        document.getElementById('addImageButton').style.visibility = 'visible';
    }else{
        document.getElementById('addImageButton').style.visibility = 'hidden';
    }

    if(document.getElementById('custom-button').style.visibility == 'hidden'){
        document.getElementById('custom-button').style.visibility = 'visible';
    }else{
        document.getElementById('custom-button').style.visibility = 'hidden';
    }

    if(document.getElementById('submitItemButton').style.visibility == 'hidden'){
        document.getElementById('submitItemButton').style.visibility = 'visible';
    }else{
        document.getElementById('submitItemButton').style.visibility = 'hidden';
    }
}

function createItem(){
    var newItem = document.createElement('div');
    newItem.setAttribute('id', 'item' + itemsAmount);
    newItem.setAttribute('class', 'list-item');
    newItem.style.border = '2px solid lightblue';
    return newItem;
}

customButton.addEventListener('click', function(){
    realButton.click();
});

var loadFile = function(event) {
	document.getElementById('items').childNodes[itemsAmount].getElementsByTagName('img')[0].src = URL.createObjectURL(event.target.files[0]);
};