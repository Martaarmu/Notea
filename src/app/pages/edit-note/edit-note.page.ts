import { Component, Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { NoteService } from 'src/app/services/note.service';
import { Tab1PageModule } from 'src/app/tab1/tab1.module';
import { Tab1Page } from 'src/app/tab1/tab1.page';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  
  @Input() nota:Note;
 
  public formNote:FormGroup;
  public miLoading:HTMLIonLoadingElement;
  public miToast:HTMLIonToastElement;
  
  constructor(public modalController:ModalController, public ns:NoteService,
    private fb:FormBuilder, 
    private loading:LoadingController,
    private toast:ToastController,
   ) { }

     

  ngOnInit() {
    
     
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
    this.miToast.present();
  }

   public cerrar(){
    this.modalController.dismiss();

  }

  public async editNote(){
    
    let newNote:Note={
      key: this.nota.key,
      title:this.formNote.get("title").value,
      description:this.formNote.get("description").value
    }
    //await this.presentLoading();
    try {
      
      await this.ns.editNote(newNote);
     //Si el primero es nulo, no se ejecuta lo segundo (sin usar if y else)
      //this.miLoading && this.miLoading.dismiss();
    
      await this.presentToast("Nota agregada correctamente", "success");
      await this.ns.getNotes();
      this.formNote.reset();
      this.cerrar();
    
    
    } catch (err) {
      console.log(err);
     // this.miLoading && this.miLoading.dismiss();
      await this.presentToast("Error al agregar nota","failed")
      
    }
   // await this.miLoading.dismiss();
    
  }

}
