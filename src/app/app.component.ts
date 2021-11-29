import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private langsAvailable=['es','en'];

  constructor(private traductor:TranslateService, private storage:LocalStorageService) {
    

    //Esto se hace porque en el constructor no se puede await
    (async ()=>{
     let lang = await storage.getItem("lang");
     if(lang == null){
       lang=this.traductor.getBrowserLang();
     }else{
       lang=lang.lang;
     }
     if(this.langsAvailable.indexOf(lang)>-1){
       traductor.setDefaultLang(lang);
     }else{
       traductor.setDefaultLang('en');
     }
    })();

    //Detectar el lenguaje del navegador
    const lang=this.traductor.getBrowserLang();
    if (this.langsAvailable.indexOf(lang)>-1) {
      traductor.setDefaultLang(lang);
    } else {
      traductor.setDefaultLang('en');
    }
  }
}
