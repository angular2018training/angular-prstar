import { BaseEntity } from './../../shared';

export class File implements BaseEntity {
    constructor(
        public id?: number,
        public contentType?: string,
        public content?: any,
        public bizId?: number,
        public type?: string,
        public path?: string,
        public name?: string
    ) {
    }
}
