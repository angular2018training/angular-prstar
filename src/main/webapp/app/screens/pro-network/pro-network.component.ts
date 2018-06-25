import { DropDownItem } from './../../shared/model/dropdown-item.model';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';

import { ProNetwork, ProNetworkItem } from './pro-network.model';
import { ProNetworkService } from './pro-network.service';

@Component({
  selector: 'jhi-pro-network',
  templateUrl: './pro-network.component.html',
  styles: []
})
export class ProNetworkComponent implements OnInit {
  proNetwork: ProNetwork;
  filterSettingValue: String;
  lv1SpannableButtonText: String;
  lv2SpannableButtonText: String;
  selectedFilter = [];
  filterData = [
    new DropDownItem(0, "MTD"),
    new DropDownItem(1, "QTD"),
    new DropDownItem(2, "YTD"),
  ];
  filterSettings = {
    singleSelection: true,
    disabled: false,
    text: 'YTD, QTD, MTD',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    enableSearchFilter: false,
    classes: 'myclass custom-class'
  };

  constructor(
    private proNetworkService: ProNetworkService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.selectedFilter = [
      this.filterData[0]
    ];
    this.updateFilterValueText();
    this.lv1SpannableButtonText = '+';
    this.lv2SpannableButtonText = '+';
    this.proNetworkService.getProNetwork(1).
      subscribe((proNetwork) => {
        this.proNetwork = proNetwork;
        this.showDataBaseOnSetting();
      });
  }

  getConnectedDisplayValue(val) : string {
    let unit = "";
    let displayValue = 0;
    if (val < 30) {
      displayValue = val;
      if (val == 1) {
        unit = "day";
      } else {
        unit = "days";
      }
    } else if (val < 365) {
      displayValue = Math.floor(val / 30);
      if (val == 1) {
        unit = "month";
      } else {
        unit = "months";
      }
    } else {
      displayValue = Math.floor(val / 365);
      if (val == 1) {
        unit = "year";
      } else {
        unit = "years";
      }
    }

    return displayValue + ' ' + unit;
  }

  showDataBaseOnSetting() {
    let filterSettingIndex = 0;
    if (this.selectedFilter.length > 0) {
      filterSettingIndex = this.selectedFilter[0].id;
    }
    switch (filterSettingIndex) {
      case 0: { // mtd
        this.showMtd();
        break;
      }

      case 1: { // qtd
        this.showQtd();
        break;
      }

      case 2: { // ytd
        this.showYtd();
        break;
      }

      default: {
        this.showMtd();
        break;
      }
    }
  }

  onToggleLv1List() {
    this.proNetwork.showLv1List = !this.proNetwork.showLv1List;
    if (this.lv1SpannableButtonText === '+') {
      this.lv1SpannableButtonText = '-';
    } else {
      this.lv1SpannableButtonText = '+';
    }
  }

  onToggleLv2List() {
    this.proNetwork.showLv2List = !this.proNetwork.showLv2List;
    if (this.lv2SpannableButtonText === '+') {
      this.lv2SpannableButtonText = '-';
    } else {
      this.lv2SpannableButtonText = '+';
    }
  }

  onFilterSelect(event) {
    this.showDataBaseOnSetting();
    this.updateFilterValueText();
  }

  updateFilterValueText() {
    let filterSettingIndex = 0;
    if (this.selectedFilter.length > 0) {
      filterSettingIndex = this.selectedFilter[0].id;
    }
    let filterLanguageKey = 'prostarsWebApp.pro.network.mtd';
    switch (filterSettingIndex) {
      case 0: {
        filterLanguageKey = 'prostarsWebApp.pro.network.mtd';
        break;
      }

      case 1: {
        filterLanguageKey = 'prostarsWebApp.pro.network.qtd';
        break;
      }

      case 2: {
        filterLanguageKey = 'prostarsWebApp.pro.network.ytd';
        break;
      }

      default: {
        filterLanguageKey = 'prostarsWebApp.pro.network.mtd';
        break;
      }

    }

    this.translateService.get(filterLanguageKey).subscribe((value) => {
      this.filterSettingValue = value;
    });
  }

  showMtd() {
    // for level 1
    this.proNetwork.proNetworkLv1ItemList.forEach(function(value) {
        value.numOfContracts = value.totalMtdContracts;
        value.commission = value.totalMtdCommission;
      });
    this.proNetwork.totalContractLv1 = this.proNetwork.totalMtdContractLv1;
    this.proNetwork.totalCommissionLv1 = this.proNetwork.totalMtdCommissionLv1;

    // for level 2
    this.proNetwork.proNetworkLv2ItemList.forEach(function(value) {
      value.numOfContracts = value.totalMtdContracts;
      value.commission = value.totalMtdCommission;
    });
    this.proNetwork.totalContractLv2 = this.proNetwork.totalMtdContractLv2;
    this.proNetwork.totalCommissionLv2 = this.proNetwork.totalMtdCommissionLv2;
  }

  showQtd() {
    // for level 1
    this.proNetwork.proNetworkLv1ItemList.forEach(function(value) {
        value.numOfContracts = value.totalQtdContracts;
        value.commission = value.totalQtdCommission;
      });
    this.proNetwork.totalContractLv1 = this.proNetwork.totalQtdContractLv1;
    this.proNetwork.totalCommissionLv1 = this.proNetwork.totalQtdCommissionLv1;

    // for level 2
    this.proNetwork.proNetworkLv2ItemList.forEach(function(value) {
      value.numOfContracts = value.totalQtdContracts;
      value.commission = value.totalQtdCommission;
    });
    this.proNetwork.totalContractLv2 = this.proNetwork.totalQtdContractLv2;
    this.proNetwork.totalCommissionLv2 = this.proNetwork.totalQtdCommissionLv2;
  }

  showYtd() {
    // for level 1
    this.proNetwork.proNetworkLv1ItemList.forEach(function(value) {
        value.numOfContracts = value.totalYtdContracts;
        value.commission = value.totalYtdCommission;
      });
    this.proNetwork.totalContractLv1 = this.proNetwork.totalYtdContractLv1;
    this.proNetwork.totalCommissionLv1 = this.proNetwork.totalYtdCommissionLv1;

    // for level 2
    this.proNetwork.proNetworkLv2ItemList.forEach(function(value) {
      value.numOfContracts = value.totalYtdContracts;
      value.commission = value.totalYtdCommission;
    });
    this.proNetwork.totalContractLv2 = this.proNetwork.totalYtdContractLv2;
    this.proNetwork.totalCommissionLv2 = this.proNetwork.totalYtdCommissionLv2;
  }

}
