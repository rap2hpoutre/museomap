import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./App.css";
import Museo from "./Museo";
import MuseoMarker from "./MuseoMarker"

class App extends Component {
  state = {
    data: [] as Array<Museo>
  };
  componentDidMount() {
    fetch("/museo.json")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }
  markers() {
    return this.state.data.map(d => <MuseoMarker key={d.REF} item={d} />);
  }
  render() {
    return (
      <div className="App">
        <Map center={[46.8534, 2.3488]} zoom={6} maxZoom={50} className="Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>{this.markers()}</MarkerClusterGroup>
        </Map>
      </div>
    );
  }
}

export default App;
