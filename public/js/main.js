// FRONT-END (CLIENT) JAVASCRIPT HERE
let isEditFormOpen = false; 
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
      id: "unique-id-1",
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
    displayItems(data);  //display the list of items on the page
  } 
  catch (error) {
    console.error('Error fetching item:', error);
  }
}
/*
function updateDisplayedItems(updatedItems) {
  const itemsList = document.getElementById('itemsList'); 

  for (const updatedItem of updatedItems) {
      const existingRow = itemsList.querySelector(`tr[data-item-id="${updatedItem.id}"]`);

      if (existingRow) {
          updateRowContent(existingRow, updatedItem); 
      } else {
          // Create a new row
          const newRow = createRow(updatedItem);
          itemsList.appendChild(newRow);
      }
  }
}

function updateRowContent(rowElement, updatedItemData) {
  const cells = rowElement.querySelectorAll('td'); 

  const properties = ['service', 'date', 'wages', 'tips', 'miles', 'time', 'mpg', 'gasPrice', 'total', 'gasUsed', 'gasCost', 'income', 'hourlyPay'];

  for (let i = 0; i < properties.length; i++) {
      if (cells[i]) { // Check if the cell exists
          cells[i].textContent = updatedItemData[properties[i]]; 
      } else {
          console.warn(`Missing cell for property: ${properties[i]}`);
      }
  }
}


function createRow(item) {
  // Find existing row, or create a new one
  let row = document.querySelector(`#dataTable tr[data-item-id="${item.id}"]`);
  if (!row) {
      row = document.createElement('tr');
      row.dataset.itemId = item.id; // Add a data-item-id attribute
  } else {
      row.innerHTML = ''; // Clear existing cells if the row is reused
  }
}
*/

async function handleDelete(index, items) {
  console.log("DELETING ITEM");
  const itemId = items[index].id; // Get the itemId
  try {
    const response = await fetch('/delete-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId })
    });

    if (response.ok) {
        fetchItem();
    } 
    else {
        console.error('Delete failed:', response.status);
    }
  } 
  catch (error) {
      console.error('Error deleting item:', error);
  }
}

function createEditForm(itemData) {
  const form = document.createElement('form');
  form.classList.add('edit-form'); // Add a class for styling

  // Input fields for each property
  const serviceInput = createInputField('service', 'text', itemData.service);
  const dateInput = createInputField('date', 'date', itemData.date);
  const wagesInput = createInputField('wages', 'number', itemData.wages);
  const tipsInput = createInputField('tips', 'number', itemData.tips);
  const milesInput = createInputField('miles', 'number', itemData.miles);
  const timeInput = createInputField('time', 'number', itemData.time);
  const mpgInput = createInputField('mpg', 'number', itemData.mpg);
  const gasPriceInput = createInputField('gasPrice', 'number', itemData.gasPrice);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Save Changes';

  form.appendChild(serviceInput);
  form.appendChild(dateInput);
  form.appendChild(wagesInput);
  form.appendChild(tipsInput);
  form.appendChild(milesInput);
  form.appendChild(timeInput);
  form.appendChild(mpgInput);
  form.appendChild(gasPriceInput);
  form.appendChild(submitButton);

  return form;
}

function createInputField(name, type, value) {
  const label = document.createElement('label');
  label.htmlFor = name; 
  label.textContent = name.charAt(0).toUpperCase() + name.slice(1) + ':'; // Capitalize

  const input = document.createElement('input');
  input.type = type;
  input.id = name;
  input.name = name;
  input.value = value;

  if (type === 'number') {
    input.step = "0.01"; // Allow two decimal places
  }

  const container = document.createElement('div'); // For layout
  container.appendChild(label);
  container.appendChild(input);

  return container;
}

function displayEditForm(formElement) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.appendChild(formElement);
  document.body.appendChild(modal);
}

function extractDataFromForm(formElement) {
  const formData = new FormData(formElement); 
  const updatedData = {};
  for (const [key, value] of formData.entries()) {
      updatedData[key] = value;
  }
  return updatedData;
}

function hideEditForm() {
  const modal = document.querySelector('.modal');
  modal.remove();
  isEditFormOpen = false;
}

async function handleEdit(index, items) {
  const itemToEdit = items[index]; 

  // Create and display the form
  const editForm = createEditForm(itemToEdit); 
  displayEditForm(editForm);

  // Handle form submission
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const updatedData = extractDataFromForm(editForm);
      const response = await fetch('/edit-item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId: itemToEdit.id, ...updatedData })
      });

      if (response.ok) {
          fetchItem();
          hideEditForm(); 
      } 
      else {
          console.error('Edit failed:', response.status); 
          // Handle the failure - display error message in the form?
      }
    } 
    catch (error) {
        console.error('Error editing item:', error);
        // Handle the error - display error message in the form?
    }
  });
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

  function createCell(text, isCellGreen) {
    const cell = document.createElement('td');
    cell.textContent = text;
    if (isCellGreen) cell.style="background-color: rgb(200, 241, 162);";
    return cell;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Find existing row, or create a new one
    let row = document.querySelector(`#dataTable tr[data-item-id="${item.id}"]`);
    if (!row) {
        row = document.createElement('tr');
        row.dataset.itemId = item.id; // Add a data-item-id attribute
    } else {
        row.innerHTML = ''; // Clear existing cells if the row is reused
    }

    const properties = ['service', 'date', 'wages', 'tips', 'miles', 'time', 'mpg', 'gasPrice', 'total', 'gasUsed', 'gasCost', 'income', 'hourlyPay'];

    for (const property of properties) {
        let cellText = items[i][property];
        if (['wages', 'tips', 'gasPrice', 'total', 'gasCost', 'income', 'hourlyPay'].includes(property)) cellText = '$' + cellText; 
        else if (['gasUsed'].includes(property)) cellText = cellText + " gal";
        else if (['time'].includes(property)) cellText = cellText + " mins";

        let greenCell = false;
        if (['total', 'gasUsed', 'gasCost', 'income', 'hourlyPay'].includes(property)) greenCell = true;
        row.appendChild(createCell(cellText, greenCell)); 
    }
    itemsList.appendChild(row);
    console.log('Updated row:', row.outerHTML);

    // Add buttons cell
    const deleteCell = document.createElement('td');
    const editCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.index = i; // Store the index in a 'data-' attribute
    deleteButton.style="background: rgb(243, 95, 27); border-radius: 10px; width:fit-content; height: fit-content; font-size: 20px;";

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.dataset.index = i; 
    editButton.style="background: rgb(237, 152, 16); border-radius: 10px;   width:fit-content; height: fit-content; font-size: 20px;";

    //and event handlers for buttons
    deleteButton.addEventListener('click', (event) => {
      const index = i; // Pass the index
      handleDelete(index, items); 
    });

    editButton.addEventListener('click', (event) => {
      if (!isEditFormOpen) { 
         isEditFormOpen = true; 
         const index = i; // Pass the index
         handleEdit(index, items); // Pass the items array 
      }
   });


    deleteCell.appendChild(deleteButton);
    editCell.appendChild(editButton);
    row.appendChild(editCell);
    row.appendChild(deleteCell);
  } 
  console.log(items)
}
