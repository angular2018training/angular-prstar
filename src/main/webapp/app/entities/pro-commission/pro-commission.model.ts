import { BaseEntity } from './../../shared';

export class ProCommission implements BaseEntity {
    constructor(
        public id?: number,
        public mtdAmount?: number,
        public qtdAmount?: number,
        public ytdAmount?: number,
        public ytdContractNumber?: number,
        public mtdContractNumber?: number,
        public qtdContractNumber?: number,
        public proId?: number,
        public sponsorId?: number,
        public levelId?: number,
    ) {
    }
}
