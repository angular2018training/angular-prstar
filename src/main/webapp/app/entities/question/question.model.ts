import { BaseEntity } from './../../shared';

export const enum QuestionType {
    'FREE',
    'RADIO',
    'CHECKBOX'
}

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public question?: string,
        public questionType?: QuestionType,
        public answers?: BaseEntity[],
        public proAnswer?: string
    ) {
    }
}
