import { User } from "./User";

export interface BlogObj{
    blogId: number,
      title: string,
      content: string,
      image: string,
      createdDate: string,
      lastModifiedDate: string,
      user: User,
      product: [],

}