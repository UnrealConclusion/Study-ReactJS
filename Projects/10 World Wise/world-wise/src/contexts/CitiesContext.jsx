import { createContext, useState, useEffect, useContext, useReducer } from "react";
import PropTypes from 'prop-types';

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  cities: [],
  isLoading: false, 
  currentCity: {},
  error: ""
};

function reducer(state, action) {
  switch(action.type) {
    case "loading": 
      return {
        ...state,
        isLoading: true
      }
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case "city/created":
      return {
        ...state, 
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}
      }
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      throw new Error("Unknown Action Type");
  }
}

function CitiesProvider({children}) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState); 
    
    useEffect(() => {
      dispatch({type: "loading"});

      async function fetchCities() {
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          dispatch({type: "cities/loaded", payload: data});
        } 
        catch (error) {
          dispatch({
            type: "rejected",
            payload: "error loading cities"
          });
        }
      }
      fetchCities();
    }, []);

    async function getCity(id) {
      if (Number(id) === currentCity.id) {
        return;
      }

      dispatch({type: "loading"});

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({
          type: "city/loaded",
          payload: data
        });
      }
      catch {
        dispatch({
          type: "rejected",
          payload: "error loading city"
        });
      }
    }

    async function createCity(newCity) {
      dispatch({type: "loading"});
      try {
        const res = await fetch(
          `${BASE_URL}/cities/`, 
          {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const data = await res.json();
        dispatch({
          type: "city/created",
          payload: data
        });
      }
      catch {
        dispatch({
          type: "rejected",
          payload: "error creating city"
        });
      }
    }

    async function deleteCity(id) {
      dispatch({type: "loading"});
      try {
        const res = await fetch(
          `${BASE_URL}/cities/${id}`, 
          {
            method: "DELETE"
          }
        );

        dispatch({
          type: "city/deleted", 
          payload: id
        });
      }
      catch {
        dispatch({
          type: "rejected",
          payload: "error deleting city"
        });
      }
    }

    return (
        <CitiesContext.Provider
          value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
          }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("Cities Context was used outside the Cities Provider");
  }
  return context;
}

CitiesProvider.propTypes = {
  children : PropTypes.node
}

export { CitiesProvider, useCitiesContext }
