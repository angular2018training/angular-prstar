import { BaseEntity, User } from './../../shared';

export class Biz implements BaseEntity {
    constructor(
        public id?: number,
        public account?: User,
        public user?: any,
        public email?: string,
        public login?: string,
        public prefix?:  any,
        public firstName?:  string,
        public middleName?:  string,
        public lastName?:  string,
        public suffix?:  any,
        public address?: string,
        public phone?: string,
        public phoneType?: string[],
        public companyName?: string,
        public website?: string,
        public password?: string,
        public confirmPassword?: string,
        public hqAddress?: string,
        public companyBio?: string,
        public contractTemplateContentType?: string,
        public contractTemplate?: any,
        public accountId?: number,
        public companySizes?: BaseEntity[],
        public industries?: BaseEntity[],
        public bizMemberRoles?: BaseEntity[],
    ) {
    }
}
