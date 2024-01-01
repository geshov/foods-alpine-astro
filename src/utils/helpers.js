export const sortDishes = (dishes) => {
  dishes.sort((a, b) => {
    if (a.data.name > b.data.name) return 1;
    else if (a.data.name < b.data.name) return -1;
    else return 0;
  });
  return dishes;
};
