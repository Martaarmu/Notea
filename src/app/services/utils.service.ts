import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public miLoading:HTMLIonLoadingElement;

  constructor(private loading: LoadingController,
    private toast:ToastController) { }

  async presentLoading(){
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
}
