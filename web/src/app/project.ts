import { PButton } from "./pbutton";
import { Comment } from "./comment";

export class Project {
  constructor(
    public title: string,
    public description: string,
    public pbuttons: PButton[],
    public comments: PButton[],
    public id?: number,
    public wrc?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,

  ) { }
}
