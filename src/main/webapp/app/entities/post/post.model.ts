import { BaseEntity } from './../../shared';
import { Project } from '../project';
import { Biz } from '../biz';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public project?: Project,
        public owner?: Biz,
        public bids?: BaseEntity[],

        public createdDate?: any,
        public projectProjectName?: string,
        public projectId?: number,
    ) {
    }
}
