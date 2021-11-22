import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private ns:NoteService) {}
/*
  PARA AÑADIR NOTA CON THEN-CATCH:

  public test(){
    this.ns.addNote({
      title:'jaja',
      description:'jojo'
    }).then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })


    CON TRY-CATCH:
     
  try{
    let id = await this.ns.addNote({
      tittle: 'prueba',
      description: 'inserccion'
    })
    console.log(id)
  }catch{
    console.log(error)
  }
  
*/

public async test(){
  this.ns.getNotes().subscribe((data)=>{
    console.log(data);
  })
  
  try {
    let result = await this.ns.getNotes().toPromise();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
/** 
  this.ns.getNotes().toPromise().then((result)=>{
    console.log(result);
  }).catch(err=>{
    console.log(err);
  })*/

}
    
  }


