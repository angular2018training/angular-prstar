import { BaseEntity } from './../../shared';

export class Bid implements BaseEntity {
    constructor(
        public id?: number,
        public proposalContentType?: string,
        public proposal?: any,
        public proposedPrice?: number,
        public createdDate?: any,
        public postId?: number,
        public ownerId?: number,
    ) {
    }
}
