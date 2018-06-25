import { Skill } from '../../entities/skill/skill.model';
import { Project } from "src/main/webapp/app/shared";

export class ProRequest {
    constructor(
        public isDone?: boolean,
        public roleId?: string,
        public roleName?: string,
        public skills?: Skill[],
        public industries?:any,
        public justLocal?:boolean,
        public paymentTeams?:any,
        public invoiceTerm?:any,
        public startDate?: any,
        public endDate?: any,
        public bidDeadline?: any,
        public decisionDate?: any,
        public projectType?: string,
        public workingLocation?: any,
        public proposalTemplateFilePath?: string,
        public additionalCommentary?: string,
        public project?: Project
    ) {
    }
}