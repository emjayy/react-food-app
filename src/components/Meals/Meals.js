import { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/popular" />
        </Route>
        <Route path="/:categoryId" exact>
          <AvailableMeals />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Meals;
