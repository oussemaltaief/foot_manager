import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, TileLayer } from 'react-leaflet';

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});

class MapComp extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);
    if(this.props.value){
      results.addLayer(L.marker(this.props.value));
    }
    searchControl.on('results', (data) => {
      results.clearLayers();
      this.props.onChange && this.props.onChange(data.latlng);
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });
  }

  render() {
    const center = [36.85724000000005, 10.189320000000066];
    return (
      <Map
        style={{ height: '40vh' }}
        center={center}
        zoom='8'
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          attribution="&copy; <a href='https://osm.org/copyright'>STS</a> contributors"
          url={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />
        <div className='pointer' />
      </Map>
    );
  }

}
MapComp.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any
};
export default MapComp;
