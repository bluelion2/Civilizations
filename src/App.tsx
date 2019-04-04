import React, { Component } from 'react';
import './App.scss';
import Header from './main/header/header';
import Timer from './main/timer/timer';


declare var google: any;
declare var window: any;
declare var map: any;
class App extends Component {

  state = {
    location: '광화문',
    isLoad: false,
    time: 100,
  }

  // google map variable
  _geocoder: any;
  _map: any;
  intervalHandle: any;
  target: any;

  timer: any;
  // lat: 위도(북, 남) , lng: 경도(동, 서)
  componentDidMount() {
    this.setScript();
  }

  // googlemap 스크립트 삽입
  setScript = (): void => {
    if (document.getElementById('civilization')) { return; }
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD0xjTlohJCtVepzm6Up7-hQWmsZvU6uk';
    script.async = true;
    script.defer = true;
    script.id = 'civilization';
    document.head.appendChild(script);
    setTimeout(() => {
      this.initMap();
    }, 1500);
  }

  // initMap = () => {
  //   var citymap: any = {
  //     chicago: {
  //       center: {lat: 41.878, lng: -87.629},
  //       population: 2714856
  //     },
  //     seoul: {
  //       center: {lat: 37.498095, lng: 127.07610},
  //       population: 500000,
  //     }
  //   };

  //   // Create the map.
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 8,
  //     center: {lat: 37.090, lng: -95.712},
  //   });
  
  //   // Construct the circle for each value in citymap.
  //   // Note: We scale the area of the circle based on the population.
  //   for (var city in citymap) {
  //     // Add the circle for this city to the map.
  //     var cityCircle = new google.maps.Circle({
  //       strokeColor: '#000000',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 2,
  //       fillColor: '#000000',
  //       fillOpacity: 0.35,
  //       map: map,
  //       center: citymap[city].center,
  //       radius: (citymap[city].population) / 100
  //     });
  //     console.log(cityCircle);
  //   }
  // }
  
  initMap = (): void => {
    window.map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: this.getRandomeMapPoint(), lng: this.getRandomeMapPoint()}, // 랜덤좌표 셋팅
      center: { lat: 37.5745879197085, lng: 126.97546671970849}, // 광화문 기본 셋팅
      zoom: 15,
    });
    this._geocoder = new google.maps.Geocoder();
    this._map = window.map;
    this.setCircle(37.5745879197085, 126.97546671970849);
  }

  // // 검색해서 해당 주소 찾기
  // find() {
  //   this._geocoder.geocode({'address': '광화문'},
  //     (results: any, status: any) => {
  //     if (status == 'OK') {
  //       console.log(results);
  //       // console.log(map, 'map function');
  //       // console.log('===');
  //       // console.log(results[0].geometry)
  //       // x, y 좌표 catch
  //       console.log('lng', results[0].geometry.viewport.ga.j);
  //       console.log('lat', results[0].geometry.viewport.ma.j);
  //       map.setCenter(results[0].geometry.location);
  //       // const marker = new google.maps.Marker({
  //       //   map: this.map,
  //       //   position: results[0].geometry.location
  //       // });
  //       this.setCircle();
  //     } else {
  //       console.log('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }

  setCircle = (lat: number, lng: number): void => {
    this.target = new google.maps.Circle({
      strokeColor: '#ffffff',
      strokeOpacity: 0.01,
      strokeWeight: 2,
      fillColor: '#ffffff',
      fillOpacity: 0.01,
      map: map,
      center: {
        lat: lat,
        lng: lng
      },
      radius: 1000,
    });

    window.google.maps.event.addListener(this.target, 'click', (e: any) => {
      console.log('inner circle', e.latLng);
      this.success();
    })
  }

  success = () => {
    alert('성공하셨습니다!');
  } 

  // // random 좌표 생성
  // getRandomeMapPoint(): number {
  //   return Math.round((Math.random()*360 - 180) * 1000)/1000;
  // }

  // // map click 이벤트 : 좌표 catch
  // mapClick() {
  //   window.google.maps.event.addListener(map, 'click', (e: any) => {
  //     console.log('event', e);
  //     console.log('click latlng', e.latLng.lat(), e.latLng.lng())
  //   });
  // }

  // handleSubmit = (data: any) => {
  //   console.log(data);
  // }

  // Todo
  // 1초당 1씩 감소하는 함수
  // 0이되면 정지

  minusCount = () => {
    if (this.state.time <= 1) {
      return;
    }
    this.setState({
      time: this.state.time - 1
    })
  }


  render(): JSX.Element {

    // const minus = setInterval(this.minusCount, 1000)
    // setTimeout(() => {
    //   clearInterval(minus)
    // }, 5000);

    return (
      <div className="App">
        <Header title={this.state.location}></Header>
        <Timer time={this.state.time}></Timer>
        <div className="map" id="map"></div>
      </div>
    );
  }
}

export default App;