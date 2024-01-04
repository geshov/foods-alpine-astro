import Alpine from "alpinejs";
window["Alpine"] = Alpine;

import persist from "@alpinejs/persist";
Alpine.plugin(persist);

Alpine.data("foods", function () {
  return {
    view: this.$persist("dishes"),
    search: this.$persist(""),

    select: this.$persist([]),
    buy: this.$persist([]),

    add: "",
    custom: this.$persist([]),

    name: "",
    recipe: "",

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

      const customFoods = this.custom.map((item, index) => ({
        slug: "custom-" + index,
        name: item,
        dish: "Добавлено вручную",
      }));
      menuFoods = [...menuFoods, ...customFoods];

      return this.sortFoods(menuFoods);
    },

    sortFoods(foods) {
      foods.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName > bName) return 1;
        else if (aName < bName) return -1;
        else return 0;
      });
      return foods;
    },

    showRecipe(name, slug) {
      this.$refs.loader.showModal();
      fetch(`/recipes/${slug}/`)
        .then((response) => response.text())
        .then((text) => {
          this.name = name;
          this.recipe = text;
          this.$refs.loader.close();
          this.$refs.recipe.showModal();
        });
    },

    toggleSelect(dish) {
      const index = this.select.indexOf(dish.slug);
      if (index === -1) this.select.push(dish.slug);
      else this.select.splice(index, 1);
    },

    addFood() {
      this.custom.push(this.add);
      this.add = "";
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
      this.custom.splice(0, this.custom.length);
      this.select.splice(0, this.select.length);
      this.search = "";
    },
  };
});

Alpine.start();
