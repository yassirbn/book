import { ProfilePage } from './../profile/profile';
import { MessagesPage } from './../messages/messages';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  Friends=[];
  user;
  corUser; 
  notFriends=[];
  constructor(public navCtrl: NavController,public userCont:User,public storageCont:Storage,public modalCont:ModalController) {
    console.log('Heloo')
    
    this.getFriends();

  }
  getFriends(){
    this.storageCont.get('user').then(data=>{
      console.log(data);
      this.user=data;
      let namel={
        namel:this.user
      }
      this.userCont.getInfo(namel).then(data=>{
        console.log(data[0].following);
        for(let elm in data[0].following){
          console.log('friend')

          console.log( data[0].following[elm]);
          this.getFriendsInfo(data[0].following[elm]).then(data=>{
            this.Friends.push({
              name:data[0].name,
              photo:data[0].photo
            })
          });
        }

        console.log(this.Friends)
        this.getsugession(this.Friends)
      })
    })
    this.storageCont.get('corentuser').then(data=>{
      this.corUser=data
    })
   
  }
  getFriendsInfo(friend){
    return new Promise((resolve, reject) => {
    let user={
      namel:friend
    }
    this.userCont.getInfo(user).then(data=>{
      console.log('info')
      console.log(data)
      resolve(data);
    })


  })}
  Message(name){
    console.log(name)
    this.getFriendsInfo(name).then(data=>{
      console.log(data)
      let rece=data[0].name
      this.navCtrl.push(MessagesPage,{user:this.user,receiver:rece});
    })
    
  }

  getsugession(friends){
   let find;
    this.userCont.getAllUsers().then(data=>{
      console.log(data)
      for(let elem in data){
        find=false
        console.log(elem)
        for(let friend in friends){
          if ((data[elem].name==friends[friend].name)||(data[elem].name==this.user)){
            find=true; 
            }
        }
        if (find==false){this.notFriends.push(
          {
          name:data[elem].name,
          photo:data[elem].photo
          }
        )}
      }
      console.log(this.notFriends)
    })
  }
  follow(name){
    let request={
      name1:this.user,
      name2:name
    }
    this.userCont.follow(request).then(data=>{
      console.log(data);
    })
  }
  showF(name){
    console.log(name)
    const profil=this.modalCont.create(ProfilePage,{user:name,friend:true});
    profil.present();
  }
  showNf(name){
    console.log(name)
    const profil=this.modalCont.create(ProfilePage,{user:name,friend:false});
    profil.present();
  }
}
