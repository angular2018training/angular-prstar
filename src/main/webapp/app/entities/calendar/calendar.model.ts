import { BaseEntity } from './../../shared';

export class Calendar implements BaseEntity {
    constructor(
        public id?: number,
        public startTime?: any,
        public endTime?: any,
        public description?: string,
        public type?: number,
    ) {
    }
}
