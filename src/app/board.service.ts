import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Square } from './models/square';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  squareCollection: AngularFirestoreCollection<Square>;
  squares: Observable<Square[]>;
  squareDocument: AngularFirestoreDocument<Square>;

  constructor(public afs: AngularFirestore) {
    this.squares = this.afs.collection('squares').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Square;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getSquares() {
    return this.squares;
  }



}
