import { BaseEntity } from './../../shared';

export class BidChangeRequestHistory implements BaseEntity {
    constructor(
        public id?: number,
        public comment?: string,
        public createdDate?: any,
    ) {
    }
}
