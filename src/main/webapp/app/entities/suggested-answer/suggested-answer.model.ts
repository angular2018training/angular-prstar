import { BaseEntity } from './../../shared';

export class SuggestedAnswer implements BaseEntity {
    constructor(
        public id?: number,
        public answer?: string,
        public questionId?: number,
    ) {
    }
}
