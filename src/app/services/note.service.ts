import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  //1º conectarnos a la BD -> AngularFirestore

  private myCollection: AngularFirestoreCollection
  constructor(private db: AngularFirestore) {
    this.myCollection = db.collection<any>(environment.firebaseConfig.todoCollection);
  }

  public addNote(note: Note): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let response: DocumentReference<firebase.default.firestore.DocumentData> = await this.myCollection.add({title:note.title,
          description:note.description}); //no ponemos el add(note) para que no me meta el id 
        resolve(response.id);
      } catch (error) {
        reject(error);
      }
    })

  }

  public getNotes(): Observable<Note[]> {
    return new Observable((observer) => {
      let result: Note[] = [];
      this.myCollection.get().subscribe(
        (data: firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>) => {
          data.docs.forEach((d: firebase.default.firestore.DocumentData) => {
            let tmp = d.data(); //devuelve el bojeto almacenado -> la nota con title 
            let id = d.id;      //devuelve el key del objeto
            result.push({ 'key': id, ...tmp });
            //operador spread -> title:tmp.title, description:tmp.description
          })
          observer.next(result);
          observer.complete();
        })//final del suscribe

    })//final del return obserbable
  }//final del metodo getNotes


  public getNote(id: string):Promise<Note> {
    return new Promise(async(resolve,reject)=>{
      let note:Note=null;
      try {
        let result:firebase.default.firestore.DocumentData=await this.myCollection.doc(id).get().toPromise; //se podria usar un subcribe
        note = {
          id:result.id, ... result.data()
        }
        resolve(note);
      } catch (error) {
        reject(error)
      }
    
       
      })
    
  }






}


