import { PButton } from "./pbutton";
import { Comment } from "./comment";
import { Bookmark } from "./bookmark";

export class Project {
  constructor(
    public title: string,
    public description: string,
    public pbuttons: PButton[],
    public comments: Comment[],
    public bookmarks: Bookmark[],
    public id?: number,
    public wrc?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,

  ) { }
}
