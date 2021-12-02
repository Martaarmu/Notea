import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userinfo:User;
  private isAndroid:boolean; //true no ejecuta

  constructor(private platform:Platform, private authS:AuthService, private router:Router) {
    this.isAndroid = platform.is("android");
    if(!this.isAndroid){ //si no es android
      //esto es solo para web
      GoogleAuth.init(); //lee la config clientid del meta del index.html
    }
    
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      this.router.navigate(['private/tabs/tab1']);
    }
  }

  public async singin(){
    try {
      let user:User = await GoogleAuth.signIn();
      this.userinfo=user;
      this.authS.user=user;
      this.router.navigate(['private/tabs/tab1']);
    } catch (err) {
      console.log(err);
    }
    
  }

}
