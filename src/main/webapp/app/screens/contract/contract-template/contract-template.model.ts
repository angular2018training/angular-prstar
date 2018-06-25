import { BaseEntity } from '../../../shared';
import {File } from '../../../entities/file/file.model'
export class ContractTemplate implements BaseEntity {
    constructor(
        public id?: number,
        public name?: any,
        public file?: File,
        public createdDate?: any,
    ) {
    }
}