
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {User} from '../../providers/user/user';
import { AcceuilPage } from '../acceuil/acceuil';
import {PictureProvider} from '../../providers/picture/picture';

import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { storage,initializeApp } from "firebase"; 
declare var cordova: any

//@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  name:any; 
  email:any; 
  password:any; 
  photo:any="none"; 
  passwordC:any;
  lastImage: string = null;
  loading: Loading;
  profilePhotoUrl; 
  sourceType;
  constructor(private pPhoto:PictureProvider,public navCtrl: NavController, public navParams: NavParams,public userCont:User,private alertCtrl: AlertController,private camera: Camera, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  
  }
  save(name,password){
  let user = {
    name:this.name,
    email: this.email,
    password: this.password,
    //photo:this.photo
  };
return user;
}
  createAccount(name,password,passwordC,email){
    if (this.password==this.passwordC){
      let user = {
        name:this.name,
        email: this.email,
        password: this.password,
        photo:this.photo,
        following:[],
        Spots:[]
      };
    this.userCont.getInfo(user).then(data=>{
      if(data==false){
              this.userCont.createUser(user);
          let alert = this.alertCtrl.create({
            title: 'confirmation',
            subTitle: 'your account has been created ',
            buttons: ['Continue']
          });
          alert.present();
          this.navCtrl.push(AcceuilPage)
      }else{
        let alert = this.alertCtrl.create({
          title: 'usernameEror',
          subTitle: 'you are using an existing username ',
          buttons: ['restart']
        });
        alert.present();
      }
    })
    
    console.log("from:",user);
    
    this.userCont.createUser(user);
    let alert = this.alertCtrl.create({
      title: 'confirmation',
      subTitle: 'your account has been created ',
      buttons: ['Continue']
    });
    alert.present();
    this.navCtrl.push(AcceuilPage)
  }
  else{
    
    let alert = this.alertCtrl.create({
      title: 'Eror',
      subTitle: 'please verify your password',
      buttons: ['Retry']
    });
    alert.present();
  }
  }
  //image stuff 
  async grabPicture(sourceType){
    this.photo=this.pPhoto.profilepicture(this.name,sourceType).then(data=>{
      console.log("finalee",data);
      this.photo=data;
      
    })

      
    
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Type',
      buttons: [
        {
          text: 'open camera',
          
          handler: () => {
            this.grabPicture(1);
          }
        },{
          text: 'upload from phones',
          handler: () => {
            this.grabPicture(0);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

}
