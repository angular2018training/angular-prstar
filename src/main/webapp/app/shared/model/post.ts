import { BaseEntity } from '../model/base-entity';
import { User } from '../../shared';


export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public project?: any,
        public owner?: User,
        public proRequests?: any,
        public isManyPros?: string,
        public numberOfPros?: number,
        public createdDate?: any,
        public isCreatePost?:boolean
    ) {

    }
}
