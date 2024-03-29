import {Injectable, OnDestroy} from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  addDoc,
  collectionData,
  orderBy,
  where,
  query, deleteDoc, updateDoc, docData, limit
} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {DCA, DCAC} from '../../datatypes/DCA';
import {Observable} from 'rxjs';
import {Favorites} from '../../datatypes/favorites';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy{

  constructor(private authService: AuthService, private fireStore: Firestore) { }

  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }

  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.fireStore, `${collectionName}/${id}`) as DocumentReference<T>;
  }

  async addDCATrade(pairName: string, startingLevel: number, targetDCAPercentage: number, numberOfDCALevels: number,
               initialOrderSize: number, targetQuantityPercentage: number, dCALevels: number[], orderSizes: number[],
               buyingLevels: number[]): Promise<void>{
    const newDCA = {
      pairName,
      startingLevel,
      targetDCAPercentage,
      numberOfDCALevels,
      initialOrderSize,
      targetQuantityPercentage,
      dCALevels,
      orderSizes,
      buyingLevels,
      user: this.authService.getUserUID(),
    };
    await addDoc<DCAC>(
      this.#getCollectionRef<DCAC>('dca'),
      newDCA
    );
  }

  retrieveDCATrades(): Observable<DCAC[]>{
    return collectionData<DCAC>(
      query<DCAC>(
        this.#getCollectionRef('dca'),
        where('user', '==', this.authService.getUserUID())
      ),
      {idField: 'id'}
    );
  }

  retrieveOneTrade(id: string): Observable<DCAC>{
    return docData<DCAC>(
      this.#getDocumentRef('dca', id),
      {idField: 'id'}
    );
  }

  async deleteDCATrade(id: string): Promise<void>{
    await deleteDoc(this.#getDocumentRef('dca', id));
  }

  async updateDCATrade(id: string, dcaTrade: DCAC){
    delete dcaTrade.id;
    await updateDoc(this.#getDocumentRef('dca', id), dcaTrade);
  }


  async makeFavorites(favorites: Favorites): Promise<void>{
    await addDoc<Favorites>(
      this.#getCollectionRef<any>('favorites'),
      favorites
    );
  }


  retrieveFavorites(): Observable<Favorites>{
    return collectionData<Favorites>(
      query<Favorites>(
        this.#getCollectionRef('favorites'),
        where('userId', '==', this.authService.getUserUID()),
        limit(1)
      ),
      {idField: 'id'}
    ).pipe(
      map(x => x[0])
    );

  }

  async updateFavorites(id: string, favorites: Favorites){
    delete favorites.id;
    await updateDoc(this.#getDocumentRef('favorites', id), favorites);
  }


  ngOnDestroy() {
  }
}
