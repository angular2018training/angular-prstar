import { Component, OnInit } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { CommissionLevel } from '../../../entities/commission-level/commission-level.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MasterService } from '../../../shared';

@Component({
    selector: 'jhi-income-calculator',
    templateUrl: 'income-calculator.component.html',
})
export class IncomeCalculatorComponent implements OnInit {

    /**
     * Object to keep data used for calculating Income and display on GUI.
     */
    calculatorForm: any = {
        referralsNumber : 12,
        referralsAverageBillRate : 125,
        referralsAverageWeeksNumberPerYears : 26,
        referralsNumberOfReferrals : 6,
        referralsAmount : 0,
        referralsAmountOfReferrals : 0,
        referralsAmountOfReferralsNote : 0,
        networkReferralsIncome : 0,
        proAverageBillRate : 125,
        proAverageWeeksNumberPerYears : 26,
        contractIncome : 0,
        contractIncomeNote : 0,
        totalIncome : 0,
        totalIncomeNote : 0,
        networkReferralsIncomePercent : 0,
        contractIncomePercent: 0
    };

    /**
     * Default number of hours per work weeks.
     */
    hoursNumberPerWeek = 40;

    /**
     * Default commission rate of level 1
     */
    commissionLevel1: any = {
        name: '1',
        commissionRate: 0.02
    };

    /**
     * Default commission rate of level 2
     */
    commissionLevel2: any = {
        name: '2',
        commissionRate: 0.01
    };

    /**
     * Constructor
     * @param masterService the master service
     */
    constructor(private masterService: MasterService) {

    }

    /**
     * Init this screen
     * - Load master data.
     * - Calculate Income.
     */
    ngOnInit() {
        this.loadCommissionLevels();
        this.recalculateIncome();
    }

    /**
     * Load list of commission levels.
     */
    loadCommissionLevels() {
        const subMaster = this.masterService.commissionLevels().subscribe(
            (res: HttpResponse<CommissionLevel[]>) => {
                const commissionLevels = res.body;

                if (commissionLevels.length >= 2) {
                    /**
                     * Get level 1
                     */
                    const listCommissionLevel1 = commissionLevels.filter((level) => {
                        return level.name === this.commissionLevel1.name;
                    });
                    if (listCommissionLevel1.length > 0) {
                        this.commissionLevel1 = listCommissionLevel1[0];
                    }

                    /**
                     * Get level 2
                     */
                    const listCommissionLevel2 = commissionLevels.filter((level) => {
                        return level.name === this.commissionLevel2.name;
                    });
                    if (listCommissionLevel2.length > 0) {
                        this.commissionLevel2 = listCommissionLevel2[0];
                    }
                }

                subMaster.unsubscribe();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    /**
     * Calculate Income.
     */
    recalculateIncome() {
        this.setDefaultValueForInvalidNumber();
        // Total Amount of Referrals
        this.calculatorForm.referralsAmount = this.calculatorForm.referralsNumber
                                                        * this.calculatorForm.referralsAverageBillRate
                                                        * this.calculatorForm.referralsAverageWeeksNumberPerYears
                                                        * this.hoursNumberPerWeek
                                                        * this.commissionLevel1.commissionRate;
        // Total Amount of Referrals Referrals
        this.calculatorForm.referralsAmountOfReferrals = this.calculatorForm.referralsNumber
                                                        * this.calculatorForm.referralsAverageBillRate
                                                        * this.calculatorForm.referralsAverageWeeksNumberPerYears
                                                        * this.calculatorForm.referralsNumberOfReferrals
                                                        * this.hoursNumberPerWeek
                                                        * this.commissionLevel2.commissionRate;
        // Total Income from Referrals
        this.calculatorForm.networkReferralsIncome = this.calculatorForm.referralsAmount
                                                    + this.calculatorForm.referralsAmountOfReferrals;

        // Total income from Contracting
        this.calculatorForm.contractIncome = this.calculatorForm.proAverageBillRate
                                            *  this.calculatorForm.proAverageWeeksNumberPerYears
                                            *  this.hoursNumberPerWeek;

        // Total Income
        this.calculatorForm.totalIncome = this.calculatorForm.networkReferralsIncome
                                         + this.calculatorForm.contractIncome;

        // Referrals Income percent
        this.calculatorForm.networkReferralsIncomePercent = this.calculatorForm.networkReferralsIncome
                                                    /  this.calculatorForm.totalIncome;
        // Project income percent
        this.calculatorForm.contractIncomePercent = this.calculatorForm.contractIncome
                                                    /  this.calculatorForm.totalIncome;
    }

    /**
     * Set default value for variable which is smaller than zero.
     */
    setDefaultValueForInvalidNumber() {
        this.calculatorForm.referralsNumber = this.calculatorForm.referralsNumber > 0? this.calculatorForm.referralsNumber: 0;
        this.calculatorForm.referralsAverageBillRate = this.calculatorForm.referralsAverageBillRate > 0? this.calculatorForm.referralsAverageBillRate: 0;
        this.calculatorForm.referralsAverageWeeksNumberPerYears = this.calculatorForm.referralsAverageWeeksNumberPerYears > 0 ? this.calculatorForm.referralsAverageWeeksNumberPerYears: 0;
        this.calculatorForm.referralsNumberOfReferrals = this.calculatorForm.referralsNumberOfReferrals > 0 ? this.calculatorForm.referralsNumberOfReferrals: 0;

        this.calculatorForm.proAverageBillRate = this.calculatorForm.proAverageBillRate > 0? this.calculatorForm.proAverageBillRate: 0;
        this.calculatorForm.proAverageWeeksNumberPerYears = this.calculatorForm.proAverageWeeksNumberPerYears > 0? this.calculatorForm.proAverageWeeksNumberPerYears: 0;
    }

    /**
     * Show error
     * @param error error message
     */
    private onError(error) {
        console.log(error.message);
    }
}
