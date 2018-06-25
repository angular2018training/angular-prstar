import { BaseEntity } from './../../shared';

export const enum InterviewStatus {
    'PENDING_AVAILABILITY',
    'DECLINE_AVAILABILITY',
    'SCHEDULED',
    'COMPLETED',
    'PENDING_ACCEPTANCE',
    'ACCEPTED',
    'DECLINED'
}

export class Interview implements BaseEntity {
    constructor(
        public id?: number,
        public status?: InterviewStatus,
        public note?: string,
    ) {
    }
}
