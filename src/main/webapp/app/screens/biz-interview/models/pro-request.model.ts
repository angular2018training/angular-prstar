import { BaseEntity } from './../../../shared';

export class ProRequest implements BaseEntity {
  constructor(
    public id?: number,
    public createdDate?: any,
    public numberOfPros?: number
  ) {}
}
