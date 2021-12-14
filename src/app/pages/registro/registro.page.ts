import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public regForm: FormGroup;
  public userData: any;
  public userinfo: User;

  constructor(private authservice:AuthService, 
    private formBuilder:FormBuilder, 
    private router:Router) {
      this.regForm = this.formBuilder.group({
        'email': ['', [Validators.email, Validators.required]],
        'password': ['', [Validators.required]]
      });
     }

  ngOnInit() {
  }
  onSubmit(){
    this.userData = this.saveUserdata();
    this.authservice.registerUser(this.userData).then(data=>{
      if(data){
        this.router.navigate(['private/tabs/tab1']);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  public backLogin(){
    this.router.navigate([''])
  }
  public saveUserdata(){
    const saveUserdata = {
      email: this.regForm.get('email').value,
      password: this.regForm.get('password').value,
    };
    return saveUserdata;
  }



}
