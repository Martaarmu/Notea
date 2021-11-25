import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private langsAvailable=['es','en'];
  constructor(private traductor:TranslateService) {
    const lang=window.navigator.language.split("-")[0];
    if (this.langsAvailable.indexOf(lang)>-1) {
      traductor.setDefaultLang(lang);
    } else {
      traductor.setDefaultLang('en');
    }
  }
}
