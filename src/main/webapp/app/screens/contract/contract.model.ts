import { BaseEntity, Role, User } from './../../shared';
import { ContractHistory } from '../contract/contract-pending/contract-history.model';
import {File } from '../../entities/file/file.model'
import { Project } from '../../entities/project';
import { Pro } from '../../entities/pro';
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
        public proRequirement?: BaseEntity[],
        public pro?: Pro,
        public role?: Role,
        public createdDate?: any,
        public project?: Project,
        public bizStatus?: ContractStatus,
        public proStatus?: ContractStatus,
        public histories?: ContractHistory[],
        public file?: File,
        public createdBy?: User,
    ) {
        this.histories = [];
    }
}


