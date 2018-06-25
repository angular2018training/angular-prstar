import { BaseEntity } from './../../shared';

export class InterviewScore implements BaseEntity {
    constructor(
        public id?: number,
        public criteria?: string,
        public score?: number,
        public interviewSessionId?: number,
    ) {
    }
}
