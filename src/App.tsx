import React, { Component } from 'react';
import './App.scss';
import Header from './main/header/header';
import Start from './main/modal/start/start';
import Success from './main/modal/success/success';

interface Location {
  lat: number;
  lng: number;
  target: string;
}

declare var google: any;
declare var window: any;
declare var map: any;
export default class App extends Component {

  state = {
    location: '',
    isLoad: false,
    time: 10,
    openModal: false,
    name: '',
  }

  location: Array<Location> = [
    { lat: 48.8570211197085, lng: 2.2931323197085476, target: 'Eiffel tower' },
    { lat: 37.5745879197085, lng: 126.97546671970849, target: '광화문' },
    { lat:  51.5067634197085,lng: -0.07729828029152941, target: 'London tower'},
    { lat: 40.6879004197085, lng: -74.04584938029149, target: 'status of liberty'},
    { lat: -113.88604459999999, lng: 35.6745486, target: 'Grand canyan'},
    { lat: 39.9149957197085, lng: 116.39580561970843, target: 'forbidden palace'},
    { lat:  41.00723401970851, lng: 28.97882601970855, target: 'Ayasofya'},
    { lat: 51.1775330197085, lng: -1.8275639802915293, target: 'Stonehenge'}, 
    { lat: 41.8888612197085, lng: 12.4908819197085, target: 'Colosseum'},
    { lat: 41.8972618197085, lng: 12.475523919708507, target: 'Pantheon'},
    { lat: 37.1744622197085, lng: -3.590761100000009, target: 'Calle Real de la Alhambra'},
    { lat: 27.1736661197085, lng: 78.04080621970843, target: 'Taj Mahal'},
    { lat: 13.4111203197085, lng: 103.8656367197085, target: 'Angkor Wat'},
  ]

  // google map variable
  _geocoder: any;
  // intervalHandle: any;
  // target: any;

  // lat: 위도(북, 남) , lng: 경도(동, 서)
  componentDidMount(): void {
    this.setScript();
    // setTimeout(() => {
    //   this.find();
    // }, 10000);
  }

  // googlemap 스크립트 삽입
  setScript = (): void => {
    if (document.getElementById('civilization')) { return; }
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD0xjTlohJCtVepzm6Up7-hQWmsZvU6uk';
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
    const latlng = this.randomLatLng();
    window.map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: this.getRandomeMapPoint(), lng: this.getRandomeMapPoint()}, // 랜덤좌표 셋팅
      // center: {lat: latlng.lat, lng: latlng.lng},
      center: {lat: 37.5745879197085, lng: 126.97546671970849}, // 광화문 기본 셋팅
      zoom: 15,
    });
    // this._geocoder = new google.maps.Geocoder();
    // this._map = window.map;
    // this.setCircle(37.5745879197085, 126.97546671970849);
    this.setCircle(latlng.lat, latlng.lng);
    this.setState({
      location: latlng.target
    })
  }

  randomLatLng = (): Location => {
    const randomNum= Math.floor(Math.random() * this.location.length);
    // return this.location[randomNum];
    return this.location[1]
  }

  // // 검색해서 해당 주소 찾기
  // find() {
  //   this._geocoder.geocode({'address': 'Angkorwat'},
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
  //       // this.setCircle();
  //     } else {
  //       console.log('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }

  setCircle = (lat: number, lng: number): void => {
    const target = new google.maps.Circle({
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

    window.google.maps.event.addListener(target, 'click', (e: any) => {
      console.log(e, typeof e);
      this.success();
    })
  }

  success = (): void => {
    this.setState({
      openModal: true
    })
  } 

  close = (): void => {
    this.setState({
      openModal: false
    })
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

  // minusCount = () => {
  //   if (this.state.time <= 1) {
  //     return;
  //   }
  //   this.setState({
  //     time: this.state.time - 1
  //   })
  //   console.log(this.state.time);
  // }

  startGame = (name: string): void => {
    this.setState({
      name: name
    })
  }

  render(): JSX.Element {    
    return (
      <div className="App">
        <Start onClick={this.startGame}></Start>
        <Header time={this.state.time} title={this.state.location}></Header>
        {/* <Modal open={this.state.openModal}>
          <div>
            성공하셨습니다!
            <button onClick={this.close}></button>
          </div>
        </Modal> */}
        <div className="map" id="map"></div>
      </div>
    );
  }
}
