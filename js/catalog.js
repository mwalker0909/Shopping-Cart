/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  var productList = document.getElementById('items');
  for (var i in Product.allProducts) {
    var option = document.createElement('option');
    option.setAttribute('class', 'products');
    option.textContent = Product.allProducts[i].name;
    productList.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

function addSelectedItemToCart() {
  var productList = document.getElementById('items');
  var product = productList.value;
  var quantityInput = document.getElementById('quantity');
  var quantity = quantityInput.value;
  cart.addItem(product, quantity);
}

function updateCounter() {
  var counter = document.getElementById('itemCount');
  counter.textContent = cart.items.length;
}

function updateCartPreview() {
  // Credit: mashup of Conor McCue's and Trevor Thompson's solutions
  var productList = document.getElementById('items');
  var product = productList.options[productList.selectedIndex].value;
  var quantity = document.getElementById('quantity').value;
  var previewArea = document.getElementById('cartContents');
  var previewText = document.createElement('p');
  previewText.innerHTML = `${product} x${quantity}`;
  previewArea.appendChild(previewText);
  // From the lab instructions: When the order is submitted, all of the input fields should be cleared. Holly found how to do this at https://www.w3schools.com/jsref/met_form_reset.asp
  document.getElementById('catalog').reset();
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
