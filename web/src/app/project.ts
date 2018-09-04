export class Project {
  constructor(
    public title: string,
    public description: string,
    public wrc?: number,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}
