import { Injectable } from '@angular/core';
import {
  addDoc, collection, Firestore, CollectionReference,
  doc, DocumentReference,
  query, getDoc, getDocs, orderBy, onSnapshot
} from '@angular/fire/firestore';
import { Message } from 'src/datatypes/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private authService: AuthService, private fireStore: Firestore) {
  }

  async sendMessage(channel: string, message: string): Promise<void> {
    const newMessage = {
      content: message,
      user: this.authService.getUserUID(),
      displayName: this.authService.getDisplayName(),
      profile: this.authService.getProfilePic(),
      date: Date.now()
    };
    await addDoc<Message>(
      this.getCollectionRef<Message>(channel),
      newMessage
    );
  }

  async retrieveMessagesAsSnapshot(channel: string): Promise<Message[]> {
    const results = await getDocs<Message>(
      query<Message>(
        this.getCollectionRef(channel),
        orderBy('date')
      )
    );
    return results
      .docs
      .map(d => ({...d.data(), key: d.id}));
  }

  async retrieveMessageAsSnapshot(channel, id): Promise<Message> {
    const result = await getDoc<Message>(
      this.getDocumentRef(channel, id)
    );
    return {
      ...result.data(),
      key: result.id
    };
  }

  async retrieveMessagesInRealTime(channel: string, observer: ((messages: Message[]) => void)): Promise<void> {
    const resultToMessageTransform = x => observer(x.docs.map(d => ({...d.data(), key: d.id})));

    onSnapshot<Message>(
      query<Message>(
        this.getCollectionRef(channel),
        orderBy('date')
      ),
      resultToMessageTransform
    );
  }

  async retrieveMessageInRealTime(channel: string, id: string, observer: ((messages: Message) => void)): Promise<void> {
    const resultToMessageTransform = x => observer({...x.data(), key: x.id});

    onSnapshot<Message>(
      this.getDocumentRef(channel, id),
      resultToMessageTransform
    );
  }

  private getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }

  private getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.fireStore, `${collectionName}/${id}`) as DocumentReference<T>;
  }
}
