import itemsDB from "./items.json";
const items = Array.from(itemsDB);
const cartItems = JSON.parse(localStorage.getItem("cart")) || {};

const cartContainer = document.querySelector("#cart");
const cartItemsContainer = document.querySelector("#cart-items-container");

function deleteCartItemHandler() {
  cartItemsContainer.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;
    delete cartItems[e.target.closest(".cart-item").id];
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("here");
    renderCart();
  });
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  // console.log(cartItems);
  // debugger;
  if (!Object.keys(cartItems).length) {
    cartContainer.classList.add("invisible");
  } else {
    let total = 0;
    let numberOfItemsInCart = 0;

    for (let cartItem in cartItems) {
      const itemDetails = queryForItem(cartItem);
      // console.log(itemDetails);
      const src = `https://dummyimage.com/210x130/${itemDetails.imageColor}/${itemDetails.imageColor}`;
      const newCartItem = document
        .querySelector("#cart-item-template")
        .content.cloneNode(true);
      newCartItem.querySelector("img").src = src;
      newCartItem.querySelector("h2").textContent = itemDetails.name;
      const cartItemQuantity = cartItems[cartItem];
      if (cartItemQuantity > 1) {
        newCartItem.querySelector("span").textContent = `x${cartItemQuantity}`;
      }
      let subtotal = itemDetails.priceCents * cartItemQuantity;
      newCartItem.querySelector(".subtotal").textContent =
        displayAmount(subtotal);
      newCartItem.querySelector(".cart-item").id = itemDetails.id;
      numberOfItemsInCart += cartItemQuantity;
      total += subtotal;
      cartItemsContainer.appendChild(newCartItem);
    }
    document.querySelector("#total").textContent = displayAmount(total);
    document.querySelector("#number-of-items-in-cart").textContent =
      numberOfItemsInCart;
    cartContainer.classList.remove("invisible");
  }
}

function queryForItem(id) {
  for (let item of items) {
    if (item.id == id) return item;
  }
}

function displayAmount(amount) {
  return `$${amount / 100}.00`;
}

//Initialization
renderCart();
deleteCartItemHandler();

export { items, cartItems, renderCart, displayAmount, deleteCartItemHandler };
