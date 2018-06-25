import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProCommission e2e test', () => {

    let navBarPage: NavBarPage;
    let proCommissionDialogPage: ProCommissionDialogPage;
    let proCommissionComponentsPage: ProCommissionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProCommissions', () => {
        navBarPage.goToEntity('pro-commission');
        proCommissionComponentsPage = new ProCommissionComponentsPage();
        expect(proCommissionComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.proCommission.home.title/);

    });

    it('should load create ProCommission dialog', () => {
        proCommissionComponentsPage.clickOnCreateButton();
        proCommissionDialogPage = new ProCommissionDialogPage();
        expect(proCommissionDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.proCommission.home.createOrEditLabel/);
        proCommissionDialogPage.close();
    });

    it('should create and save ProCommissions', () => {
        proCommissionComponentsPage.clickOnCreateButton();
        proCommissionDialogPage.setMtdAmountInput('5');
        expect(proCommissionDialogPage.getMtdAmountInput()).toMatch('5');
        proCommissionDialogPage.setQtdAmountInput('5');
        expect(proCommissionDialogPage.getQtdAmountInput()).toMatch('5');
        proCommissionDialogPage.setYtdAmountInput('5');
        expect(proCommissionDialogPage.getYtdAmountInput()).toMatch('5');
        proCommissionDialogPage.setYtdContractNumberInput('5');
        expect(proCommissionDialogPage.getYtdContractNumberInput()).toMatch('5');
        proCommissionDialogPage.setMtdContractNumberInput('5');
        expect(proCommissionDialogPage.getMtdContractNumberInput()).toMatch('5');
        proCommissionDialogPage.setQtdContractNumberInput('5');
        expect(proCommissionDialogPage.getQtdContractNumberInput()).toMatch('5');
        proCommissionDialogPage.proSelectLastOption();
        proCommissionDialogPage.sponsorSelectLastOption();
        proCommissionDialogPage.levelSelectLastOption();
        proCommissionDialogPage.save();
        expect(proCommissionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProCommissionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro-commission div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProCommissionDialogPage {
    modalTitle = element(by.css('h4#myProCommissionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    mtdAmountInput = element(by.css('input#field_mtdAmount'));
    qtdAmountInput = element(by.css('input#field_qtdAmount'));
    ytdAmountInput = element(by.css('input#field_ytdAmount'));
    ytdContractNumberInput = element(by.css('input#field_ytdContractNumber'));
    mtdContractNumberInput = element(by.css('input#field_mtdContractNumber'));
    qtdContractNumberInput = element(by.css('input#field_qtdContractNumber'));
    proSelect = element(by.css('select#field_pro'));
    sponsorSelect = element(by.css('select#field_sponsor'));
    levelSelect = element(by.css('select#field_level'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMtdAmountInput = function(mtdAmount) {
        this.mtdAmountInput.sendKeys(mtdAmount);
    };

    getMtdAmountInput = function() {
        return this.mtdAmountInput.getAttribute('value');
    };

    setQtdAmountInput = function(qtdAmount) {
        this.qtdAmountInput.sendKeys(qtdAmount);
    };

    getQtdAmountInput = function() {
        return this.qtdAmountInput.getAttribute('value');
    };

    setYtdAmountInput = function(ytdAmount) {
        this.ytdAmountInput.sendKeys(ytdAmount);
    };

    getYtdAmountInput = function() {
        return this.ytdAmountInput.getAttribute('value');
    };

    setYtdContractNumberInput = function(ytdContractNumber) {
        this.ytdContractNumberInput.sendKeys(ytdContractNumber);
    };

    getYtdContractNumberInput = function() {
        return this.ytdContractNumberInput.getAttribute('value');
    };

    setMtdContractNumberInput = function(mtdContractNumber) {
        this.mtdContractNumberInput.sendKeys(mtdContractNumber);
    };

    getMtdContractNumberInput = function() {
        return this.mtdContractNumberInput.getAttribute('value');
    };

    setQtdContractNumberInput = function(qtdContractNumber) {
        this.qtdContractNumberInput.sendKeys(qtdContractNumber);
    };

    getQtdContractNumberInput = function() {
        return this.qtdContractNumberInput.getAttribute('value');
    };

    proSelectLastOption = function() {
        this.proSelect.all(by.tagName('option')).last().click();
    };

    proSelectOption = function(option) {
        this.proSelect.sendKeys(option);
    };

    getProSelect = function() {
        return this.proSelect;
    };

    getProSelectedOption = function() {
        return this.proSelect.element(by.css('option:checked')).getText();
    };

    sponsorSelectLastOption = function() {
        this.sponsorSelect.all(by.tagName('option')).last().click();
    };

    sponsorSelectOption = function(option) {
        this.sponsorSelect.sendKeys(option);
    };

    getSponsorSelect = function() {
        return this.sponsorSelect;
    };

    getSponsorSelectedOption = function() {
        return this.sponsorSelect.element(by.css('option:checked')).getText();
    };

    levelSelectLastOption = function() {
        this.levelSelect.all(by.tagName('option')).last().click();
    };

    levelSelectOption = function(option) {
        this.levelSelect.sendKeys(option);
    };

    getLevelSelect = function() {
        return this.levelSelect;
    };

    getLevelSelectedOption = function() {
        return this.levelSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
