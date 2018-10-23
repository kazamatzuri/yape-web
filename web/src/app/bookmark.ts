export class Bookmark {
  constructor(
    public columns: string,
    public pbutton: number,
    public xRange: string,
    public yRange: string,
    public project: number,
    public id?: number,
  ) { }
}
