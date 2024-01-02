import Alpine from "alpinejs";
window["Alpine"] = Alpine;

Alpine.data("foods", () => ({
  view: "dishes",
  search: "",

  select: [],
  buy: [],

  get count() {
    return {
      dishes: this.recipes.length,
      select: this.select.length,
      foods: this.foods.length,
    };
  },

  get dishes() {
    const term = this.search.toLowerCase();
    return this.recipes
      .filter((dish) => !this.select.includes(dish.slug))
      .filter((dish) => dish.data.name.toLowerCase().includes(term));
  },

  get menu() {
    return this.recipes.filter((dish) => this.select.includes(dish.slug));
  },

  get foods() {
    let menuFoods = [];
    this.menu.forEach((dish) => {
      const dishFoods = dish.data.foods.map((food, index) => ({
        slug: dish.slug + "-" + index,
        name: food,
        dish: dish.data.name,
      }));
      menuFoods = [...menuFoods, ...dishFoods];
    });
    return this.sortFoods(menuFoods);
  },

  sortFoods(foods) {
    foods.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      else return 0;
    });
    return foods;
  },

  toggleSelect(dish) {
    const index = this.select.indexOf(dish.slug);
    if (index === -1) this.select.push(dish.slug);
    else this.select.splice(index, 1);
  },

  toggleBuy(food) {
    const index = this.buy.indexOf(food.slug);
    if (index === -1) this.buy.push(food.slug);
    else this.buy.splice(index, 1);
  },

  isBuy(food) {
    const index = this.buy.indexOf(food.slug);
    if (index === -1) return false;
    else return true;
  },

  clearAll() {
    this.buy.splice(0, this.buy.length);
    this.select.splice(0, this.select.length);
    this.search = "";
  },
}));

Alpine.start();
