import { EditPage } from './../edit/edit';
import { Spot } from './../../providers/spot/spot';
import { TabsPage } from './../tabs/tabs';
import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, Tab, ActionSheetController, ModalController } from 'ionic-angular';
import { User } from '../../providers/user/user';
//import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
name;
photo;
email;
fllowers;
nbFllowers;
spots;
nbSpots;
FollowingInfo=[];
SpotsInfo=[];
  constructor( public modal:ModalController ,public actionSheetCtrl:ActionSheetController , public navCtrl: NavController,public storage: Storage,public userCont:User,public spotCont:Spot) {
    this.storage.get('user').then(data=>{
      let req={
        namel:data
      };
      this.userCont.getInfo(req).then(data=>{
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
    })
    
  }
logOut(){
  this.storage.clear();
  this.navCtrl.push(TabsPage)
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
/*showProfile(name){
  const profileModal = this.modalCont.create(ProfilePage);
  profileModal.present();
}*/


presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Modify your album',
    buttons: [
      {
        text: 'feedback',
        role: 'feedback',
        handler: () => {
          console.log('feedback');
        }
      },{
        text: 'signaler',
        handler: () => {
          console.log('feedback');
        }
      },{
        text: 'edit',
        role: 'modifier',
        handler: () => {
          this.modal.create(EditPage).present()   ;
          }
      },{
        text: 'logout',
        role: 'deconnecter',
        handler: () => {
          this.logOut();        }
      }
    ]
  });
  actionSheet.present();
}
}

