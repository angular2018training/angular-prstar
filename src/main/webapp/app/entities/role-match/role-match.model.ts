import { Pro } from './../pro/pro.model';
import { BaseEntity } from './../../shared';

export class RoleMatch implements BaseEntity {
    constructor(
        public id?: number,
        public roleName?: string,
        public matchReport?: BaseEntity,
        public pros?: Pro[],
        public savedPros?: Pro[],
        public passedPros?: Pro[],
        public totalMatch?: number,
        public status?: string,
        public startDate?: string,
        public endDate?: string
    ) {
        
    }
}
