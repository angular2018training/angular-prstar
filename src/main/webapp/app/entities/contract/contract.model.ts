import { BaseEntity } from './../../shared';
import { File } from './../file';

export const enum ContractStatus {
    'PENDING_APPROVAL',
    'CHANGE_REQUESTED',
    'DECLINED',
    'ACCEPTED'
}

export class Contract implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public note?: string,
        public createdDate?: any,
        public bizStatus?: ContractStatus,
        public proStatus?: ContractStatus,
        public histories?: BaseEntity[],
        public file?: File,
    ) {
    }
}


