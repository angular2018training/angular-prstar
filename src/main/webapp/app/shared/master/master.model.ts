import { BaseEntity } from '../model/base-entity';

export class CommissionLevel implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public comissionRate?: number,
        public updatedDate?: any,
        public levels?: BaseEntity[],
    ) {
    }
}

export class Authority implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public displayedName?: string
        
    ) {
    }
}

export class Role implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public pros?: BaseEntity[],
    ) {
    }
}

export class ProRole implements BaseEntity {
    constructor(
        public id?: number,
        public lowDesiredRate?: number,
        public highDesiredRate?: number,
        public role?: Role,
    ) {
    }
}

export class BaseMasterEntity implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
