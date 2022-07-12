import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import backgroundImage from '../../assets/background.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Instant Eats</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={backgroundImage} alt='Healthy Food bowls' />
      </div>
    </Fragment>
  );
};

export default Header;
