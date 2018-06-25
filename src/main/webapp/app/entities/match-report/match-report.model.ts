import { BaseEntity } from './../../shared';
import { ProRequest } from "src/main/webapp/app/shared/model/pro-request";
import { RoleMatch } from "src/main/webapp/app/entities/role-match/role-match.model";

export class MatchReport implements BaseEntity {
    constructor(
        public id?: number,
        public roleMatches?: RoleMatch[],
        public proRequest?: ProRequest,
        public totalMatch?: number
    ) {
    }
}
