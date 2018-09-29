export class PButton {
  constructor(
    public project: number,
    public description: string,
    public filename: string,
    public wrc?: number,
    public _id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}
