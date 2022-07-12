import classes from "./MealsSummary.module.css";
import { NavLink } from "react-router-dom";

import chineseCategoryImage from "../../assets/chinese.png";
import burgersCategoryImage from "../../assets/burger.png";
import healthyCategoryImage from "../../assets/healthy.png";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite dish from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, by our
        experienced chefs.
      </p>
      <p>Select from popular options, or browse a category below.</p>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/chinese" activeClassName={classes.active}>
              <div>
                <img src={chineseCategoryImage} alt="Chinese" />
              </div>
              Chinese
            </NavLink>
          </li>
          <li>
            <NavLink to="/burgers" activeClassName={classes.active}>
              <div>
                <img src={burgersCategoryImage} alt="Burgers" />
              </div>
              Burgers
            </NavLink>
          </li>
          <li>
            <NavLink to="/healthy" activeClassName={classes.active}>
              <div>
                <img src={healthyCategoryImage} alt="Healthy" />
              </div>
              Healthy
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default MealsSummary;
