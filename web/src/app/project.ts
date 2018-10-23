import { PButton } from "./pbutton";

export class Project {
  constructor(
    public title: string,
    public description: string,
    public children: PButton[],
    public id?: number,
    public wrc?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,

  ) { }
}
