import React, { Component } from 'react';
import './App.scss';
import Input from './main/input';
import Login from './main/login';


declare var google: any;
declare let window: any;
declare let map: any;
declare var FB: any;
class App extends Component {

  state = {
    location: '',
  }

  // google map variable
  map: any;
  geocoder: any;

  componentDidMount(): void {
    this.setScript();
  }

  // googlemap 스크립트 삽입
  setScript(): void {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD0xjTlohJCtVepzm6Up7-hQWmsZvU6uk';
    script.async = true;
    document.head.appendChild(script);
  }

  // 검색해서 해당 주소 찾기
  find(): void {
    this.geocoder = new google.maps.Geocoder();
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      // center: {lat: this.getRandomeMapPoint(), lng: this.getRandomeMapPoint()}
      // center: {lat: 126.97546671970849, lng: 37.5745879197085} // 광화문 기본 셋팅
    });

    this.geocoder.geocode({'address': this.state.location},
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

  // 텍스트 입력시 location 값 설정
  input(event: any) {
    this.setState({
      location: event.target.value,
    })
  }

  // random 좌표 생성
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
      console.log('click latlng', e.latLng.lat(), e.latLng.lng())
    });
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div>
          {/* 자식 검색값 -> 부모 컴포넌트로 이동 */}
          <input type="text" placeholder="find location" onChange={() => this.input(event)}></input>
          <button onClick={() => this.find()}>Get location</button>
        </div>
        <Input></Input>

        <div className="map" id="map" onClick={() => this.mapClick()}>

        </div>
        <Login></Login>
      </div>
    );
  }
}

export default App;
