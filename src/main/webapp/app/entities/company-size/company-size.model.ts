import { BaseEntity } from './../../shared';

export class CompanySize implements BaseEntity {
    constructor(
        public id?: number,
        public sizeValue?: string,
    ) {
    }
}
