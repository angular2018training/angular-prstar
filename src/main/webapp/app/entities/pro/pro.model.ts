import { ProRole } from './../../shared/master/master.model';
import { BaseEntity } from './../../shared';
import { User } from './../../shared';
import { Decision } from './../../screens/vetting/vetting.model';
import { File } from './../file';

export class Pro implements BaseEntity {
    constructor(
        public id?: number,
        public matchPercentage?: number,
        public name?: string,
        public email?: string,
        public address?: string,
        public phone?: string,
        public password?: string,
        public confirmPassword?: string,
        public background?: string,
        public pictureFile?: File,
        public summaryBio?: string,
        public lowDesiredRate?: number,
        public hightDesiredRate?: number,
        public account?: User,
        public sponsors?: BaseEntity[],
        public roles?: ProRole[],
        public decision?: Decision,
        public skills?: any,
        public rating?: number,
        public connectedDay?: number,
        public resumeFile?: File
        // public backgroundQuestions?: 
    ) {
    }
}
