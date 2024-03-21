// FRONT-END (CLIENT) JAVASCRIPT HERE

const addItem = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#newItem" ),
        json = { addItem: input.value },
        body = JSON.stringify( json )

  if(input.value != "") {
    const response = await fetch( "/submit", {
      method:"POST",
      body 
    })
  
    document.getElementById("newItem").value = "";
    console.log("Item added!");
    fetchItem();
  }
}

async function fetchItem() {
  try {
    const response = await fetch('/items');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json(); 
    console.log('Fetched item:', data); 
    displayItems(data); //display the list of items on the page

  } catch (error) {
    console.error('Error fetching item:', error);
  }
}

window.onload = function() {
  fetchItem();
  const addButton = document.getElementById("addButton");
  addButton.onclick = addItem;

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener('click', () => {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = ''; // Clear the list on the page

    //clear the list on the server side
    try {
      const response = fetch('/clear-items', { method: 'POST' }); 
      // You'll need a '/clear-items' route set up on your server to handle this
    } 
    catch (error) {
      console.error('Error clearing server data:', error);
    }
  });
}

function displayItems(items) {
  const itemsList = document.getElementById('itemsList'); // Get the <ul> element
  itemsList.innerHTML = ''; // Clear any existing list items

  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = items[i];
    itemsList.appendChild(listItem);
  }
}
