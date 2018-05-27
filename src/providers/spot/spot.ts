import { User } from './../user/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class Spot {
  tok:any; 
  constructor(public http: HttpClient,public usercont:User,public token:Storage) {
    console.log('Hello SpotProvider Provider');
  }
  createSpot(spot){
    //console.log(this.token.get('token'));
    return new Promise((resolve, reject) => {
    /*  this.token.get('token').then((data)=>{
        this.tok=data;
        console.log(this.tok);
      })*/
      this.http.post("https://boiling-journey-97761.herokuapp.com/api/spot", spot)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          console.log(err)
          reject(err);
        });
    });
  }
  getSpots(){
    return new Promise((resolve, reject) => {
    this.http.get("https://boiling-journey-97761.herokuapp.com/api/spots")
        .subscribe(res => {
          resolve(res);
          
        }, (err) => {
          console.log(err)
          reject(err);
        });
  });
}

}
