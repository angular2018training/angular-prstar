import { BaseEntity } from './../../shared';
import { Biz } from '../biz';

export class BizRole implements BaseEntity {
    constructor(
        public id?: number,
        public location?: string,
        public biz?: Biz,
        public roleName?: string,
        public roleId?: number,
    ) {
    }
}
