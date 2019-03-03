import React, { Component } from 'react';
import './App.scss';

declare var google: any;
declare let window: any;
declare let map: any;

class App extends Component {

  state = {
    location: '',
  }

  // google map variable
  map: any;
  geocoder: any;
  googleMapsPromise: any = false;

  async componentDidMount() {
    await this.setScript();
  }

  setScript() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD0xjTlohJCtVepzm6Up7-hQWmsZvU6uk';
    script.async = true;
    document.head.appendChild(script);
  }

  // 검색해서 해당 주소 찾기
  find() {
    const geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      // center: {lat: this.getRandomeMapPoint(), lng: this.getRandomeMapPoint()}
      // center: {lat: 126.97546671970849, lng: 37.5745879197085} // 광화문 기본 셋팅
    });

    geocoder.geocode({'address': this.state.location},
      (results: any, status: any) => {
      if (status == 'OK') {
        // console.log(map, 'map function');
        // console.log('===');
        // console.log(results[0].geometry)
        // x, y 좌표 catch
        console.log('lng', results[0].geometry.viewport.ga.j);
        console.log('lat', results[0].geometry.viewport.ma.j);
        this.map.setCenter(results[0].geometry.location);
        // const marker = new google.maps.Marker({
        //   map: this.map,
        //   position: results[0].geometry.location
        // });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  input(event: any) {
    this.setState({
      location: event.target.value,
    })
  }

  getRandomeMapPoint(): number {
    return Math.round((Math.random()*360 - 180) * 1000)/1000;
  }

  // map click 이벤트 : 좌표 catch
  mapClick() {
    const google = window.google;
    google.maps.event.addListener(this.map, 'click', (e: any) => {
      // console.log(e.latLng, this.map);
      // console.log('===')
      // 클릭 위치 좌표
      console.log(e.latLng.lat(), e.latLng.lng())
    });
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div>
          <input type="text" placeholder="find location" onChange={() => this.input(event)}></input>
          <button onClick={() => this.find()}>Get location</button>
        </div>
        <div className="map" id="map" onClick={() => this.mapClick()}>

        </div>
      </div>
    );
  }
}

export default App;
