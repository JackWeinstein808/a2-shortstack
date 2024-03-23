// FRONT-END (CLIENT) JAVASCRIPT HERE

const addEntry = async function(event) {
  event.preventDefault();

  // ... Get values from all input fields
  const service = document.querySelector("#service").value;
  const date = document.querySelector("#date").value; 
  const wages = document.querySelector("#wages").value;
  const tips = document.querySelector("#tips").value;
  const miles = document.querySelector("#miles").value;
  const time = document.querySelector("#time").value;
  const mpg = document.querySelector("#mpg").value;
  const gasPrice = document.querySelector("#gasPrice").value;

  // Build the new item object
  const newItem = {
      service: service,
      date: date,
      wages: wages,
      tips: tips,
      miles: miles,
      time: time,
      mpg: mpg,
      gasPrice: gasPrice,
      total: 0,
      gasUsed: 0,
      gasCost: 0,
      income: 0,
      hourlyPay: 0
  };

  // Construct the array for submission
  const itemsData = [newItem]; // Start with a single item

  const body = JSON.stringify(itemsData);

  if (service !== "") { // Basic validation
      const response = await fetch("/items", {
          method: "POST",
          body
      });

      // Clear input fields
      document.getElementById("addItemForm").reset(); 

      console.log("Entry added!");
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
  addButton.onclick = addEntry;

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

  function createCell(text) {
    const cell = document.createElement('td');
    //cell.style="background-color: rgb(200, 241, 162);"
    cell.textContent = text;
    return cell;
  }

  for (let i = 0; i < items.length; i++) {
    const row = document.createElement('tr');

    const properties = ['service', 'date', 'wages', 'tips', 'miles', 'time', 'mpg', 'gasPrice', 'total', 'gasUsed', 'gasCost', 'income', 'hourlyPay'];

    for (const property of properties) {
        let cellText = items[i][property];
        if (['wages', 'tips', 'gasPrice', 'total'].includes(property)) {
            cellText = '$' + cellText; 
        }
        row.appendChild(createCell(cellText)); 
    }

    itemsList.appendChild(row);
  } 
}
