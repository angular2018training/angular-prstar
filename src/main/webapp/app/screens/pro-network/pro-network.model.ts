import { Pro } from './../../entities/pro/pro.model';
export class ProNetwork {
    constructor(
        // for current showing values
        public proNetworkLv1ItemList: ProNetworkItem[],
        public totalContractLv1: number,
        public totalCommissionLv1: number,
        public showLv1List: boolean,

        public proNetworkLv2ItemList: ProNetworkItem[],
        public totalContractLv2: number,
        public totalCommissionLv2: number,
        public showLv2List: boolean,

        // data for YTD, QTD, MTD
        public totalMtdContractLv1: number,
        public totalMtdCommissionLv1: number,

        public totalQtdContractLv1: number,
        public totalQtdCommissionLv1: number,

        public totalYtdContractLv1: number,
        public totalYtdCommissionLv1: number,


        public totalMtdContractLv2: number,
        public totalMtdCommissionLv2: number,
        
        public totalQtdContractLv2: number,
        public totalQtdCommissionLv2: number,

        public totalYtdContractLv2: number,
        public totalYtdCommissionLv2: number
    ) { }
}

export class ProNetworkItem {
    constructor(
        // for current showing values
        public pro: Pro,
        public numOfContracts: number,
        public commission: number,


        // data for YTD, QTD, MTD
        public totalMtdContracts: number,
        public totalMtdCommission: number,
        
        public totalQtdContracts: number,
        public totalQtdCommission: number,
        
        public totalYtdContracts: number,
        public totalYtdCommission: number
    ) { }
}
