import { BaseEntity } from './../../shared';

export class BackgroundQuestion implements BaseEntity {
    constructor(
        public id?: number,
        public answer?: string,
        public proId?: number,
        public questionId?: number,
    ) {
    }
}
