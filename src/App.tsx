import React, { Component } from 'react';
import './App.scss';
import Maps from './main/maps';
declare let geocoder: any;
declare let google: any;
declare let window: any;
declare let map: any;
class App extends Component {

  state = {
    location: '',
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD0xjTlohJCtVepzm6Up7-hQWmsZvU6uk';
    document.head.appendChild(script);
  }

  // 검색해서 해당 주소 찾기
  find() {
    const geocoder =  new google.maps.Geocoder();
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 126.97546671970849, lng: 37.5745879197085} // 광화문 기본 셋팅
    });

    geocoder.geocode({ 'address': this.state.location},
      (results: any, status: any) => {
      if (status == 'OK') {
        // console.log(map, 'map function');
        // console.log('===');
        // console.log(results[0].geometry)
        
        console.log(new google.maps.LatLng())
        // x, y 좌표 catch
        console.log('lat', results[0].geometry.viewport.ga.j);
        console.log('lng', results[0].geometry.viewport.ma.j);
        map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });

    // this.setState({
    //   location: '',
    // })
  }

  input(event: any) {
    this.setState({
      location: event.target.value,
    })
  }

  mapClick() {
    console.log('a')
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div>
          <input type="text" placeholder="find location" onChange={() => this.input(event)}></input>
          <button onClick={() => this.find()}>Get location</button>
        </div>
        {/* <Maps lat={0} lan={1}></Maps> */}
        <div className="map" id="map" onClick={() => this.mapClick()}>

        </div>
      </div>
    );
  }
}

export default App;
