import { BaseEntity } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public projectName?: string,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public owner?: BaseEntity
    ) {
    }
}

export class PostDTO implements BaseEntity {
    constructor(
        public id?: number,
        public numberOfPros?: number,
        public project?: BaseEntity,
        public proRequirement?: BaseEntity[]
    ) {
    }
}

export class PostWallDTO {
    constructor(
        public post?: PostDTO,
        public matchPoint?: number,
        public industry?: string,
        public bidded?: Boolean,
        public requirements?: Requirement[]
    ) {
    }
}

export class CriteriaDTO {
    constructor (
        public latitude: number,
        public longitude: number,
        public startDate: String,
        public endDate: string
     ) {
    }
}

export class Requirement {
    constructor (
        public name?: String,
        public number?: number
    ){}
}

export class ProRequirement implements BaseEntity {
    constructor(
        public id?: number,
        public additionalCommmentary?: string
    ) {
    }
}

export class Industry {
    constructor(
        code: number,
        value: String
    ) {

    }
}

export class Biz implements BaseEntity {
    constructor(
        public id?: number,
        public companyName?: string,
        public website?: string,
        public companyBio?: string,
        public companyLogo?: any,
        public companyLogoContentType?: string
    ) {
    }
}
