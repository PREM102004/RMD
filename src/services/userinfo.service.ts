import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  // getComplaints(): Observable<any[]> {
  //   const colRef = collection(this.firestore, 'userInfo'); // Reference to collection
  //   return collectionData(colRef, { idField: 'id' }) as Observable<any[]>; // Fetch Data
  // }
  async getComplaints(): Promise<any[]> {
    try {
      const colRef = collection(this.firestore, 'userInfo'); // Ensure correct Firestore collection name
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Fix return type
    } catch (error) {
      console.error("Error fetching complaints:", error);
      return [];
    }
  }
  async deleteComplaint(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'userInfo', id);
    await deleteDoc(docRef);
  }
  async getadmindata(): Promise<any[]> {
    const colRef = collection(this.firestore, 'admindata'); // Reference to Firestore collection
    const snapshot = await getDocs(colRef);

    return snapshot.docs.map(doc => doc.data());
  }
  async getComplaintById(referenceId: string): Promise<any> {
    if (!referenceId.trim()) {
      throw new Error('Please enter a valid Reference ID.');
    }

    try {
      const docRef = doc(this.firestore, 'userInfo', referenceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); // Return complaint data
      } else {
        throw new Error('No complaint found for this Reference ID.');
      }
    } catch (error) {
      console.error('Error fetching complaint data:', error);
      throw new Error('Error fetching data. Please try again later.');
    }
  }
}

