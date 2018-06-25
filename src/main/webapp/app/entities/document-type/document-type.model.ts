import { BaseEntity } from './../../shared';

export class DocumentType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
