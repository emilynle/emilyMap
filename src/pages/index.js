import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";
const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const IndexPage = () => {
  // const markerRef = useRef();
  async function mapEffect(map) {
    let response;
    try {
      response = await axios.get("https://corona.lmao.ninja/v2/countries");
      console.log("response", response);
    } catch (error) {
      console.log("error", "failed to fetch countries");
      return null;
    }

    const { data = [] } = response;

    const hasData = Array.isArray(data) && data.length > 0;

    if (!hasData) return;

    console.log(data);

    const geoJson = {
      type: "FeatureCollection",
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: "Feature",
          properties: {
            ...country,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { country, updated, cases, deaths, recovered } = properties;

        casesString = `${cases}`;

        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });

    geoJsonLayers.addTo(map);

    return null;
  }

  async function stateMapEffect(map) {
    let response;
    try {
      response = await axios.get("https://corona.lmao.ninja/v2/states");
      console.log("response", response);
    } catch (error) {
      console.log("error", "failed to fetch states");
      return null;
    }

    var { data = [] } = response;

    const hasData = Array.isArray(data) && data.length > 0;

    if (!hasData) return;

    console.log(data);

    // let locationResponse;
    // try {
    //   locationResponse = await axios.get("https://gist.githubusercontent.com/meiqimichelle/7727723/raw/0109432d22f28fd1a669a3fd113e41c4193dbb5d/USstates_avg_latLong");
    //   console.log("location response", locationResponse);
    // } catch (error) {
    //   console.log("error", "failed to fetch state locations");
    //   return null;
    // }

    const geo = [
      { state: "Alaska", latitude: 61.385, longitude: -152.2683 },
      { state: "Alabama", latitude: 32.799, longitude: -86.8073 },
      { state: "Arkansas", latitude: 34.9513, longitude: -92.3809 },
      { state: "Arizona", latitude: 33.7712, longitude: -111.3877 },
      { state: "California", latitude: 36.17, longitude: -119.7462 },
      { state: "Colorado", latitude: 39.0646, longitude: -105.3272 },
      { state: "Connecticut", latitude: 41.5834, longitude: -72.7622 },
      { state: "Delaware", latitude: 39.3498, longitude: -75.5148 },
      { state: "Florida", latitude: 27.8333, longitude: -81.717 },
      { state: "Georgia", latitude: 32.9866, longitude: -83.6487 },
      { state: "Hawaii", latitude: 21.1098, longitude: -157.5311 },
      { state: "Iowa", latitude: 42.0046, longitude: -93.214 },
      { state: "Idaho", latitude: 44.2394, longitude: -114.5103 },
      { state: "Illinois", latitude: 40.3363, longitude: -89.0022 },
      { state: "Indiana", latitude: 39.8647, longitude: -86.2604 },
      { state: "Kansas", latitude: 38.5111, longitude: -96.8005 },
      { state: "Kentucky", latitude: 37.669, longitude: -84.6514 },
      { state: "Louisiana", latitude: 31.1801, longitude: -91.8749 },
      { state: "Massachusetts", latitude: 42.2373, longitude: -71.5314 },
      { state: "Maryland", latitude: 39.0724, longitude: -76.7902 },
      { state: "Maine", latitude: 44.6074, longitude: -69.3977 },
      { state: "Michigan", latitude: 43.3504, longitude: -84.5603 },
      { state: "Minnesota", latitude: 45.7326, longitude: -93.9196 },
      { state: "Missouri", latitude: 38.4623, longitude: -92.302 },
      { state: "Mississippi", latitude: 32.7673, longitude: -89.6812 },
      { state: "Montana", latitude: 46.9048, longitude: -110.3261 },
      { state: "North Carolina", latitude: 35.6411, longitude: -79.8431 },
      { state: "North Dakota", latitude: 47.5362, longitude: -99.793 },
      { state: "Nebraska", latitude: 41.1289, longitude: -98.2883 },
      { state: "New Hampshire", latitude: 43.4108, longitude: -71.5653 },
      { state: "New Jersey", latitude: 40.314, longitude: -74.5089 },
      { state: "New Mexico", latitude: 34.8375, longitude: -106.2371 },
      { state: "Nevada", latitude: 38.4199, longitude: -117.1219 },
      { state: "New York", latitude: 42.1497, longitude: -74.9384 },
      { state: "Ohio", latitude: 40.3736, longitude: -82.7755 },
      { state: "Oklahoma", latitude: 35.5376, longitude: -96.9247 },
      { state: "Oregon", latitude: 44.5672, longitude: -122.1269 },
      { state: "Pennsylvania", latitude: 40.5773, longitude: -77.264 },
      { state: "Rhode Island", latitude: 41.6772, longitude: -71.5101 },
      { state: "South Carolina", latitude: 33.8191, longitude: -80.9066 },
      { state: "South Dakota", latitude: 44.2853, longitude: -99.4632 },
      { state: "Tennessee", latitude: 35.7449, longitude: -86.7489 },
      { state: "Texas", latitude: 31.106, longitude: -97.6475 },
      { state: "Utah", latitude: 40.1135, longitude: -111.8535 },
      { state: "Virginia", latitude: 37.768, longitude: -78.2057 },
      { state: "Vermont", latitude: 44.0407, longitude: -72.7093 },
      { state: "Washington", latitude: 47.3917, longitude: -121.5708 },
      { state: "Wisconsin", latitude: 44.2563, longitude: -89.6385 },
      { state: "West Virginia", latitude: 38.468, longitude: -80.9696 },
      { state: "Wyoming", latitude: 42.7475, longitude: -107.2085 },
    ];

    // const locationHasData = Array.isArray(geo) && geo.length > 0;

    // if (!locationHasData) return;

    console.log(geo);

    // const combinedData = {
    //   ...geo,
    //   ...data,
    // };

    // const combinedData = {};
    // let key;

    // for (key in data) {
    //   if(data.hasOwnProperty(key)){
    //     result[key] = data[key];
    //   }
    // }

    // for (key in geo) {
    //   if(geo.hasOwnProperty(key)){
    //     result[key] = geo[key];
    //   }

    // const combinedData = {};

    // Object.keys(data)
    //   .forEach(key => combinedData[key] = data[key]);

    // Object.keys(geo)
    //   .forEach(key => combinedData[key] = geo[key]);

    // Object.keys(geo)
    // .concat(Object.keys(data))
    // .forEach(k => combinedData[k] = k in data ? data[k] : geo[k]);

    for (var i = 0; i < data.length; i++) {
      // if (jsonObj[i].Id === 3) {
      //   jsonObj[i].Username = "Thomas";
      //   break;
      // }

      for (var j = 0; j < geo.length; j++) {
        if (data[i].country === geo[j].country) {
          data[i].latitude = geo[j].latitude;
          data[i].longitude = geo[j].longitude;
        }
      }
    }

    console.log(data);

    const geoJson = {
      type: "FeatureCollection",
      features: data.map((state = {}) => {
        // const lat = latitude;
        // const lng = longitude;
        const { latitude: lat, longitude: lng } = state;
        return {
          type: "Feature",
          properties: {
            ...state,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { state, updated, cases, deaths, recovered } = properties;

        casesString = `${cases}`;

        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${state}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });

    geoJsonLayers.addTo(map);

    return null;
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    whenCreated: stateMapEffect,
  };
  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Map {...mapSettings}>
        {/* <MapEffect markerRef={markerRef} /> */}
        {/* <Marker ref={markerRef} position={CENTER} /> */}
      </Map>
      <Container type="content" className="text-center home-start">
        <h2>Still Getting Started?</h2>
        <p>Run the following in your terminal!</p>
        <Snippet>
          gatsby new [directory]
          https://github.com/colbyfayock/gatsby-starter-leaflet
        </Snippet>
        <p className="note">
          Note: Gatsby CLI required globally for the above command
        </p>
      </Container>
    </Layout>
  );
};
export default IndexPage;
