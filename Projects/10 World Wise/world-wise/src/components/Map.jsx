import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useGeolocation, useUrlPosition } from "../hooks"
import Button from "./Button"
import styles from "./Map.module.css";

export default function Map() {
    const { cities } = useCitiesContext();
    const [ mapPosition, setMapPosition ] = useState([40, 0]);
    const { isLoading: isLoadingPosition, position: geolocationPosition, error, getPosition } = useGeolocation();
    const [ mapLat, mapLng ] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]); 
        }
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            { !geolocationPosition &&
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading ..." : "Use your position"}
                </Button>
            }
            <MapContainer 
                center={mapPosition} 
                zoom={13} 
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city => 
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                )}
                <DetectClick/>
                <ChangeCenter position={mapPosition}/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });
}