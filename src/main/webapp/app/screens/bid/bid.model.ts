import { BaseEntity } from './../../shared';

export class Account {
    constructor(
        public id?: number
    ) {}
}

export class Owner {
    constructor(
        public id?: number,
        public account?: Account
    ) {}
}

export class ProRequirement {
    constructor(
        public id?: number
    ) {}
}

export class File {
    constructor(
        public content?: any,
        public contentType?: string,
        public name?: string
    ) {}
}

export class Bid implements BaseEntity {
    constructor(
        public id?: number,
        public status?: string,
        public proposalFile?: File,
        public proposedPrice?: number,
        public proposalText?: string,
        public createdDate?: any,
        public note?: string,
        public proRequirement?: ProRequirement,
        public owner?: Owner,
        public portfolios?: File[],
        public startDate?: Date,
        public endDate?: Date
    ) {
        this.status = "PENDING";
        this.startDate = new Date();
        this.endDate = new Date();
    }
}
