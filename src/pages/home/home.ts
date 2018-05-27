import { TabsPage } from './../tabs/tabs';
import { AboutPage } from './../about/about';
import { AcceuilPage } from './../acceuil/acceuil';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
export let ysaasir=5; 
import { CreateAccountPage } from '../create-account/create-account'
import { Storage } from '@ionic/storage';
import { User } from '../../providers/user/user';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

 
export class HomePage {
username :any;
password :any;
isLoggedIn:boolean;
users: any;
test:any; 
correntUser;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public loadingCtrl: LoadingController,public usercnt:User,private storage: Storage,private fb: Facebook,public modalCont:ModalController) {
    this.presentLoading();
    this.storage.get('token').then(data=>{
      console.log(data);
      if (data){
        this.navCtrl.setRoot(AcceuilPage);
        console.log('connected')
      }
      
    });
    this.storage.get('connected').then(data=>{
      console.log(data);
      if (data){
        this.isLoggedIn=true;
        this.storage.get('user').then(data=>{
          let users={
            name:data.name
          };
        })
      }});
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));


  }
  //login function 
  public async connect(username,password){
    if(username){
      if(password){
          if(username=="admin"){this.navCtrl.setRoot(AcceuilPage)}
        
        
          let user={
          name:this.username,
          password:this.password
                }
                console.log('0')
          let log=this.usercnt.logIn(user).then(data=>{
            console.log('1data');
            console.log(data);
            this.storage.set('connected',true)
            this.storage.set('user',this.username)
            this.navCtrl.setRoot(TabsPage)
          })
          
          let namel={
            namel:this.username
          }
          let info =this.usercnt.getInfo(namel).then(data=>{
            this.correntUser=data;
            console.log('infoo:',data)
            this.storage.set('corentuser',data);
          });
            this.storage.get('success').then(data=>{
              if(data==true||log){this.navCtrl.push(AcceuilPage,{user:this.correntUser});
              }else{
                let alert = this.alertCtrl.create({
                  title: 'user dosen"t exixt',
                  subTitle: 'please tape your password  ',
                  buttons: ['restart']
                });
                alert.present();
              }
            })
           
          
      }else{
        let alert = this.alertCtrl.create({
          title: 'password field empty',
          subTitle: 'please tape your password  ',
          buttons: ['restart']
        });
        alert.present();
      }
    }else{
      let alert = this.alertCtrl.create({
        title: 'username field empty',
        subTitle: 'please tape your username  ',
        buttons: ['restart']
      });
      alert.present();
    }
    
    
    let namel={
      namel:this.username
    }
  console.log(namel)
    
    let info =this.usercnt.getInfo(namel).then(data=>{
      this.correntUser=data;
      console.log('infoo:',data,info)
    });

    

    

    //this.navCtrl.push(AcceuilPage); 
  }
    
 
  public SignUpL(){
   this.navCtrl.push(CreateAccountPage); 
  }
  getInfo(username){
    let name={
      namel:this.username
    }
    this.usercnt.getInfo(name)

    
    console.log(this.storage.get('exist'));

  }
  //Login Facebook
  login() {
  
}

presentLoading() {
  let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
  });
  loader.present();
}

loginF() {
  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
  
      if(res.status === "connected") {

        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}

logoutF() {
  this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
}

getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log(res);
      let user = {
        name:res.name,
        email: res.email,
        password: "fb",
        photo:res.picture.data.url,
        following:[],
        Spots:[]
      };
      console.log(res);
      this.usercnt.getInfo(res.name).then(data=>{
        console.log(data);}
      )
    this.usercnt.createUser(user);
    })
    .catch(e => {
      console.log(e);
    });
}

navigateToAnotherModule() {
console.log('Navigating to another module');
}
navigateToSamzeModule() {
console.log('navigating within same module');
}
}
