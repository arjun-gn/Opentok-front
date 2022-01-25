import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  recordings: any;
  db: AngularFirestoreCollection<unknown>;

  constructor(private firestore: AngularFirestore) {
    this.db = firestore.collection('recordings');
    this.recordings = this.db.valueChanges();

  }
  getItems(){
    return this.recordings
  }

  create(recording: any): any {
    return this.db.add({ ...recording });
  }

  // update(id: string, data: any): Promise<void> {
  //   return this.tutorialsRef.doc(id).update(data);
  // }
}
// interface Recording {
//   id?: string;
//   name: string;
// }
