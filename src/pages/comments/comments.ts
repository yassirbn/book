import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  comments;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.comments=this.navParams.get('comments');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

}
