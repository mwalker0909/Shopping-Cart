/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectEl = document.getElementById('items');
  for (var i in Product.allProducts) {
    var option = document.createElement('option');
    option.setAttribute('class', 'products');
    option.textContent = Product.allProducts[i].name;
    selectEl.appendChild(option);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  //https://teamtreehouse.com/community/how-to-stop-javascript-window-reloading-when-each-time-button-is-on-a-page

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

  // TODO: Add the selected item and quantity to the cart
  function addSelectedItemToCart() {

  // TODO: suss out the item picked from the select list

  var productDropDown = document.getElementById('items');
  var product = productDropDown.value;
  // TODO: get the quantity

  var quantityInput = document.getElementById('quantity');
  var quantity = quantityInput.value;
 
  // TODO: using those, add one item to the Cart
  cart.addItem(product, quantity);                           

}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
    var cartnumber = document.getElementById('itemCount');
    cartnumber.innerText = cart.items.length; // taken from our code review and Conor's code. 
// link by doing element id = // then set to zero. then for loop to iterate through length. then for the length we add to the overall count. 
var itemCount = document.getElementById('itemCount');

var currentCount = 0
// set the total number to zero first, then iterate through to get actual number. 
for (var i = 0; i < cartItems.length; i++) {
    currentCount = parseInt(cartItems[i].length);
}
itemCount.textContent = currentCount;
}


// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var formItem = document.getElementById('items').value;
  var formQuantity = document.getElementById('quantity').value;
  var targetDiv = document.getElementById('cartContents');
  var newText = document.createElement('p');
  newText.innerText = `${formItem}: ${formQuantity}`;
  targetDiv.appendChild(newText);
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();