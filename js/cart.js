/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  // var table = document.getElementById('cart');
  // table.deleteRow();
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tbody = document.querySelector('tbody');
  // TODO: Iterate over the items in the cart
  for (var i = 0; i < cart.items.length; i++) {
    // TODO: Create a TR
    var tr = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    var tdRemove = document.createElement('td');
    tdRemove.textContent = 'X'; //placeholder
    var tdQuanity = document.createElement('td');
    tdQuanity.textContent = cart.items[i].quantity; //placeholder
    var tdItem = document.createElement('td');
    tdItem.textContent = cart.items[i].product; //placeholder
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tbody.appendChild(tr);
    tr.appendChild(tdRemove);
    tr.appendChild(tdQuanity);
    tr.appendChild(tdItem);
  }
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem(event.target);
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
