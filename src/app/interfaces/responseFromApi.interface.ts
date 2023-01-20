import {UsersDataInterface} from "./usersDataInterface";

export interface ResponseFromApiInterface {
  meta: {
    size: number;
    limit: number;
    offset: number;
  };
  passes: UsersDataInterface[];
}
