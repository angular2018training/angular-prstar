import { BaseEntity } from './../../shared';

export class Notification implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public description?: string,
        public type?: number,
        public isRead?: boolean,
        public link?: string,
        public createdDate?: any,
    ) {
        this.isRead = false;
    }
}
