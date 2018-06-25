import { BaseEntity } from './../../shared';

export class TitlePrefix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
