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
function clearCart() {}
//https://www.w3schools.com/jsref/prop_node_childnodes.asp

var table = document.getElementById('cart')
var tBody = table.childNodes;



// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {


  // TODO: Find the table body
  var table = document.getElementById('cart');
  for (var i = 0; i < cart.length; i++); {
  var tableRow = document.createElement('tableRow');
  var tableData = document.createElement('tableData');
  table.appendChild(tableRow);
  tableRow.appendChild(tableData.length);
  } 


  


  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  var deleteTd = document.createElement('td');
  deleteTd.textContent = 'deleteThis';
  tr.appendChild(deleteTd);

}

function removeItemFromCart(event) {
  

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  if(event.target.textContent === 'deleteThis') {
    cart.removeItem(event.target.parentElement.id);
  }
  // TODO: Save the cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart.items));
  // TODO: Re-draw the cart table



// This will initialize the page and draw the cart on screen
renderCart();
};