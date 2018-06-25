import { BaseEntity } from './../../shared';

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
