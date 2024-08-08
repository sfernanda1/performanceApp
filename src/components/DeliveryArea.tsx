import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import deliveryArea from '../static/deliveryArea.json';
import { FeatureCollection, Feature, Geometry } from 'geojson';

const { BaseLayer } = LayersControl;

const deliveryAreaData: FeatureCollection<Geometry> = deliveryArea as FeatureCollection<Geometry>;

type DeliveryAreaProps = {
    someProp?: string;
    anotherProp?: number;
};

const DeliveryArea: React.FC<DeliveryAreaProps> = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const style = {
        color: '#aba0eb',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5,
    };

    return (
        <MapContainer center={[-15.7801, -47.9292]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <LayersControl position="topright">
                <BaseLayer checked name="Street Map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </BaseLayer>
                <BaseLayer name="Satellite">
                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Zlcm5hbmRhMSIsImEiOiJjbHprdG5sYXkwMnNpMnJvam16ZjlydTcyIn0.lZUovad_WhzsDut7gXhsUA"
                        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
                        accessToken="pk.eyJ1Ijoic2Zlcm5hbmRhMSIsImEiOiJjbHprdG5sYXkwMnNpMnJvam16ZjlydTcyIn0.lZUovad_WhzsDut7gXhsUA"
                    />
                </BaseLayer>
            </LayersControl>
            <GeoJSON data={deliveryAreaData} style={style} />
        </MapContainer>
    );
};

export default DeliveryArea;