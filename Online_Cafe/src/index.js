import "./style.scss";
import { stuffingList, foodList } from "./utils";

const showBtnList = document.querySelectorAll(".show_prod_btn");
const productList = document.querySelectorAll(".child-list-group");
const orderBtnList = document.querySelectorAll(".order_btn");
const productCardList = document.getElementsByClassName("card");
const productPricesList = document.querySelectorAll(".price");
const curStuffingList = document.querySelector(".editing_order");
const confirmOrderBtn = document.getElementById("confirm_order");
const scrollController = {
  disable() {
    document.body.style.cssText = `overflow: hidden;`;
  },
  enable() {
    document.body.style.cssText = `overflow:'';`;
  },
};
const formEditor = document.getElementById("form_editor");
const addStuffingBtn = document.getElementById("add_stuffing_btn");
const stuffingSelector = document.getElementById("stuffing-additor");
let currentProduct;
const order = [];

showBtnList.forEach((element) => {
  element.addEventListener("click", function () {
    this.classList.toggle("rotate");
    const index = [...showBtnList].indexOf(this);
    productList[index].classList.toggle("open");
  });
});

orderBtnList.forEach((element) =>
  element.addEventListener("click", function () {
    const index = [...orderBtnList].indexOf(this);
    productCardList[index];
  })
);

productPricesList.forEach((span) => {
  for (let i = 0; i < foodList.length; i++) {
    if (span.dataset.productId === foodList[i].foodName) {
      span.innerHTML = `${foodList[i].calculatePrice()}$`;
    }
  }
});

const editORderBtn = document.querySelectorAll("#order_editor");
const orderEditModal = document.querySelector("#order_edit_modal");
const closeEdidorBtn = document.querySelector("#close_editor_btn");

closeEdidorBtn.addEventListener("click", () => {
  orderEditModal.classList.toggle("editing");
  scrollController.enable();
});

addOrderToCart();

editORderBtn.forEach((element) => {
  element.addEventListener("click", function () {
    formEditor.reset();
    orderEditModal.classList.toggle("editing");
    scrollController.disable();
    const productId = this.dataset.productId;
    const img = document.getElementById("product_img");
    const addBtn = document.createElement("button");
    const spanForPrice = document.createElement("span");

    img.setAttribute("src", `../../imgs/food/${productId}.jpg`);
    spanForPrice.setAttribute("id", "editing_prise");
    spanForPrice.setAttribute("class", "price");

    const currentProductName = [...productCardList].filter(
      (div) => div.dataset.productId == productId
    )[0].dataset.productName;
    curStuffingList.innerHTML = "";
    const p = document.querySelector(".editor_product_name");

    const currentProductClass = foodList.filter(
      (element) => element.foodName == productId
    )[0];
    currentProduct = currentProductClass;

    addBtn.textContent = "Add order";
    addBtn.setAttribute("class", "btn btn-primary");
    addBtn.setAttribute("type", "submit");
    addBtn.setAttribute("id", "addOrderBtn");
    p.textContent = currentProductName;
    stuffingListCreator(currentProductClass.stuffing);
    spanForPrice.innerText = `${currentProductClass.calculatePrice()}$`;
    curStuffingList.append(spanForPrice);
    curStuffingList.append(addBtn);

    addStuffingBtn.removeEventListener("click", stuffingAdding);
    addStuffingBtn.addEventListener("click", stuffingAdding);

    document.documentElement.scrollTop = 0;

    orderSaving();
  });
});

function orderSaving() {
  const addOrderBtn = document.getElementById("addOrderBtn");
  const sizeRadio = document.getElementsByName("size");
  const orderFormLS = JSON.parse(localStorage.getItem("order"));
  addOrderBtn.addEventListener("click", function () {
    const size = [...sizeRadio].filter((element) => element.checked == true)[0]
      .value;
    currentProduct.size = size;
    currentProduct.totalPrice = currentProduct.calculatePrice();
    currentProduct.orderId = +new Date();
    orderEditModal.classList.toggle("editing");
    order.push(currentProduct);
    if (orderFormLS) {
      orderFormLS.push(currentProduct);
      localStorage.setItem("order", JSON.stringify(orderFormLS));
    } else {
      localStorage.setItem("order", JSON.stringify(order));
    }

    addOrderToCart();
  });
}

formEditor.addEventListener("submit", (event) => {
  event.preventDefault();
});

function stuffingAdding() {
  if (stuffingSelector.value) {
    const stuffingName = stuffingList.filter(
      (element) => element.id === stuffingSelector.value
    );
    stuffingListCreator(stuffingName);
    currentProduct.addStuffing(stuffingName[0]);
    resetPrice();
  }
}
function stuffingDeleting() {
  const stuffingId = this.parentElement.dataset.productId;
  const stuffing = stuffingList.filter((element) => element.id === stuffingId);
  currentProduct.removeStiffing(stuffing[0]);
  this.parentElement.remove();
  resetPrice();
}

function stuffingListCreator(stuffingList) {
  for (let kej of stuffingList) {
    const listItem = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "del_Stuffing");
    delBtn.setAttribute("type", "button");
    delBtn.textContent = `-`;
    delBtn.addEventListener("click", stuffingDeleting);
    const p = document.createElement("p");
    p.innerHTML = `${kej.name}`;
    listItem.dataset.productId = kej.id;
    listItem.append(p);
    listItem.append(delBtn);
    curStuffingList.prepend(listItem);
  }
}

const sizeInput = document.getElementsByClassName("size_input");
[...sizeInput].forEach((element) =>
  element.addEventListener("click", () => {
    currentProduct.size = element.value;

    resetPrice();
  })
);

function resetPrice() {
  const spanForPrice = document.getElementById("editing_prise");

  spanForPrice.innerText = `${currentProduct.calculatePrice()}$`;
}
function addOrderToCart() {
  const orderFromLS = localStorage.getItem("order");
  if (orderFromLS) {
    const cartBody = document.getElementById("cart_body");

    cartBody.innerHTML = "";
    for (let kej of JSON.parse(orderFromLS)) {
      const listItem = document.createElement("li");
      const p = document.createElement("p");
      const stuffingList = document.createElement("ul");
      const delOrderBtn = document.createElement("button");
      const spanForPrice = document.createElement("span");
      const img = document.createElement("img");
      const productId = kej.foodName;
      const currentProducrCard = [...productCardList].filter(
        (element) => element.dataset.productId == productId
      );
      const productName = currentProducrCard[0].dataset.productName;

      img.setAttribute("src", `../../imgs/food/${productId}.jpg`);
      delOrderBtn.setAttribute("id", "del_order_btn");
      delOrderBtn.innerText = "Delete order";
      delOrderBtn.dataset.orderId = kej.orderId;
      spanForPrice.setAttribute("class", "price final_price");
      p.innerHTML = `${productName} - `;
      spanForPrice.innerText = `${kej.totalPrice}$`;
      listItem.append(img);
      p.append(spanForPrice);
      stuffingList.append(p);
      listItem.append(stuffingList);
      listItem.append(delOrderBtn);
      cartBody.append(listItem);

      delOrderBtn.addEventListener("click", function () {
        const orderId = this.dataset.orderId;
        const curOrdersFormLS = localStorage.getItem("order");
        const currOrders = JSON.parse(curOrdersFormLS);
        currOrders.splice(
          currOrders.indexOf(
            currOrders.filter((element) => element.orderId == orderId)[0]
          ),
          1
        );
        localStorage.setItem("order", JSON.stringify(currOrders));

        this.parentElement.remove();
        setTotalPrice();
      });

      for (let stuffing of kej.stuffing) {
        const li = document.createElement("li");

        li.innerText = `${stuffing.name}`;
        stuffingList.append(li);
      }
    }
    setTotalPrice();
    scrollController.enable();
  } else {
    return;
  }
}

function setTotalPrice() {
  const cartFooter = document.querySelector(".modal-footer");
  const priceList = document.getElementsByClassName("final_price");
  let spanForFinalPrice = "";
  if (document.querySelector(".total_price")) {
    spanForFinalPrice = document.querySelector(".total_price");
  } else {
    spanForFinalPrice = document.createElement("span");
  }

  const priceArr = [...priceList].map(
    (element) => (element = parseInt(element.innerHTML))
  );
  spanForFinalPrice.innerText = `Total price: ${priceArr.reduce(
    (acc, curr) => acc + curr,
    0
  )}$`;
  cartFooter.prepend(spanForFinalPrice);
  spanForFinalPrice.setAttribute("class", "price total_price");
}
confirmOrderBtn.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: localStorage.getItem("order"),
  });
  localStorage.removeItem("order");
  cart_body.innerHTML = "";
  setTotalPrice();
});
