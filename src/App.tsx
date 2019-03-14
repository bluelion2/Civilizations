import React, { Component } from 'react';
import './App.scss';
import Input from './main/input';
import Login from './main/login';
import Button from '@material-ui/core/Button';

declare var google: any;
declare var window: any;
declare var map: any;
declare var FB: any;
class App extends Component {

  state = {
    location: '',
  }

  // google map variable
  _geocoder: any;
  _map: any;
  
  async componentDidMount() {
    await this.setScript();
  }
  
  // after load

  
  // googlemap 스크립트 삽입
  setScript(): void {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD0xjTlohJCtVepzm6Up7-hQWmsZvU6uk';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    setTimeout(() => {
      this.initMap();
      this.find();
    }, 1500);

  }
  
  initMap(): void {
    window.map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: this.getRandomeMapPoint(), lng: this.getRandomeMapPoint()}, // 랜덤좌표 셋팅
      center: {lat: 126.97546671970849, lng: 37.5745879197085}, // 광화문 기본 셋팅
      zoom: 10,
    });
    this._geocoder = new google.maps.Geocoder();
    this._map = window.map;
    this.setCircle();
  }

  setCircle() {
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: {lat: 41.878, lng: -87.629}, // 좌표값 받아와서 처리
      radius: 1000000,
      // center: {
      //   center: {lat: 41.878, lng: -87.629},
      //   population: 2714856
      // }.center,
      // radius: Math.sqrt({
      //   center: {lat: 41.878, lng: -87.629},
      //   population: 2714856
      // }.population) * 100
    });
    // console.log(cityCircle);
  }

  // 검색해서 해당 주소 찾기
  find(): void {
    this._geocoder.geocode({'address': '광화문'},
      (results: any, status: any) => {
      if (status == 'OK') {
        console.log(results);
        // console.log(map, 'map function');
        // console.log('===');
        // console.log(results[0].geometry)
        // x, y 좌표 catch
        console.log('lng', results[0].geometry.viewport.ga.j);
        console.log('lat', results[0].geometry.viewport.ma.j);
        map.setCenter(results[0].geometry.location);
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
    google.maps.event.addListener(map, 'click', (e: any) => {
      // console.log(e.latLng, this.map);
      // console.log('===')
      // 클릭 위치 좌표
      console.log('click latlng', e.latLng.lat(), e.latLng.lng())
    });
    
  }

  handleSubmit = (data: any) => {
    console.log(data);
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div>
          {/* 자식 검색값 -> 부모 컴포넌트로 이동 */}
          <input type="text" placeholder="find location" value={this.state.location} onChange={() => this.input(event)}></input>
          <Button variant="contained" color="primary" onClick={() => this.find()}>Get location</Button>
        </div>
        {/* <Input></Input> */}

        <div className="map" id="map" onClick={() => this.mapClick()}></div>
        <Login></Login>
      </div>
    );
  }
}

export default App;