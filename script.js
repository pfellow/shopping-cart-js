import {
  items,
  cartItems,
  displayAmount,
  renderCart,
  deleteCartItemHandler,
} from "./cart";

const storeItems = document.querySelector(".store-items");

for (let item of items) {
  const newItem = document
    .querySelector("#store-item-template")
    .content.cloneNode(true);
  const src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
  newItem.querySelector("img").src = src;
  newItem.querySelector("h2").textContent = item.name;
  newItem.querySelector("h3").textContent = item.category;
  newItem.querySelector("p").textContent = displayAmount(item.priceCents);
  newItem.querySelector(".store-item").id = item.id;
  storeItems.appendChild(newItem);
}

storeItems.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  addItemToCart(e.target.closest(".store-item").id);
});

function addItemToCart(itemId) {
  if (!cartItems[itemId]) {
    cartItems[itemId] = 1;
  } else {
    cartItems[itemId] += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

//Initialization
renderCart();
deleteCartItemHandler();
