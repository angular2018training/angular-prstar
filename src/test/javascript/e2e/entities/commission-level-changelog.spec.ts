import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CommissionLevelChangelog e2e test', () => {

    let navBarPage: NavBarPage;
    let commissionLevelChangelogDialogPage: CommissionLevelChangelogDialogPage;
    let commissionLevelChangelogComponentsPage: CommissionLevelChangelogComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CommissionLevelChangelogs', () => {
        navBarPage.goToEntity('commission-level-changelog');
        commissionLevelChangelogComponentsPage = new CommissionLevelChangelogComponentsPage();
        expect(commissionLevelChangelogComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.commissionLevelChangelog.home.title/);

    });

    it('should load create CommissionLevelChangelog dialog', () => {
        commissionLevelChangelogComponentsPage.clickOnCreateButton();
        commissionLevelChangelogDialogPage = new CommissionLevelChangelogDialogPage();
        expect(commissionLevelChangelogDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.commissionLevelChangelog.home.createOrEditLabel/);
        commissionLevelChangelogDialogPage.close();
    });

    it('should create and save CommissionLevelChangelogs', () => {
        commissionLevelChangelogComponentsPage.clickOnCreateButton();
        commissionLevelChangelogDialogPage.setUpdatedDateInput(12310020012301);
        expect(commissionLevelChangelogDialogPage.getUpdatedDateInput()).toMatch('2001-12-31T02:30');
        commissionLevelChangelogDialogPage.setCommissionRateInput('5');
        expect(commissionLevelChangelogDialogPage.getCommissionRateInput()).toMatch('5');
        commissionLevelChangelogDialogPage.commissionLevelSelectLastOption();
        commissionLevelChangelogDialogPage.save();
        expect(commissionLevelChangelogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommissionLevelChangelogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-commission-level-changelog div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommissionLevelChangelogDialogPage {
    modalTitle = element(by.css('h4#myCommissionLevelChangelogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    updatedDateInput = element(by.css('input#field_updatedDate'));
    commissionRateInput = element(by.css('input#field_commissionRate'));
    commissionLevelSelect = element(by.css('select#field_commissionLevel'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUpdatedDateInput = function(updatedDate) {
        this.updatedDateInput.sendKeys(updatedDate);
    };

    getUpdatedDateInput = function() {
        return this.updatedDateInput.getAttribute('value');
    };

    setCommissionRateInput = function(commissionRate) {
        this.commissionRateInput.sendKeys(commissionRate);
    };

    getCommissionRateInput = function() {
        return this.commissionRateInput.getAttribute('value');
    };

    commissionLevelSelectLastOption = function() {
        this.commissionLevelSelect.all(by.tagName('option')).last().click();
    };

    commissionLevelSelectOption = function(option) {
        this.commissionLevelSelect.sendKeys(option);
    };

    getCommissionLevelSelect = function() {
        return this.commissionLevelSelect;
    };

    getCommissionLevelSelectedOption = function() {
        return this.commissionLevelSelect.element(by.css('option:checked')).getText();
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
