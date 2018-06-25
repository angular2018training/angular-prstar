import { BaseEntity } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public project?: BaseEntity,
        public owner?: BaseEntity,
        public bids?: BaseEntity[],
    ) {
    }
}

export class Pid implements BaseEntity {
    constructor(
        public id?: number,
        public proposalContentType?: string,
        public proposal?: any,
        public proposedPrice?: number,
        public post?: BaseEntity,
        public owner?: BaseEntity,
    ) {
    }
}
