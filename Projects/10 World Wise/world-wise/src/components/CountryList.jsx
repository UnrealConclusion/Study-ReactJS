import Message from "./Message";
import PropTypes from 'prop-types';
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
    if (isLoading) {
        return <Spinner/>;
    }

    if (!cities.length) {
        return <Message message="Add your first city by clicking on a city on the map"/>
    }

    const countries = cities.reduce((countries, city) => {
        if (countries[city.country] === undefined) {
            countries[city.country] = city.emoji;
        }
        return countries;
    }, {});

    return (
        <ul className={styles.countryList}>
            {Object.keys(countries).map(country => <CountryItem key={country} country={country} emoji={countries[country]}/>)}
        </ul>
    );
}

CountryList.propTypes = {
    cities : PropTypes.array,
    isLoading : PropTypes.bool
}