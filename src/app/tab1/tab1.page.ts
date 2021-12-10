import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';
//
import { ModalController } from '@ionic/angular';
import { EditNotePage } from '../pages/edit-note/edit-note.page';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  public notas: Note[] = [];

  constructor(private ns: NoteService,
    private utils: UtilsService,
    public alertController: AlertController,
    private authS: AuthService,
    private router: Router,
    public modalController: ModalController) { }

  async ionViewDidEnter() {
    await this.cargaNotas();
  }

  public async cargaNotas(event?) {
    if (this.infinite) {
      this.infinite.disabled = false;
    }
    if (!event) {
      await this.utils.presentLoading();
    }
    this.notas = [];
    try {
      this.notas = await this.ns.getNotesByPage('algo').toPromise();
    } catch (err) {
      console.error(err);
      await this.utils.presentToast("Error cargando datos", "danger");
    } finally {
      if (event) {
        event.target.complete();
      } else {
        await this.utils.miLoading.dismiss();
      }
    }
  }
  public async logout() {
    await this.authS.logout();
    this.router.navigate(['']);
  }

  public async cargaInfinita($event) {
    console.log("CARGAND");
    let nuevasNotas = await this.ns.getNotesByPage().toPromise();
    if (nuevasNotas.length < 10) {
      $event.target.disabled = true;
    }
    this.notas = this.notas.concat(nuevasNotas);
    $event.target.complete();
  }





  public async borra(nota: Note) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: '<strong>Estas seguro de que quieres eliminar</strong>',
      buttons: [
        {
          text: 'CANCELAR',

          handler: (blah) => {
            //responde cancel no hacemos nada 
          }
        }, {
          text: 'ELIMINAR',
          handler: async () => {
            // okey -> borramos de la bd

            await this.utils.presentLoading();
            await this.ns.remove(nota.key);
            //Para recargar la lista hacer esto es muy cutre!! -> await this.cargaNotas
            let i = this.notas.indexOf(nota, 0);
            if (i > -1) {
              this.notas.splice(i, 1);
            }
            await this.utils.miLoading.dismiss();

          }
        }
      ]
    });

    await alert.present();
  }






  public async edita(nota: Note) {

    const modal = await this.modalController.create({
      component: EditNotePage,
      cssClass: 'my-custom-class',
      componentProps: { nota }
    });
    await modal.present();
    await modal.onDidDismiss();
    await this.cargaNotas();
  }


  public async buscar($event) {

    let notes: Note[] = []
    const filtro: string = $event.detail.value;
    if (filtro.length > 1) {

      for (let note of this.notas) {
        if (note.title.includes(filtro)) {
          notes.push(note);
        }
      };
      this.notas = notes;
    } else if (filtro.length == 0) {
      await this.cargaNotas();

    }
  }








}
