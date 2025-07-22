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

const standartSize = 1;
const bigSize = 2;
const doubleEspresso = {
  price: 1,
  milliliters: 60,
  name: "Double espresso",
  id: "doubleEspresso",
};
const orangeFresh = {
  price: 1,
  milliliters: 100,
  name: "Orange fresh",
  id: "orangeFresh",
};
const caramelSyrup = {
  price: 1,
  milliliters: 30,
  name: "Caramel syrup",
  id: "caramelSyrup",
};
const crushedIce = {
  price: 1,
  gramm: 200,
  name: "Crushed ice",
  id: "crushedIce",
};
const whiteRum = {
  price: 1,
  milliliters: 50,
  name: "White rum Cubana Cultura",
  id: "whiteRum",
};
const soda = { price: 1, milliliters: 100, name: "Soda", id: "soda" };
const lime = { price: 1, gramm: 60, name: "Lime", id: "lime" };
const strawberry = {
  price: 1,
  gramm: 120,
  name: "Strawberry",
  id: "strawberry",
};
const halfStrawberry = {
  price: 1,
  gramm: 5,
  name: "Strawberry",
  id: "halfStrawberry",
};
const mint = { price: 1, gramm: 3, name: "Mint", id: "mint" };
const espresso = {
  price: 1,
  milliliters: 30,
  name: "Espresso",
  id: "espresso",
};
const steamedMilk = {
  price: 1,
  milliliters: 30,
  name: "Steamed milk",
  id: "steamedMilk",
};
const foam = { price: 1, milliliters: 30, name: "Foam", id: "foam" };
const eggs = { price: 1, pieces: 2, name: "Eggs", id: "eggs" };
const tosts = { price: 1, pieces: 2, name: "Tosts", id: "tosts" };
const avocado = { price: 1, gramm: 30, name: "Avocado", id: "avocado" };
const spinach = { price: 1, gramm: 10, name: "Spinach", id: "spinach" };
const bacon = { price: 1, gramm: 20, name: "Bacon", id: "bacon" };
const sauce = { price: 1, gramm: 30, name: "Sauce", id: "sauce" };
const tomatoes = {
  price: 1,
  gramm: 30,
  name: "Tomatoes",
  id: "tomatoes",
};
const cabbageLeaf = {
  price: 1,
  gramm: 10,
  name: "Сabbage leaf",
  id: "cabbageLeaf",
};
const cucumber = {
  price: 1,
  gramm: 10,
  name: "Сucumber",
  id: "cucumber",
};
const chicken = { price: 1, gramm: 50, name: "Chicken", id: "chicken" };
const BBQSouce = {
  price: 1,
  gramm: 30,
  name: "BBQ Souce",
  id: "BBQSouce",
};
const beefCutlet = {
  price: 1,
  gramm: 100,
  name: "Beef cutlet",
  id: "beefCutlet",
};
const cheese = { price: 1, gramm: 10, name: "Cheese", id: "cheese" };
const creamSouce = {
  price: 1,
  gramm: 50,
  name: "Cream souce",
  id: "creamSouce",
};
const raspberry = {
  price: 1,
  gramm: 20,
  name: "Raspberry",
  id: "raspberry",
};
const raspberryChocolate = {
  price: 1,
  gramm: 10,
  name: "Raspberry chocolate",
  id: "raspberryChocolate",
};
const cheesecakes = {
  price: 10,
  gramm: 300,
  name: "Сheesecakes",
  id: "cheesecakes",
};
const miniСheesecake = {
  price: 1,
  gramm: 30,
  name: "Mini Cheesecake",
  id: "miniСheesecake",
};
const powderedSugar = {
  price: 1,
  gramm: 3,
  name: "Powdered sugar",
  id: "powderedSugar",
};
const cheesecake = {
  price: 4,
  gramm: 150,
  name: "Сheesecake",
  id: "cheesecake",
};
const stuffingList = [
  doubleEspresso,
  orangeFresh,
  caramelSyrup,
  crushedIce,
  whiteRum,
  soda,
  lime,
  strawberry,
  halfStrawberry,
  mint,
  espresso,
  steamedMilk,
  foam,
  eggs,
  tosts,
  avocado,
  spinach,
  bacon,
  sauce,
  tomatoes,
  cabbageLeaf,
  cucumber,
  chicken,
  BBQSouce,
  beefCutlet,
  cheese,
  creamSouce,
  raspberry,
  raspberryChocolate,
  cheesecakes,
  miniСheesecake,
  powderedSugar,
  cheesecake,
];

class Food {
  constructor(foodName, size, stuffing = []) {
    this.foodName = foodName;
    this.size = size;
    this.stuffing = [...stuffing];
  }
  calculatePrice() {
    let price =
      this.size * this.stuffing.reduce((acc, curr) => acc + curr.price, 0);
    return price;
  }
  addStuffing(stuffing) {
    this.stuffing.push(stuffing);
  }

  removeStiffing(stuffing) {
    const index = this.stuffing.indexOf(stuffing);
    this.stuffing.splice(index, 1);
  }
}

const bumble = new Food("bumble", standartSize, [
  doubleEspresso,
  orangeFresh,
  caramelSyrup,
  crushedIce,
]);

const strawberryMojito = new Food("strawberry_mojito", standartSize, [
  whiteRum,
  soda,
  lime,
  strawberry,
  mint,
  crushedIce,
]);

const cappuccino = new Food("cappuccino", standartSize, [
  espresso,
  steamedMilk,
  foam,
]);

const englishBreakfast = new Food("english_breakfast", standartSize, [
  eggs,
  tosts,
  avocado,
  spinach,
  bacon,
  sauce,
]);

const sandwich = new Food("sandwich", standartSize, [
  tosts,
  tomatoes,
  cabbageLeaf,
  cucumber,
  chicken,
  BBQSouce,
]);

const burger = new Food("burger", standartSize, [
  beefCutlet,
  cabbageLeaf,
  tomatoes,
  cheese,
  BBQSouce,
]);

const croissant = new Food("croissant", standartSize, [
  creamSouce,
  raspberry,
  raspberryChocolate,
]);

const miniCheesecakes = new Food("mini_cheesecakes", standartSize, [
  cheesecakes,
  strawberry,
  creamSouce,
  powderedSugar,
]);

const cheesecakeDessert = new Food("cheesecake", standartSize, [
  cheesecake,
  strawberry,
  powderedSugar,
]);

const foodList = [
  bumble,
  strawberryMojito,
  cappuccino,
  englishBreakfast,
  sandwich,
  burger,
  croissant,
  miniCheesecakes,
  cheesecakeDessert,
];

export {
  showBtnList,
  productList,
  orderBtnList,
  productCardList,
  productPricesList,
  curStuffingList,
  confirmOrderBtn,
  scrollController,
  formEditor,
  addStuffingBtn,
  stuffingSelector,
  doubleEspresso,
  orangeFresh,
  caramelSyrup,
  crushedIce,
  whiteRum,
  soda,
  lime,
  strawberry,
  halfStrawberry,
  mint,
  espresso,
  steamedMilk,
  foam,
  eggs,
  tosts,
  avocado,
  spinach,
  bacon,
  sauce,
  tomatoes,
  cabbageLeaf,
  cucumber,
  chicken,
  BBQSouce,
  beefCutlet,
  cheese,
  creamSouce,
  raspberry,
  raspberryChocolate,
  cheesecakes,
  miniСheesecake,
  powderedSugar,
  cheesecake,
  stuffingList,
  bumble,
  strawberryMojito,
  cappuccino,
  englishBreakfast,
  sandwich,
  burger,
  croissant,
  miniCheesecakes,
  cheesecakeDessert,
  foodList,
};
