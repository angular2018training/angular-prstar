import { BaseEntity } from './../../shared';
import { Pro } from '../pro';
import { Skill } from '../skill';

export class ProSkill implements BaseEntity {
    constructor(
        public id?: number,
        public strength?: number,
        public yearsOfExperience?: number,
        public skill?: Skill
    ) {
    }
}
