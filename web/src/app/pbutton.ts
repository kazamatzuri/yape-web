export class PButton {
  constructor(
    public project: number,
    public description: string,
    public filename: string,
    public database: string,
    public wrc?: number,
    public _id?: number,
    public graphdir?: string,
    public ran_last?: Date,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}
