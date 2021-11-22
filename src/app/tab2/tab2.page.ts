import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  	
  public formNote:FormGroup;
  public miLoading:HTMLIonLoadingElement;
  public miToast:HTMLIonToastElement;

  constructor(private fb:FormBuilder, private noteS:NoteService, private loading: LoadingController, 
    private toast:ToastController) {
      
    this.formNote=this.fb.group({
      title:["",Validators.required],
      description:[""]
    });
    

  }

  async presentLoading() {
    this.miLoading = await this.loading.create({ 
      message: 'Por favor espere...',
    });
    await this.miLoading.present();
  }

  async presentToast(msg:string, clr:string){
    this.miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: clr
    })
  }



  ionViewDidEnter(){
    
  }

  public async addNote(){
    let newNote:Note={
      title:this.formNote.get("title").value,
      description:this.formNote.get("description").value
    }
    await this.presentLoading();
    try {
      let id=await this.noteS.addNote(newNote);

    //Si el primero es nulo, no se ejecuta lo segundo (sin usar if y else)
    this.miLoading && this.miLoading.dismiss();
    await this.presentToast("Nota agregada correctamente", "success");
    this.formNote.reset();
    } catch (err) {
      console.log(err);
      this.miLoading && this.miLoading.dismiss();
      await this.presentToast("Error al agregar nota","failed")
      
    }
    
  }

}
