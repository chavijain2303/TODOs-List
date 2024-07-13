function getAndUpdate() {
    let tit = document.getElementById('title').value.trim();
    let desc = document.getElementById('Description').value.trim();
  
    if (tit === "" || desc === "") {
      alert("Title and Description cannot be empty.");
      return;
    }
  
    if (localStorage.getItem('itemsJson') == null) {
      itemJsonArray = [];
      itemJsonArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
      itemJsonArraystr = localStorage.getItem('itemsJson');
      itemJsonArray = JSON.parse(itemJsonArraystr);
      itemJsonArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
  
    // Clear the input fields
    document.getElementById('title').value = "";
    document.getElementById('Description').value = "";
  
    update();
  }
  
  function update() {
    if (localStorage.getItem('itemsJson') == null) {
      itemJsonArray = [];
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
      itemJsonArraystr = localStorage.getItem('itemsJson');
      itemJsonArray = JSON.parse(itemJsonArraystr);
    }
  
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
      str += `<tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
              </tr>`;
    });
    tableBody.innerHTML = str;
  }
  
  document.getElementById("add").addEventListener("click", getAndUpdate);
  update();
  
  function deleted(itemIndex) {
    itemJsonArraystr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArraystr);
  
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
  }
  
  function clearStorage() {
    if (confirm("Do you really want to clear?")) {
      localStorage.clear();
      update();
    }
  }
  
  function searchItems() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let tableBody = document.getElementById("tableBody");
    let itemJsonArraystr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArraystr);
  
    let filteredItems = itemJsonArray.filter(item => item[0].toLowerCase().includes(input));
    let str = "";
    if (filteredItems.length === 0) {
      str = `<tr><td colspan="4" class="text-center">No matching items found</td></tr>`;
      // Clear the search input field and show the full list after a delay
      setTimeout(() => {
        document.getElementById('searchInput').value = "";
        update();
      }, 2000); // Adjust the delay time (in milliseconds) as needed
    } else {
      filteredItems.forEach((element, index) => {
        str += `<tr>
                  <th scope="row">${index + 1}</th>
                  <td>${element[0]}</td>
                  <td>${element[1]}</td>
                  <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
                </tr>`;
      });
      // Clear the search input field
      document.getElementById('searchInput').value = "";
    }
    tableBody.innerHTML = str;
  }
  