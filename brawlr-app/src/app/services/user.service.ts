import { Injectable } from '@angular/core';
import { User } from 'src/datatypes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: User[] = [];
  private userChatList: User[] = [];
  private id = 0;

  constructor() { }

  populateBrawlUserList(){
    for (let i = 0; i < 50; i++) {
      this.userList.push(new User({
          pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
          name: 'user ' + i,
          dicipline: 'dicipline',
          id: this.id,
          bio: 'bio',
          fight: true
        }));
      this.id++;
    }
  }

  // populateChatUserList(){
  //   for (let i = 0; i < 50; i++) {
  //     this.userChatList.push(new User({
  //         pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
  //         name: 'user ' + i,
  //         dicipline: 'dicipline',
  //         id: this.id,
  //         bio: 'bio',
  //         fight: true
  //       }));
  //     this.id++;
  //   }
  // }

  getAllUsers(): User[] {
    return this.userList;
  }

  getAllUserChats(): User[] {
    return this.userChatList;
  }

  removeUserFromChats(id: number): void {
    this.userChatList = this.userChatList.filter(u => u.id !== id);
  }

  removeUserFromBrawl(id: number): void {
    this.userList = this.userList.filter(u => u.id !== id);
  }

  checkIfUserWantsToFight(id: number): void{
    const indexOfFighter = this.userList.findIndex(f => f.id === id);

    if(this.userList[indexOfFighter].fight === true){
      this.userChatList.push(this.userList[indexOfFighter]);
      this.userList.splice(indexOfFighter, 1);
    }
  }

  getBrawlUser(id: number): User | undefined {
    return this.userList.find(u => u.id === id);
  }

  getChatUser(id: number): User | undefined {
    return this.userChatList.find(u => u.id === id);
  }
}
