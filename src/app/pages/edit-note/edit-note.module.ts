import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNotePageRoutingModule } from './edit-note-routing.module';

import { EditNotePage } from './edit-note.page';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { Tab1PageModule } from 'src/app/tab1/tab1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNotePageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [EditNotePage]
})
export class EditNotePageModule {}
