import { BaseEntity } from './../../shared';

export class Invitee implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phone?: string,
        public briefSummary?: string,
        public token?: string,
        public inviterId?: number,
    ) {
    }
}
