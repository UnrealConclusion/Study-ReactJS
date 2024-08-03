import PropTypes from 'prop-types';
import styles from "./CountryItem.module.css";

function CountryItem({ country, emoji }) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;

CountryItem.propTypes = {
  country : PropTypes.string,
  emoji : PropTypes.string
}