import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { NoteService } from 'src/app/services/note.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  @Input() nota: Note;

  public formNote: FormGroup;

  constructor(public modalController: ModalController,
    public ns: NoteService,
    private fb: FormBuilder,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.formNote = this.fb.group({
      title: ["", Validators.required],
      description: [""]
    });
  }

  public cerrar() {
    this.modalController.dismiss();
  }

  public async escuchar(){
    
      await TextToSpeech.speak({
        text: this.nota.description,
        lang: 'es-ES',
        rate: 1.0,
        
      });
}

  public async editNote() {

    let newNote: Note = {
      key: this.nota.key,
      title: this.formNote.get("title").value,
      description: this.formNote.get("description").value
    }

    try {

      await this.ns.editNote(newNote);
      await this.utils.presentToast("Nota agregada correctamente", "success");
      await this.ns.getNotes();
      this.formNote.reset();
      this.cerrar();

    } catch (err) {
      console.log(err);
      await this.utils.presentToast("Error al agregar nota", "failed")

    }

  }

}
