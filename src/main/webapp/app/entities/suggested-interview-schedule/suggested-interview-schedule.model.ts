import { BaseEntity } from './../../shared';

export class SuggestedInterviewSchedule implements BaseEntity {
    constructor(
        public id?: number,
        public interviewDate?: any,
        public fromTime?: string,
        public duration?: number,
        public timezone?: string,
        public note?: string,
        public proAccepted?: boolean,
        public bizAccepted?: boolean,
        public interviewSessionId?: number,
    ) {
        this.proAccepted = false;
        this.bizAccepted = false;
    }
}
