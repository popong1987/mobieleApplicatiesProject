export interface Favorites {
  id?: string;
  userId: string;
  favorites: string[];
}

export class FavoritesC {
  id?: string;
  userId: string;
  favorites: string[];

  constructor(obj: Favorites) {
    Object.assign(this, obj);
  }
}
