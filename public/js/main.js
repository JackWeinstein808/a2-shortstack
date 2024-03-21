// FRONT-END (CLIENT) JAVASCRIPT HERE

const addItem = async function(event) {
  event.preventDefault();

  const itemName = document.querySelector("#newItem").value;
  //const itemPrice = document.querySelector("#itemPrice").value; 
  const itemPrice = "5";
  // ... Get values from other input fields

  // Build the new item object
  const newItem = {
      item: itemName,
      price: parseFloat(itemPrice) // Ensure price is a number
      // ... Add other properties
  };

  // Construct the array for submission
  const itemsData = [newItem]; // Start with a single item

  const body = JSON.stringify(itemsData);

  if (itemName !== "") { // Basic validation
      const response = await fetch("/items", {
          method: "POST",
          body
      });

      // Clear input fields
      document.getElementById("addItemForm").reset(); 

      console.log("Items added!");
      fetchItem(); // Update the list
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
  const itemsList = document.getElementById('itemsList');
  itemsList.innerHTML = ''; 

  for (let i = 0; i < items.length; i++) {
      const row = document.createElement('tr');

      const itemCell = document.createElement('td');
      itemCell.textContent = items[i].item; // Access the 'item' property
      row.appendChild(itemCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = items[i].price; // Access the 'price' property
      row.appendChild(priceCell);

      // ... add more cells for other properties ...

      itemsList.appendChild(row);
  }
}
