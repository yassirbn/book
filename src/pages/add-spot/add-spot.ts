import { Storage } from '@ionic/storage';

import { PictureProvider } from './../../providers/picture/picture';
import { Spot } from './../../providers/spot/spot';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-add-spot',
  templateUrl: 'add-spot.html',
})
export class AddSpotPage {
  name:any;
  description:any;
  adress:any; 
  imageURI:any;
  imageFileName:any;
  photo:any=[];
  username:any; 

  constructor(public storageCont:Storage,private picturecont:PictureProvider, public actionSheetCtrl: ActionSheetController,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder,public navCtrl: NavController, public navParams: NavParams,public Spotcont:Spot,private transfer: FileTransfer,private camera: Camera,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.position()
    storageCont.get('user').then(data=>{
      this.username=data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSpotPage');
  }

    createSpot(nom,description,adress){
     let spot={
      name:this.name,
      description:this.description,
      adress:this.adress,
      photo:this.photo,
      postedBy:this.username,
      date:new Date().toISOString(),
      note:'0'
     }
     console.log(spot);
     this.Spotcont.createSpot(spot).then(data=>{
       console.log(data);
     })
    }
    photot(sourceType){
      let spott=this.picturecont.spotpicture(this.username,sourceType).then(data=>{
        console.log(spott);
        console.log(data);
        this.photo.push(data)
      
      });
      
    }
    presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Choose Type',
        buttons: [
          {
            text: 'open camera',
            
            handler: () => {
              this.photot(1);
            }
          },{
            text: 'upload from phones',
            handler: () => {
              this.photot(0);
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
    position(){
      
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log( '22')
          console.log(resp.coords.latitude)
          console.log(resp.coords.longitude)
           
           this.nativeGeocoder.reverseGeocode(resp.coords.latitude,resp.coords.longitude )
          .then((result: NativeGeocoderReverseResult) => {
            this.adress=result[0].subAdministrativeArea+"-"+result[0].thoroughfare
            console.log(result)})
          .catch((error: any) => console.log(error));
        
          
         }).catch((error) => {
           console.log('Error getting location', error);
         });
      
         this.nativeGeocoder.reverseGeocode(34.340656, 8.9481593 )
        .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
        .catch((error: any) => console.log(error));
        
        
    }
    //photo sutuff 
    //getimage from llibrery 
    
    
}
