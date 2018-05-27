import { User } from './../../providers/user/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http/';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  user: string = '';
  receiver:any;
  message:any;
  _chatSubscription;
  _id;
  messages: object[] = [];
  conv;
  constructor(private http: HttpClient, public userCont:User,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    this.receiver=this.navParams.get('receiver')
    console.log('sender:')
    console.log(this.user)
    console.log('receiver')
    console.log(this.receiver)
    let req={
      name1:this.user,
      name2:this.receiver
    }
    this.userCont.getConversationID(req).then(data=>{
  console.log(data);
  this._id =data ;
  this.getMessages()
  });
  
    
    
    
    }
      
  getMessages(){
    this._chatSubscription = this.db.list('/chat/'+this._id).valueChanges().subscribe( data => {
      this.messages = data;
      console.log(this.messages)
      })
     
  }

  

  sendMessage() {
    let m={
      Sender: this.user,
      
      message: this.message
    }
    this.db.list('/chat/'+this._id).push(m).then( () => {
      // message is sent
      this.sendNotification();
    })
    this.message = '';
  }


  //notif
  sendNotification() 
{  
let body = {
    "notification":{
      "title":"New message",
      "body":"Notification Body",
      "sound":"default",
      "click_action":"FCM_PLUGIN_ACTIVITY",
      "icon":"fcm_push_icon"
    },
    "data":{
      "param1":"value1",
      "param2":"value2"
    },
      "to":"/topics/msg/"+this.receiver,
      "priority":"high",
      "restricted_package_name":"io.ionic.spotbook"
  }
  let options = new HttpHeaders().set('Content-Type','application/json');
  this.http.post("https://fcm.googleapis.com/fcm/send",body,{
    headers: options.set('Authorization', 'key=AAAA81MZ59I:APA91bHSVlumehbFkVMaQBjDaoKRNwsvtxwKSiE5hre7LS1cwsvEpu1VQFwC1_9OJ5gDJbUghwwuB00uRACNFv_uRtLCK9ElwyhDgUEL2V5ypXt--dyDqxnm1U7mHQUW8xYPsbbGaepR'),
  })
    .subscribe();
}

  ionViewDidLoad() {
   
  }

  ionViewWillLeave(){
    this._chatSubscription.unsubscribe();
    this.messages=[];
  }

}
