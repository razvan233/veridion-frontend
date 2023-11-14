import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Box, Typography, Divider } from "@mui/material";
import * as turf from '@turf/turf'
import RoomIcon from "@mui/icons-material/Room";
import { MAPBOX_API_KEY, zoomLevels, zoomDef } from "../utils/vars";
const LocationsMap = ({ locations }) => {
    const [viewport, setViewport] = useState({
        latitude: 47.3769,
        longitude: 8.5417,
        zoom: 12,
    });
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef();
    const [validLocations, setValidLocations] = useState(false)
    const createMarkers = (locations) => {
        const dim = 24;
        const pointsOnMap = []
        const _markers =  locations.map((location, index) => {
                pointsOnMap.push([location.latitude, location.longitude])
                return (
                    <Marker
                        key={index}
                        latitude={location.latitude}
                        longitude={location.longitude}
                        anchor="bottom"
                        offset={[dim / 2, dim / 2]}
                    >
                        <RoomIcon
                            style={{
                                color: "red",
                                height: dim * 2,
                                width: dim * 2,
                                opacity: 0.95,
                            }}
                        />
                    </Marker>
                );
        });
        console.log(pointsOnMap)
        zoomTo(pointsOnMap, 24)
        return _markers
    };
    function k_combinations(set, k) {
        var i, j, combs, head, tailcombs;

        if (k > set.length || k <= 0) {
            return [];
        }

        if (k === set.length) {
            return [set];
        }

        if (k === 1) {
            combs = [];
            for (i = 0; i < set.length; i++) {
                combs.push([set[i]]);
            }
            return combs;
        }

        combs = [];
        for (i = 0; i < set.length - k + 1; i++) {
            head = set.slice(i, i + 1);
            tailcombs = k_combinations(set.slice(i + 1), k - 1);
            for (j = 0; j < tailcombs.length; j++) {
                combs.push(head.concat(tailcombs[j]));
            }
        }
        return combs;
    }
    function zoomTo(points, zoom) {
        let from, to, distance, midpoint, res, metersPerPixel, zoomLevel;
        let vw = viewport;
        let options = { units: "kilometers" };
        switch (points.length) {
            case 0:
                break;

            case 1:
                vw.latitude = points[0][0];
                vw.longitude = points[0][1];                
                zoom === 11 ? (vw.zoom = 15) : (vw.zoom = zoom);                                
                setViewport(vw);
                break;

            case 2:
                from = turf.point([points[0][0], points[0][1]]);
                to = turf.point([points[1][0], points[1][1]]);

                distance = turf.distance(from, to, options) * 1000; // * 1km = 1000m

                midpoint = turf.midpoint(from, to);

                res = Math.sqrt(window.innerHeight * window.innerWidth);

                metersPerPixel = distance / res;

                zoomLevel = 0;

                for (let z = 0; z < zoomLevels.length; z++) {
                    if (z < zoomLevels.length - 1) {
                        if (
                            zoomLevels[z][1] > metersPerPixel &&
                            zoomLevels[z + 1][1] < metersPerPixel
                        ) {
                            zoomLevel =
                                zoomLevels[z][0] - zoomLevels[z][0] * 0.5;

                            break;
                        }
                    }
                }

                vw.latitude = midpoint.geometry.coordinates[0];
                vw.longitude = midpoint.geometry.coordinates[1];
                zoom === zoomDef
                    ? (vw.zoom = zoomLevel)
                    : zoom > zoomLevel
                    ? (vw.zoom = zoomLevel)
                    : (vw.zoom = zoom);                                                

                setViewport(vw);
                break;

            default:
                let coordinates = [];
                for (let a = 0; a < points.length; a++) {
                    coordinates.push([points[a][0], points[a][1]]);
                }

                let polygon = turf.points(coordinates);
                let center = turf.center(polygon);

                let distances = [];
                let combi = k_combinations(coordinates, 2);

                for (let k = 0; k < combi.length; k++) {
                    let arr = combi[k];
                    distance = turf.distance(arr[0], arr[1], options) * 1000; // * 1km = 1000m
                    distances.push(distance);
                }
                let max_distance = Math.max(...distances);

                res = Math.sqrt(window.innerHeight * window.innerWidth);

                metersPerPixel = max_distance / res;
                zoomLevel = 0;

                for (let z = 0; z < zoomLevels.length; z++) {
                    if (z < zoomLevels.length - 1) {
                        if (
                            zoomLevels[z][1] > metersPerPixel &&
                            zoomLevels[z + 1][1] < metersPerPixel
                        ) {
                            zoomLevel =
                                zoomLevels[z][0] - zoomLevels[z][0] * 0.5;
                            break;
                        }
                    }
                }
                vw.latitude = center.geometry.coordinates[0];
                vw.longitude = center.geometry.coordinates[1];

                vw.zoom = zoomLevel                                                
                console.log(viewport)
                setViewport(vw);
        }
    }
    useEffect(() => {
        const _validLocations = []
        locations.forEach(location =>{
            if(location.longitude !== 'null' && location.latitude){
                _validLocations.push(location)
            }
        })
        if (_validLocations.length > 0) {
            setValidLocations(true)
            const markers = createMarkers(_validLocations);
            setMarkers(markers);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locations]);
    if(!validLocations){
        return<></>
    }
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 3,
                height: {
                    xs:300,
                    md:600
                },
                width: "100%",
                mb: 5,
            }}
        >
            <Typography variant="h6">Locations on map:</Typography>

            <Divider sx={{ mt: 1, mb: 2 }} />
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                onMove={(evt) => {
                    let vw = viewport;
                    vw = { ...evt.viewState };
                    setViewport(vw);
                }}
                mapStyle="mapbox://styles/rcristea6868/cllaujyaq00s601pd1jcb91r8"
                mapboxAccessToken={MAPBOX_API_KEY}
                ref={mapRef}
            >
                {markers}
            </ReactMapGL>
        </Box>
    );
};

export default LocationsMap;
