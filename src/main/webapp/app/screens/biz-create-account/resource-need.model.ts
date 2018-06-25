import { DropDownItem } from './../../shared/model/dropdown-item.model';
import { Address } from './../../shared/model/address';
export class ResourceNeed {
    constructor(
        public role?: DropDownItem[],
        public location?: Address,
      ) {
      }
}