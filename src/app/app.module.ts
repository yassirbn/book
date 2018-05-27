import { MapPage } from './../pages/map/map';
import { ProfilePage } from './../pages/profile/profile';
import { MessagesPage } from './../pages/messages/messages';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { TendancePage } from './../pages/tendance/tendance';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { AddSpotPage } from './../pages/add-spot/add-spot';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPage, NavController } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {CreateAccountPage} from '../pages/create-account/create-account';
import {AcceuilPage} from '../pages/acceuil/acceuil';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { User } from '../providers/user/user';
import { HttpModule } from '@angular/http';
import { Http} from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Spot } from '../providers/spot/spot';
import { IonicImageViewerModule } from "ionic-img-viewer";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { PictureProvider } from '../providers/picture/picture';
import { CommentsPage } from '../pages/comments/comments';
import { FCM } from '@ionic-native/fcm';
import { EditPage } from '../pages/edit/edit';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    AcceuilPage,
    AddSpotPage,
    TendancePage,
    CommentsPage,
    MapPage,
    ProfilePage,
    MessagesPage ,
    EditPage
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateAccountPage,
    AcceuilPage,
    AddSpotPage,
    TendancePage,
    CommentsPage,
    MapPage,
    ProfilePage,
    MessagesPage,
    EditPage
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FCM,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,    
    Http,
    HttpModule,
    Spot ,
    Facebook,
   // FileUploadOptions,, 
    FileTransfer,     
    FileTransferObject,
    PictureProvider,
    Geolocation,
    NativeGeocoder,
 
    
      
  ]
})
export class AppModule {}
