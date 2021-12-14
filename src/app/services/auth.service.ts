import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform } from '@ionic/angular';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:any;
  private isAndroid=false;

  constructor(private storage:LocalStorageService,
    private platform:Platform,
    private authfirebase:AngularFireAuth) {
      this.isAndroid = platform.is("android");
      this.loadSession();
      if(!this.isAndroid)
      GoogleAuth.init(); //lee la config clientid dem meta de index.html
     }

    public async loadSession(){
      let user= await this.storage.getItem('user');
      if(user){
        user=JSON.parse(user);
        this.user=user;
      }
    }
    public async login(){
      let user:User = await GoogleAuth.signIn();
      this.user=user;
      await this.keepSession();
    }
    public async logout(){
      await GoogleAuth.signOut();
      await this.storage.removeItem('user');
      this.user=null;
    }
    public async keepSession(){
      await this.storage.setItem('user',JSON.stringify(this.user));
    }
    public isLogged():boolean{
      if(this.user) return true; else return false;
    }
    public registerUser (userdata: {email:any; password:any}):Promise<Boolean>{
      return new Promise(async (resolve, reject)=>{
        return this.authfirebase.createUserWithEmailAndPassword(userdata.email, userdata.password).then(async user =>{
          if (user!=null && user.user != null){
            this.user = {
              displayName: user.user?.displayName,
              email: user.user?.email,
              photoURL: user.user?.photoURL,
              uid: user.user?.uid
            };
            await this.keepSession();
            resolve(true);
          }else{
            reject(false);
            this.user= null;
          }
        })
        .catch(
          error=>{
            console.error(error);
          }       
        );
      })
    }
    /**
     * Método que inicia sesión para los usuarios registrados mediante email
     * @param userdata 
     * @returns 
     */
    public loginEmailUser (userdata: {email:any; password:any}):Promise<Boolean>{
      return new Promise(async (resolve, reject)=>{
        return this.authfirebase.signInWithEmailAndPassword(userdata.email, userdata.password).then(async user =>{
          if (user!=null && user.user != null){
            this.user = {
              displayName: user.user?.displayName,
              email: user.user?.email,
              photoURL: user.user?.photoURL,
              uid: user.user?.uid
            };
            await this.keepSession();
            resolve(true);
          }else{
            reject(false);
            this.user= null;
          }
        })
        .catch(
          error=>{
            console.error(error);
          }       
        );
      })
    }
}
