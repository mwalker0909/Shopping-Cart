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
  // Credit: Trevor Thompson/Natalie Alway
  while(table.rows.length > 0){
    table.deleteRow(0);
  }
}

function showCart() {
  var tbody = document.querySelector('tbody');
  for (var i = 0; i < cart.items.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', i); // Credit: Trevor Thompson/Natalie Alway
    tbody.appendChild(tr);

    var tdItem = document.createElement('td');
    tdItem.textContent = cart.items[i].product;
    tr.appendChild(tdItem);

    var tdQuanity = document.createElement('td');
    tdQuanity.textContent = cart.items[i].quantity;
    tr.appendChild(tdQuanity);

    var tdRemove = document.createElement('td');
    tdRemove.setAttribute('class', 'remove'); // Credit: Trevor Thompson/Natalie Alway
    tdRemove.textContent = 'X';
    tr.appendChild(tdRemove);
  }
}

function removeItemFromCart(event) {
  if (event.target.textContent === 'X') {
    cart.removeItem(event.target.parentElement); // Credit: Trevor Thompson/Natalie Alway
  }
  localStorage.setItem('cart', JSON.stringify(cart.items));
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
