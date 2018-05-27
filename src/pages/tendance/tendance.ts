import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from './../map/map';
import { CommentsPage } from './../comments/comments';
import { CreateAccountPage } from './../create-account/create-account';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Spot } from '../../providers/spot/spot';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tendance',
  templateUrl: 'tendance.html',
})
export class TendancePage {
  Spots:any=[];
  visitor=true;
  Comments=[];
  searchQuery: string = '';
  items: string[];
  myPos:any;
  constructor(public geolocation:Geolocation,public modalCont:ModalController ,public navCtrl: NavController, public navParams: NavParams,private spotCont:Spot,public storageCont:Storage) {
    this.getSpots();
    this.storageCont.get('connected').then(data=>{
      console.log(data);
    })
  }
  connect(){
    this.navCtrl.push(HomePage);
  }
  SignUp(){
    this.navCtrl.push(CreateAccountPage);
  }
  getSpots(){
    this.spotCont.getSpots().then(data=>{
      console.log(data);
      
      for(var element in data){
        this.Spots.push(data[element]);
      }
      console.log(this.Spots);
    })
  }
  getComments(name){
    this.Comments=[]
    console.log(name)
    for(var elm in name.comments){
      
       
      console.log(elm) 
      this.Comments.push(name.comments[elm])
        
      }
    console.log(this.Comments)
    let comm= this.modalCont.create(CommentsPage,{comments:this.Comments})  
    comm.present();
  }

  initializeItems() {
   this.items= this.Spots
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val) > -1);
      })
    }
  }
  getMyPos(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log( '22')
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.myPos={
        lat:resp.coords.latitude,
        long:resp.coords.longitude
      }
    });
  }
  getAddress(adress){
    for(let elm of adress){
      console.log(elm)
    } 
  }
  guideMe(pos){
    this.getAddress(pos)
    this.getMyPos()
    console.log(pos);
    console.log(this.myPos)
    this.modalCont.create(MapPage).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TendancePage');
  }

}
