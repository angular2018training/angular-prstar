import { BaseEntity } from './../../shared';

export class BizMemberRole implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
