import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdiomaPageRoutingModule } from './idioma-routing.module';

import { IdiomaPage } from './idioma.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdiomaPageRoutingModule,
    TranslateModule
  ],
  declarations: [IdiomaPage]
})
export class IdiomaPageModule {}
