import itemsDB from "./items.json";

const items = Array.from(itemsDB);

const storeItems = document.querySelector(".cart-items");
const cartItems = {};

for (let item of items) {
  const newItem = document
    .querySelector("#cart-item-template")
    .content.cloneNode(true);
  let src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
  newItem.querySelector("img").src = src;
  newItem.querySelector("h2").textContent = item.name;
  newItem.querySelector("h3").textContent = item.category;
  newItem.querySelector("p").textContent = `$${item.priceCents / 100}.00`;
  newItem.querySelector(".cart-item").id = item.id;

  storeItems.appendChild(newItem);
}

storeItems.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  addItemToCart(e.target.closest(".cart-item").id);
});

function addItemToCart(itemId) {
  if (!cartItems[itemId]) {
    cartItems[itemId] = 1;
  } else {
    cartItems[itemId] += 1;
  }

  console.log(cartItems);
}
