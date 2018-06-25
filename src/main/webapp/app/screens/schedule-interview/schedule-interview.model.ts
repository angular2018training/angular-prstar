import { BaseEntity } from './../../shared';
import { DropDownItem } from '../../shared/model/dropdown-item.model';

export class ScheduleInterview implements BaseEntity {
    constructor(
        public id?: number,
        public proId?: number,
        public proRequirementId?: number,
        public status?: string,
        public bizNote?: string,
        public proNote?: string,
        public interviewSessions?: InterviewSession[]
    ) {}
}

export class InterviewSession {
    constructor (
        public suggestedInterviewSchedules?: SuggestedInterviewSchedule[],
        public templateID?: number,
        public interviewerUserId?: number,
        public selectedInterviewer?: DropDownItem[],
        public interviewType?: string,
        public interviewDate?: Date,
        public fromTime?: string,
        public duration?: number,
        public timezone?: string,
        public decision?: string,
        public note?: string
    ) {
        this.timezone = "UTC+07:00";
        this.decision = "AWAITING";
    }
    
}

export class SuggestedInterviewSchedule {
    constructor (
        public interviewDate?: Date,
        public fromTime?: string,
        public duration?: number,
        public timezone?: string,
        public note?: string,
        public proAccepted?: boolean,
        public bizAccepted?: boolean
    ) {
        this.timezone = "UTC+07:00";
        this.fromTime = '00:00';
        this.interviewDate = new Date();
    }
}
