import { BaseEntity } from './../../shared';

export class Role implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public pros?: BaseEntity[],
        public lowRate?: number,
        public highRate?: number
    ) {
    }
}
