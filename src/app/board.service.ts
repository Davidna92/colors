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
        data.id = a.payload.doc['id'];
        return data;
      })
    }))
  }

  updateColor(square: Square) {
    let newColor = this.getRandomColor();
    console.log(square);
    this.squareDocument = this.afs.doc(`squares/${square.id}`);
    this.squareDocument.update({ color: newColor });
  }

  getSquares() {
    return this.squares;
  }

  getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
