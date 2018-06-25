import { BaseEntity } from './../../shared';

export class ChangeRequestBid implements BaseEntity {
    constructor(
        public id?: number,
        public comment?: string,
        public sentBy?: string,
        public proposal?: number,
        public date?: number
    ) {
    }
}
