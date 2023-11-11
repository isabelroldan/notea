import { Injectable } from '@angular/core';
import { INote } from '../model/INote';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { LoginService } from './login.service';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<any>;

  private user = this.loginService.user;

  public notes: INote[] = [];


  constructor(private db: AngularFirestore, private loginService: LoginService) {
    this.notesRef = db.collection(this.dbPath);

    this.notesRef.ref.where('userId', '==', this.user.id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const noteData = doc.data();
        const note: INote = {
          id: doc.id,
          title: noteData.title,
          description: noteData.description,
          userId: noteData.userId
        };
        this.notes.push(note);
      })
    })
  }


  public async createNote(newNote: INote) {
    /**
     * Conectar firebase
     */
    try {
      let { id, ...newNoteWithoutID } = newNote;
      if (this.user) {
        newNoteWithoutID.userId = this.user.id;
        let dRef: DocumentReference<any> = await this.notesRef.add({ ...newNoteWithoutID });
        newNote.id = dRef.id;
        this.notes.push(newNote);
      }

    } catch (err) {
      console.error(err);
    }

  }


  public createNoteWithKey(key: string, newNote: INote) {
    return this.notesRef.doc(key).set(newNote, { merge: true });
  }


  public removeNote(id: any): Promise<void> {
    let newNotes = this.notes.filter((n) => {
      return n.id != id;
    });
    this.notes = newNotes;
    return this.notesRef.doc(id).delete();
  }

  public getNotes(): INote[] {
    return this.notes;
  }

  public updateNote(note: INote): Promise<void> {
    let idtobeupdated: any;
    let data: any;
    this.notes.forEach(n => {
      if (n.id == note.id) {
        n.title = note.title;
        n.description = note.description;
        let { id, ...newData } = note;
        idtobeupdated = id;
        data = newData;
      }
    });
    if (idtobeupdated) {
      return this.notesRef.doc(idtobeupdated as string).update(data);
    } else {
      return Promise.resolve();
    }
  }


  create(note: any): any {
    return this.notesRef.add({ ...note });
  }
  createWithID(id: string, data: any): Promise<void> {
    return this.notesRef.doc(id).set(data, { merge: true }); //merge -> create if not exists, update if exists
  }

  update(id: string, data: any): Promise<void> {
    return this.notesRef.doc(id).update(data);
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.notesRef;
  }
  /*.get().subscribe(d=>{
 -   this.users = docs.map(d=>{
 -   return {id:d.id,...d.data()};
 -   });
 -   }) */

  getById(id: string) {
    return this.notesRef.doc(id);
  }
  //get(), and get by field


  delete(id: string): Promise<void> {
    return this.notesRef.doc(id).delete();
  }

  /*const q = this.notesRef.ref.where("title","==","Hello").get()
 - .then((querySnapshot)=>{
 - querySnapshot.forEach((doc) => {
 - // doc.data() is never undefined for query doc snapshots
 - console.log(doc.id, " => ", doc.data());
 - });
 - }).catch((error) => {
 - console.log("Error getting documents: ", error);
 - });*/

}