import { BaseEntity } from './../../shared';

export class InterviewTemplate implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public interviewType?: string,
        public duration?: number,
    ) {
    }
}
