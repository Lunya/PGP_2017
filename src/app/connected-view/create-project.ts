export class CreateProject {
    constructor(
      public nom: string,
      public description: string,
      public URLgit: string,
      public datedebut: number,
      public datefin: number
    ) {  }
}
