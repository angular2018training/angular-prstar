import { Role } from './../role/role.model';

export class DropDownItem {

    constructor(
      public id?: number,
      public itemName?: string,
      public value?: string
    ) {
    }
}
export class DropDownItemProRole {

  constructor(
    public id?: number,
    public itemName?: string,
    public proRoleId?: number,
    public lowRate?: number,
    public highRate?: number
  ) {
  }
}
