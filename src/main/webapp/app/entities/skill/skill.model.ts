import { BaseEntity } from './../../shared';

export class Skill implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
