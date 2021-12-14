import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public userdata:any;
  public loginForm: FormGroup;

  constructor(private platform:Platform,
    private authS:AuthService,
    private router:Router,
    private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      'email': ['',[Validators.email, Validators.required]],
      'password': ['',[Validators.required]]
    });
    
   }

  ngOnInit() {
    if(this.authS.isLogged()){
      this.router.navigate(['private/tabs/tab1']);
    }
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      this.router.navigate(['private/tabs/tab1']);
    }
  }

  public async singin(){
    try {
      await this.authS.login();
      this.router.navigate(['private/tabs/tab1']);
    } catch (err) {
      console.log(err);
    }
    
  }
  onSubmit(){
    this.userdata=this.saveUserdata();
    this.authS.loginEmailUser(this.userdata).then(data=>{
      if(data){
        this.router.navigate(['private/tabs/tab1']);
      }
    }).catch(error =>{
      console.log(error);
    }   
    );
  }

  public saveUserdata(){
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

}
