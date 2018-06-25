import { BaseEntity } from './../../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public projectName?: string,
        public description?: string,
        public proLists?: BaseEntity[],
    ) {
    }
}

export class ProjectDTO implements BaseEntity{
    constructor(
        public id?: number,
        public lstProRequirements?: any,
        public projectName?: string,
        public isPost?: boolean,
        public description?: string,
        public startDate?: string,
        public endDate?: string,
        public isClosed?: boolean
    ){}
}
