/* global Cart */
'use strict';

// Adds a 4th column header for pics
var thead = document.querySelector('thead');
var trthead = thead.firstElementChild; // From https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild
var thPreview = document.createElement('th');
thPreview.textContent = 'Preview';
trthead.appendChild(thPreview);

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
  for (var i = 1; i < table.rows.length; i++) {
    table.deleteRow(i);
  }
}

function showCart() {
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
    img.setAttribute('class', 'cartpic');
    tr.appendChild(tdPic);
    tdPic.appendChild(img);
    // // Credit: Trevor Thompson/Natalie Alway
    for (var j = 0; j < Product.allProducts.length; j++) {
      if (Product.allProducts[j].name.toUpperCase() === cart.items[i].product.toUpperCase()) {
        img.src = Product.allProducts[j].filePath;
      }
    }

  }
}

function removeItemFromCart(event) {
  if (event.target.textContent === 'X') {
    cart.removeItem(event.target.parentElement); // Credit: Trevor Thompson/Natalie Alway
  }
  localStorage.setItem('cart', JSON.stringify(cart.items));
  renderCart();
}


function renderCheckoutForm () {
  var main = document.querySelector('main');
  var section = document.createElement('section');
  section.setAttribute('id', 'checkout-form');
  var form = document.createElement('form');
  form.setAttribute('id', 'form');
  var fieldset = document.createElement('fieldset');
  fieldset.setAttribute('id', 'fieldset');
  var legend = document.createElement('legend');
  legend.setAttribute('id', 'cartlegend');
  legend.textContent = 'Order Form';
  var labelName = document.createElement('label');
  labelName.textContent = 'Name: ';
  var inputName = document.createElement('input');
  inputName.setAttribute('type', 'text');
  var labelStreet = document.createElement('label');
  labelStreet.textContent = 'Street: ';
  var inputStreet = document.createElement('input');
  inputStreet.setAttribute('type', 'text');
  var labelCity = document.createElement('label');
  labelCity.textContent = 'City: ';
  var inputCity = document.createElement('input');
  inputCity.setAttribute('type', 'text');
  var labelState = document.createElement('label');
  labelState.textContent = 'State: ';
  var inputState = document.createElement('input');
  inputState.setAttribute('type', 'text');
  var labelZip = document.createElement('label');
  labelZip.textContent = 'Zip: ';
  var inputZip = document.createElement('input');
  inputZip.setAttribute('type', 'number');
  var labelPhone = document.createElement('label');
  labelPhone.textContent = 'Phone: ';
  var inputPhone = document.createElement('input');
  inputPhone.setAttribute('type', 'text');
  var labelCard = document.createElement('label');
  labelCard.textContent = 'Card Number: ';
  var inputCard = document.createElement('input');
  inputCard.setAttribute('type', 'number');
  var labelSubmit = document.createElement('label');
  labelSubmit.textContent = 'Card Number: ';
  var inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.setAttribute('value', 'Process Order'); // https://stackoverflow.com/questions/14007613/change-text-from-submit-on-input-tag
  main.appendChild(section);
  section.appendChild(form);
  form.appendChild(fieldset);
  fieldset.appendChild(legend);
  fieldset.appendChild(labelName);
  labelName.appendChild(inputName);
  fieldset.appendChild(labelStreet);
  labelStreet.appendChild(inputStreet);
  fieldset.appendChild(labelCity);
  labelCity.appendChild(inputCity);
  fieldset.appendChild(labelState);
  labelState.appendChild(inputState);
  fieldset.appendChild(labelZip);
  labelZip.appendChild(inputZip);
  fieldset.appendChild(labelPhone);
  labelPhone.appendChild(inputPhone);
  fieldset.appendChild(labelCard);
  labelCard.appendChild(inputCard);
  fieldset.appendChild(inputSubmit);

}

// This will initialize the page and draw the cart on screen
renderCart();
renderCheckoutForm();