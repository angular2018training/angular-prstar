import { BaseEntity } from './../../shared';

export const enum InterviewDecision {
    'GO',
    'NO_GO',
    'AWAITING'
}

export class InterviewSession implements BaseEntity {
    constructor(
        public id?: number,
        public interviewType?: string,
        public interviewDate?: any,
        public fromTime?: string,
        public duration?: number,
        public timezone?: string,
        public decision?: InterviewDecision,
        public note?: string,
        public interviewId?: number,
    ) {
    }
}
