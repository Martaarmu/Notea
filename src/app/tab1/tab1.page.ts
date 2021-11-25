import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public notas: Note[] = [];
  public miLoading:HTMLIonLoadingElement;

  constructor(private ns: NoteService, private loading:LoadingController, private toast:ToastController) { }

  async presentLoading() {
    this.miLoading = await this.loading.create({ 
      message: 'Por favor espere...',
    });
    await this.miLoading.present();
  }

  async presentToast(msg:string, clr:string){
    const miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: clr
    })
    miToast.present();
  }


  async ionViewDidEnter() {
    await this.cargaNotas();
  }





  public async cargaNotas(event?) {
    //mostrar loading
    this.notas = [];
    if (!event) {
      await this.presentLoading();
    }
    try {
      this.notas = await this.ns.getNotes().toPromise();
      
    } catch (err) {
      console.log(err);
      this.presentToast("Error cargando datos","danger");
      //notificar el error al usuario
    } finally {
      //ocultar loading


      //para que el resfresh se suba
      if (event) {
        event.target.complete();
      }else{
        await this.miLoading.dismiss();
      }
    }
  }

  public async borra(nota:Note){
    //////PEDIR CONFIMACION!!(MODAL)
    await this.presentLoading();
    await this.ns.remove(nota.key);
    //Para recargar la lista hacer esto es muy cutre!! -> await this.cargaNotas
    let i = this.notas.indexOf(nota,0);
    if (i>-1) {
      this.notas.splice(i,1);
    }
    await this.miLoading.dismiss();
  }

  public async edita(nota:Note){}



}


