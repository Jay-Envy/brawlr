export interface ICard{
  name: string;
  id: number;
  distance: number;
  picture: string;
  wannaFight?: boolean;
  bio?: string;
}

export class Card implements ICard{
  name: string;
  id: number;
  distance: number;
  picture: string;
  wannaFight?: boolean;
  bio?: string;

  constructor(obj: ICard){
      Object.assign(this, obj);
  }
}

