import { BaseEntity } from './../../shared';
import { File } from '../../entities/file';
import { Bid, Owner } from '../../screens/bid/bid.model';

export class ChangeRequestBid implements BaseEntity {
    constructor(
        public id?: number,
        public comment?: string,
        public owner?: Owner,
        public proposal?: File,
        public createdDate?: Date,
        public bid?: Bid
    ) {
    }
}
