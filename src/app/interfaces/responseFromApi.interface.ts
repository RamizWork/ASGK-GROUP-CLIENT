import {UsersCardsInterface} from "./usersCards.Interface";

export interface ResponseFromApiInterface {
  meta: {
    size: number;
    limit: number;
    offset: number;
  };
  passes: UsersCardsInterface[];
}
