import { map } from 'rxjs/operators';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
 @ViewChild('map') mapRef :ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
showMap(){
  const currentPos = new google.maps.LatLng(35.762675, 10.840248);
  //location has to be long and lat 
  const location = new google.maps.LatLng(34.340940, 8.948007);
  //map Options 
  const options ={
    center:location,
    zoom:10

  };
  let map =new google.maps.Map(this.mapRef.nativeElement,options);
  //associating direction display to the map
  this.directionsDisplay.setMap(map);
  this.directionsDisplay.setOptions({
     suppressMarkers: true ,
     optimizeWaypoints: false
    });
  this.addMarker(location,map);
  this.addMarker(currentPos,map);
  this.calculateAndDisplayRoute(currentPos,location);
}
addMarker(location,map){
  return new google.maps.Marker({
    position: location,
      map:map,
      animation: google.maps.Animation.DROP,
  })
}

calculateAndDisplayRoute(start,end) {

  console.log(start,end);
  this.directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'WALKING'
  }, (response, status) => {
    if (status === 'OK') {
      this.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.showMap();
  }

}
