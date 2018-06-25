import { BaseEntity } from './../../shared';

export class ResourceNeed implements BaseEntity {
    constructor(
        public id?: number,
        public bizId?: number,
        public roleId?: number,
        public locationId?: number,
    ) {
    }
}
