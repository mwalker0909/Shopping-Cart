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
  while(table.rows.length > 1){
    table.deleteRow(0);
  }
}


function showCart() {
  // Adds a 4th column header for pics
  var thead = document.querySelector('thead');
  var trthead = thead.firstElementChild; // From https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild
  var thPreview = document.createElement('th');
  thPreview.textContent = 'Preview';
  trthead.appendChild(thPreview);
  // Creates table rows and data to show cart items
  var tbody = document.querySelector('tbody');
  for (var i = 0; i < cart.items.length; i++) {
    var tr = document.createElement('tr');
    tr.setAttribute('id', i); // Credit: Trevor Thompson/Natalie Alway
    tbody.appendChild(tr);

    var tdRemove = document.createElement('td');
    tdRemove.setAttribute('class', 'remove'); // Credit: Trevor Thompson/Natalie Alway
    tdRemove.textContent = 'X';
    tr.appendChild(tdRemove);

    var tdItem = document.createElement('td');
    tdItem.textContent = cart.items[i].product;
    tr.appendChild(tdItem);

    var tdQuanity = document.createElement('td');
    tdQuanity.textContent = cart.items[i].quantity;
    tr.appendChild(tdQuanity);

    var tdPic = document.createElement('td');
    var img = document.createElement('img');
    tr.appendChild(tdPic);
    tdPic.appendChild(img);
    // // Credit: Trevor Thompson/Natalie Alway
    // for (var j = 0; j < Product.allProducts.length; j++) {
    //   if (Product.allProducts[j].name.toUpperCase() === cart.items[i].product.toUpperCase()) {
    //   img.src = Product.allProducts[j].filePath;
  }
}

// var productTd = document.createElement('td');
//    var img = document.createElement('img');
//    productTd.textContent = cart.items[i].product;
//    for (var j = 0; j < Product.allProducts.length; j++) {
//      if (Product.allProducts[j].name.toUpperCase() === cart.items[i].product.toUpperCase()) {
//        img.src = Product.allProducts[j].filePath;
//      };

function removeItemFromCart(event) {
  if (event.target.textContent === 'X') {
    cart.removeItem(event.target.parentElement); // Credit: Trevor Thompson/Natalie Alway
  }
  localStorage.setItem('cart', JSON.stringify(cart.items));
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
