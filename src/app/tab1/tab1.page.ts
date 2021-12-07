import { Component, Pipe, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite:IonInfiniteScroll;

  public notas: Note[] = [];
  public miLoading: HTMLIonLoadingElement;
  

  constructor(private ns: NoteService, private loading: LoadingController, private toast: ToastController,
    public alertController: AlertController,
    private authS:AuthService,
    private router:Router) { }

    async ionViewDidEnter() {
      await this.cargaNotas();
    }

  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: 'Por favor espere...',
    });
    await this.miLoading.present();
  }

  async presentToast(msg: string, clr: string) {
    const miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: clr
    })
    miToast.present();
  }

  public async cargaNotas(event?){
    if(this.infinite){
      this.infinite.disabled=false;
    }
    if(!event){
      await this.presentLoading();
    }
    this.notas=[];
    try{
      this.notas=await this.ns.getNotesByPage('algo').toPromise();
    }catch(err){
      console.error(err);
      await this.presentToast("Error cargando datos","danger");
    } finally{
      if(event){
        event.target.complete();
      }else{
        await this.miLoading.dismiss();
      }
    }
  }
  public async logout(){
    await this.authS.logout();
    this.router.navigate(['']);
  }
  
   public async cargaInfinita($event){
    console.log("CARGAND");
    let nuevasNotas=await this.ns.getNotesByPage().toPromise();
    if(nuevasNotas.length<10){
      $event.target.disabled=true;
    }
    this.notas=this.notas.concat(nuevasNotas);
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

            await this.presentLoading();
            await this.ns.remove(nota.key);
            //Para recargar la lista hacer esto es muy cutre!! -> await this.cargaNotas
            let i = this.notas.indexOf(nota, 0);
            if (i > -1) {
              this.notas.splice(i, 1);
            }
            await this.miLoading.dismiss();

          }
        }
      ]
    });

    await alert.present();
  }

  




  public async edita(nota: Note) { }



}


