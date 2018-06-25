import { BaseEntity } from './../../shared';

export class DelegationType implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public priority?: number,
        public name?: string,
    ) {
    }
}
