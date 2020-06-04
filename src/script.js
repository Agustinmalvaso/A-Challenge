var el = document.getElementById('items');
var sortable = Sortable.create(el);

var itemsAmount = 0;

function addItem(){

    if(document.getElementById('addTextButton').style.visibility == 'visible'){
        alert('You have to finish the current item before adding another one');
        return;
    }

    switchButtonsVisibility();

    var newItem = createItem();
    var description = document.createElement('p');
    newItem.appendChild(description);
    
    document.getElementById('items').appendChild(newItem);

    itemsAmount++;
}

function addText(){
    var inputText = prompt('Enter a description: ');
    while(inputText.length < 1 || inputText.length > 300){
        alert('The description must be between 1-300 characters.');
        inputText = prompt(' Please enter a new description.');
    }

    document.getElementById('items').children[0].getElementsByTagName('p')[0].innerHTML = inputText;
    console.log(document.getElementById('items').childNodes.length-1);
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

    if(document.getElementById('real-file').style.visibility == 'hidden'){
        document.getElementById('real-file').style.visibility = 'visible';
    }else{
        document.getElementById('real-file').style.visibility = 'hidden';
    }
}

function createItem(){
    var newItem = document.createElement('div');
    newItem.setAttribute('id', 'item' + itemsAmount);
    newItem.setAttribute('class', 'list-item');
    newItem.style.border = '2px solid lightblue';
    return newItem;
}