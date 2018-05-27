
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable()
export class User {
  sucessT: any;
  token: any;
  constructor(public http: HttpClient,public ltoken:Storage) {
    console.log('Hello UserProvider Provider');

  }


  async createUser(user) {
    return new Promise((resolve, reject) => {
      this.http.post("https://boiling-journey-97761.herokuapp.com/api/signup", user)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });


  }
  public async logIn(user) {

    return await new Promise((resolve, reject) => {
      this.http.post("https://boiling-journey-97761.herokuapp.com/api/signin", user)
        
      .subscribe(res => {
          
          resolve(res);
           
        }, (err) => {
          reject(err);
        });

    });
    

  }

getInfo(name){
  console.log(name); 
  return new Promise((resolve, reject) => {
  this.http.post("https://boiling-journey-97761.herokuapp.com/api/info",name)
  .subscribe(res=>{
    
    resolve(res);
    
    
  });
});
}
follow(request){
  console.log(request); 
  return new Promise((resolve, reject) => {
  this.http.post("https://boiling-journey-97761.herokuapp.com/api/follow",request)
  .subscribe(res=>{
    console.log(res);

  resolve(res);})
  });
}
search(input){
  return new Promise((resolve, reject) => {
    this.http.post("https://boiling-journey-97761.herokuapp.com/api/search",input)
    .subscribe(res=>{
      console.log(res);
  
    resolve(res);})
    })
}
getConversationID(req){
return new Promise((resolve, reject) => {
  this.http.post("https://boiling-journey-97761.herokuapp.com/api/follow_id",req)
  .subscribe(res=>{
    console.log(res);

  resolve(res);})
  })

}
getAllUsers(){
  return new Promise((resolve,reject)=>{
    this.http.get('https://boiling-journey-97761.herokuapp.com/api/allUsers')
    .subscribe(res=>{
      resolve(res);
    });
  })
}


}
