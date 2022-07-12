import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { fetchMeals } from "../../store/meals-actions";

const AvailableMeals = () => {
  const dispatch = useDispatch();
  const mealItems = useSelector((state) => state.meals.items);
  const isLoading = useSelector((state) => state.meals.isLoading);
  const params = useParams();
  const { categoryId } = params;

  useEffect(() => {
    dispatch(fetchMeals(categoryId));
  }, [dispatch, categoryId]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = mealItems.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <>
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
