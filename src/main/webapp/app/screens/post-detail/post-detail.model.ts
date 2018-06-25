import { BaseEntity } from '../../shared';

export class PostDTO {
    constructor(
        public id?: number,
        public numberOfPros?: number,
        public project?: BaseEntity,
        public proRequests?: BaseEntity[]
    ) { }
}

export class ProRequirement implements BaseEntity {
    constructor(
        public id?: number,
        public additionalCommmentary?: string,
        public industries?: BaseEntity[],
        public skills?: BaseEntity[],
        public matchRate?: number,
        public isBid?: Boolean
    ) { }
}

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public projectName?: string,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public owner?: BaseEntity
    ) { }
}

export class Biz implements BaseEntity {
    constructor(
        public id?: number,
        public companyName?: string,
        public website?: string,
        public companyBio?: string,
        public companyLogo?: any,
        public companyLogoContentType?: string
    ) { }
}

export class IndustryPro implements BaseEntity {
    constructor(
        public id?: number,
        public yearsOfExperience?: number,
        public industry?: BaseEntity
    ) { }
}

export class SkillPro implements BaseEntity {
    constructor(
        public id?: number,
        public strength?: number,
        public yearsOfExperience?: number,
        public skill?: BaseEntity
    ) { }
}

export class Industry implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string
    ) {}
}

export class Skill implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string
    ) {
    }
}