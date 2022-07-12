import { uiActions } from "./ui-slice";
import { mealsActions } from "./meals-slice";

import { v4 as uuid } from 'uuid';
  
// Custom Action Creator Thunk
export const fetchMeals = (categoryId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://food-app-67a27-default-rtdb.firebaseio.com/categories/0/${categoryId}.json`
      );

      if (!response.ok) {
        throw new Error("Could not load meals!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: uuid(),
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      return loadedMeals;
    };

    try {
      const mealData = await fetchData();

      dispatch(mealsActions.loadMeals(mealData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Unable to load meals, please try again later",
        })
      );
    }
  };
};
