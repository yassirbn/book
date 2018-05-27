import { Storage } from '@ionic/storage';

import { TendancePage } from './../tendance/tendance';
import { AcceuilPage } from './../acceuil/acceuil';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  user;
  tab1Root = AcceuilPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = TendancePage;
  constructor(public storageCont:Storage) {
    this.storageCont.get('connected').then(data=>{
      console.log(data);
      
      this.user=data;
    })
  }
  doRefresh(){
    this.storageCont.get('connected').then(data=>{
      console.log(data);
      
      this.user=data;
    })
  }
}
