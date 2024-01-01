export const sortDishes = (dishes) => {
  dishes.sort((a, b) => {
    if (a.data.name > b.data.name) return 1;
    else if (a.data.name < b.data.name) return -1;
    else return 0;
  });
  return dishes;
};

export const sortFoods = (foods) => {
  foods.sort((a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else return 0;
  });
  return foods;
};
