import { BaseEntity } from './../../shared';
import { Notification } from './../../entities/notification';

export class ProDashboard implements BaseEntity {
    constructor(
        public id?: number,
        public bidSubmitted?: number,
        public proNetwork1?: number,
        public proNetwork2?: number,
        public lstNotifications?: Notification[],
    ) {}
}
