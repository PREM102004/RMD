import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private firestore: Firestore) { }

  addUsers(collectionName: string, data: any) {
    const colRef = collection(this.firestore, collectionName);
    return addDoc(colRef, data).then((docRef) => {
      const docUpdateRef = doc(this.firestore, collectionName, docRef.id);
      return updateDoc(docUpdateRef, { id: docRef.id }).then(() => {
        return { id: docRef.id };
      });
    })
  }
}
