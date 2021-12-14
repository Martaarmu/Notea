import { Component, OnInit, ViewChild } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.page.html',
  styleUrls: ['./idioma.page.scss'],
})
export class IdiomaPage implements OnInit {

  @ViewChild('mitoogle',{static:false}) mitoogle:IonToggle;
  constructor(private traductor:TranslateService, private storage:LocalStorageService) { }

  ngOnInit() {
  }

  /**Detecta el idioma del dispositivo*/
  async ionViewDidEnter(){
    const lang=this.traductor.getDefaultLang();
    if(lang=='es'){
      this.mitoogle.checked=false;
    }else{
      this.mitoogle.checked=true;
    }
  }
  
  /**
   * Cambia de idioma la app
   * @param event 
   */
  public async cambiaIdioma(event){
    if(event && event.detail && event.detail.checked){
      await this.storage.setItem('lang',{lang:'en'})
      this.traductor.use('en');
    }else{
      await this.storage.setItem('lang',{lang:'es'})
      this.traductor.use('es');
    }
  }
}
