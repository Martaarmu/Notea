import { Component, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { IonToggle } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('mitoogle',{static:false}) mitoogle:IonToggle;
  public image:any; 

  constructor(private traductor:TranslateService, private storage:LocalStorageService) {
   /* traductor.setDefaultLang("en");
    traductor.use("en");
    traductor.get("HELLO").toPromise().then(data=>{
      console.log(data);
    })*/
  }
  async ionViewDidEnter(){
    const lang=this.traductor.getDefaultLang();
    if(lang=='es'){
      this.mitoogle.checked=false;
    }else{
      this.mitoogle.checked=true;
    }
  }
  public async cambiaIdioma(event){
    console.log(event)
    if(event && event.detail && event.detail.checked){
      await this.storage.setItem('lang',{lang:'en'})
      this.traductor.use('en');
    }else{
      await this.storage.setItem('lang',{lang:'es'})
      this.traductor.use('es');
    }
  }
  public async hazFoto(){
    let opcions:ImageOptions={
       resultType:CameraResultType.Uri,
       allowEditing:false,
       quality:90,
       source:CameraSource.Camera
    }
    let result:Photo = await Camera.getPhoto(opcions);
    this.image=result.webPath;
  }

}
