import { Spot } from './../../providers/spot/spot';
import { Storage } from '@ionic/storage';
import { AddSpotPage } from './../add-spot/add-spot';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../providers/user/user';


//@IonicPage()
@Component({
  selector: 'page-acceuil',
  templateUrl: 'acceuil.html',
  
})
export class AcceuilPage {
  friendsSpot=[];
  friends: any;
  users:any;
  spotf:any;
  items;
  images=['1.jpg','2.jpg','3.jpg','4.jpg']
  constructor(public spotCont:Spot,public modalCont:ModalController,public navCtrl: NavController,private userCont:User, public navParams: NavParams,public storage:Storage,public spot:Spot) {
    this.storage.get('user').then(data=>{
      console.log(data);
      this.users=data;
      this.getFriendsSpots()
    }) ;
    this.spot.getSpots();
    this.storage.get('spots').then(data=>{
      console.log(data);
      this.spotf=data;
    });
    
    }
    
  addSpot(){
    //this.navCtrl.push(AddSpotPage);
    const modal=this.modalCont.create(AddSpotPage);
    modal.present()
  }
  fllow(user){
    let request={
      name:this.users,
      name2:user
    }; 
    this.userCont.follow(request);
    
  }
  getItems(input){
    this.userCont.search({input:input}).then(data=>{
      this.items.push(data);
    })
  }
  getFriendsSpots(){
    this.spotCont.getSpots().then(data=>{
      this.userCont.getInfo({namel:this.users}).then(datau=>{
        this.friends=datau[0].following;
        console.log(data);
        console.log(this.friends);
        for(let elm in data){
          for(let elmt in this.friends){
            if(data[elm].postedBy==this.friends[elmt]){
              this.friendsSpot.push(data[elm]);
          }
        }

        }
        console.log(this.friendsSpot);
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceuilPage');
  }

}
