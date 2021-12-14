import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';
import { UtilsService } from '../services/utils.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public formNote: FormGroup;
  public isAndroid: boolean;

  constructor(private fb: FormBuilder,
    private noteS: NoteService,
    private utils: UtilsService,
    private platform: Platform) {

    this.isAndroid = platform.is("android");

    this.formNote = this.fb.group({
      title: ["", Validators.required],
      description: [""]
    });

  }

  ionViewDidEnter() { }

  /**
   * Añade notas a la BD haciendo uso de NoteService
   */
  public async addNote() {
    let newNote: Note = {
      title: this.formNote.get("title").value,
      description: this.formNote.get("description").value
    }

    await this.utils.presentLoading();
    try {
      let id = await this.noteS.addNote(newNote);

      //Si el primero es nulo, no se ejecuta lo segundo (sin usar if y else)
      this.utils.miLoading && this.utils.miLoading.dismiss();
      await this.utils.presentToast("Nota agregada correctamente", "success");
      this.formNote.reset();

    } catch (err) {
      console.log(err);
      this.utils.miLoading && this.utils.miLoading.dismiss();
      await this.utils.presentToast("Error al agregar nota", "failed")

    }

  }

  /**
   * Añade la descripción de la nota mediante reconocimiento de voz
   */
  public async grabar() {
    if (await SpeechRecognition.available()) {
      SpeechRecognition.start({
        language: "es-ES",
        maxResults: 2,
        prompt: "Di la descripción",
        partialResults: true,
        popup: false,
      }).then(async (data) => {
        let titulo = this.formNote.get("title").value;
        this.formNote.setValue({
          title: titulo,
          description: data.matches[0].slice(0)
        });

      }).catch(err => {
        console.error(err);
      })

    } else {
      //porque no tengas permisos
    }

  }



}
