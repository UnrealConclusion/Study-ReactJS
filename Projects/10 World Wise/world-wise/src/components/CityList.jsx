import CityItem from './CityItem'
import Message from './Message'
import PropTypes from 'prop-types';
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import { useCitiesContext } from '../contexts/CitiesContext';


export default function CityList() {
    const { cities, isLoading } = useCitiesContext();

    if (isLoading) {
        return <Spinner/>;
    }

    if (!cities.length) {
        return <Message message="Add your first city by clicking on a city on the map"/>
    }

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id}/>)}
        </ul>
    );
}

CityList.propTypes = {
    cities: PropTypes.array,
    isLoading: PropTypes.bool
}