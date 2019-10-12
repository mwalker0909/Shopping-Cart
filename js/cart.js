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

function clearCart() {
  // Credit to Trevor Thompson
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}

function showCart() {
  var tbody = document.querySelector('tbody');
  for (var i = 0; i < cart.items.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', i); // credit Trevor Thompson
    var tdRemove = document.createElement('td');
    tdRemove.setAttribute('class', 'remove'); // credit Trevor Thompson
    tdRemove.textContent = 'X';
    var tdQuanity = document.createElement('td');
    tdQuanity.textContent = cart.items[i].quantity;
    var tdItem = document.createElement('td');
    tdItem.textContent = cart.items[i].product;
    tbody.appendChild(tr);
    tr.appendChild(tdRemove);
    tr.appendChild(tdQuanity);
    tr.appendChild(tdItem);
  }
}

function removeItemFromCart(event) {
  // Credit to Trevor Thompson and Conor McCue
  if(event.target.textContent === 'X'){
    cart.removeItem(event.target.parentElement);
    localStorage.setItem('cart', JSON.stringify(cart.items));
    renderCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
