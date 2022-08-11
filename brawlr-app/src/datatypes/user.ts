export interface IUser {
    name: string;
    id: number;
    pic: string;
    bio?: string;
    dicipline?: string;
    fight: boolean;
  }

  export class User implements IUser {
    name: string;
    id: number;
    pic: string;
    bio?: string;
    dicipline?: string;
    fight: boolean;

    constructor(obj: IUser) {
      Object.assign(this, obj);
    }
  }

