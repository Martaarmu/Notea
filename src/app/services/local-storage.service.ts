import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { } //Los plugins de capacitor no hace falta meterlos en el constructor

  /**
   * 
   * @param key 
   * @param value object
   * @returns 
   */

  public async setItem (key:string, value:any):Promise<boolean>{
    let result:boolean=false;
    try {
     await Storage.set({
        key:key,
        value:JSON.stringify(value) //convierte el valor del key (objeto -> string)
      })
    } catch (err) {
      console.log(err);
    }
    return Promise.resolve(result);
  }

  public async getItem (key:string):Promise<any>{
    let value = null;
    try {
      value=await Storage.get({key:key})
      value=value.value;
      if(value!=null){
        value=JSON.parse(value); //convierte el valor del key(string -> objeto)
      }
      
    } catch (err) {
       console.log(err);
    }
    return Promise.resolve(value);
  }

  public async removeItem (key:string):Promise<boolean>{
    let result=false;
    try {
      await Storage.remove({key:key});
      result=true;
    } catch (err) {
      console.log(err);
    }
    return Promise.resolve(result);
  }
}
