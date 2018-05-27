import { Camera,CameraOptions } from '@ionic-native/camera';

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class PictureProvider {
  selectedPhoto;
  loading;
  currentImage;
  username;
  url;

  constructor(public camera: Camera, public loadingCtrl: LoadingController,private alerltcont:AlertController) {
    firebase.initializeApp(environment.firebase);
  }

 async  profilepicture(name,sourceType){
   return new Promise(resolove=>{
    this.username=name+new Date().toISOString()+'profile';
    console.log(this.username)
    let res=this.takePicture(sourceType).then(data=>{
      console.log( res);
      console.log(data);
      resolove(data);
    })
   })
    
    
  }
  async spotpicture(name,sourceType){
    return new Promise(resolove=>{
      this.username=name+new Date().toISOString()+'spot';
      console.log(this.username);
      let more=true;
       
      
        let res=this.takePicture(sourceType).then(data=>{
          console.log(res);
          console.log(this.url);
          console.log(data);
          resolove(data)

      })
      
   
    
  })
}
    

 async takePicture(sourceType){
    return new Promise(resolve => {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 200,
        targetWidth: 200,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
        allowEdit: true,
        correctOrientation: true
      }
  
      this.camera.getPicture(options).then(async data => {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
  
        this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + data);
        
         this.url=this.upload(this.username)
        

        resolve(this.url);
        
      }, err => {
        console.log(err);
      });
    });
  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  async upload(name) {
    return new Promise(resolve=>{
      if (this.selectedPhoto) {
        var uploadTask = firebase.storage().ref().child('images/'+name+'.jpeg').put(this.selectedPhoto)
        .then(data=>{
          console.log(data);
          console.log(data.downloadURL);
          this.url=data.downloadURL
          this.currentImage = data.downloadURL;
          this.loading.dismiss()
          resolve(data.downloadURL) ;
        },error=>{
          console.log('error', error);
          this.loading.dismiss();
           resolve( error);
        });}
    })
      
       //uploadTask.then(this.onSuccess, this.onError)
      
    
    
  }
  onSuccess = (snapshot) => {
    console.log(snapshot);
    console.log(snapshot.downloadURL);
    this.url=snapshot.downloadURL
    this.currentImage = snapshot.downloadURL;
    this.loading.dismiss();  
    
  }

  onError = (error) => {
    console.log('error', error);
    this.loading.dismiss();
    
  }

  

}
