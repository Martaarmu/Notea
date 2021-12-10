import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  	
  public formNote:FormGroup;
 

  constructor(private fb:FormBuilder, 
    private noteS:NoteService,
    private utils:UtilsService) {
      
    this.formNote=this.fb.group({
      title:["",Validators.required],
      description:[""]
    });
    
  }

  ionViewDidEnter(){}

  public async addNote(){
    let newNote:Note={
      title:this.formNote.get("title").value,
      description:this.formNote.get("description").value
    }
    await this.utils.presentLoading();
    try {
      let id=await this.noteS.addNote(newNote);

    //Si el primero es nulo, no se ejecuta lo segundo (sin usar if y else)
    this.utils.miLoading && this.utils.miLoading.dismiss();
    await this.utils.presentToast("Nota agregada correctamente", "success");
    this.formNote.reset();
    
    } catch (err) {
      console.log(err);
      this.utils.miLoading && this.utils.miLoading.dismiss();
      await this.utils.presentToast("Error al agregar nota","failed")
      
    }
    
  }

}
