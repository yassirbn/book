import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Spot } from '../../providers/spot/spot';




@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name;
  photo;
  email;
  fllowers;
  nbFllowers;
  spots;
  nbSpots;
  FollowingInfo=[];
  SpotsInfo=[];
  friend;
  constructor(public navCtrl: NavController,public modalCont:ModalController, public navParams: NavParams,public userCont:User,public spotCont:Spot) {
    this.name=this.navParams.get('user')
    this.friend=this.navParams.get('friend')
    this.userCont.getInfo({namel:this.name}).then(data=>{
      console.log(data[0]);
        this.name=data[0].name;
        this.photo=data[0].photo;
        this.email=data[0].email;
        this.fllowers=data[0].following;
        this.nbFllowers=data[0].following.length;
        console.log(this.nbFllowers);
        this.spots=data[0].Spots;
        this.nbSpots=data[0].Spots.length;
        console.log(this.nbSpots);
    })

  }
  getFollowing(){
    this.SpotsInfo=[];
  for(let person in this.fllowers){
    let name={
      namel:this.fllowers[person]
    }
    
    this.userCont.getInfo(name).then(data=>{
      console.log(data);
      this.FollowingInfo.push(data[0])
    })
  }
  console.log(this.FollowingInfo);
  }
  closeFollow(){
    this.FollowingInfo=[];
  }
  getSpots(){
    this.FollowingInfo=[];
    this.spotCont.getSpots().then(data=>{
     // console.log(data)
      for(let elm in data){
        for(let spot in this.spots){
        if(data[elm].name==this.spots[spot]){
          this.SpotsInfo.push({
            name:data[elm].name,
            comments:data[elm].comments.length,
            note:data[elm].note
          })
        }
        
      }}
      console.log( this.SpotsInfo);
    })
  }
 /* showProfile(name){
    let profileModal = this.modalCont.create(this.profil, { user: name });
    profileModal.present();
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
