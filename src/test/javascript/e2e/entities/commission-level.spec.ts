import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CommissionLevel e2e test', () => {

    let navBarPage: NavBarPage;
    let commissionLevelDialogPage: CommissionLevelDialogPage;
    let commissionLevelComponentsPage: CommissionLevelComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CommissionLevels', () => {
        navBarPage.goToEntity('commission-level');
        commissionLevelComponentsPage = new CommissionLevelComponentsPage();
        expect(commissionLevelComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.commissionLevel.home.title/);

    });

    it('should load create CommissionLevel dialog', () => {
        commissionLevelComponentsPage.clickOnCreateButton();
        commissionLevelDialogPage = new CommissionLevelDialogPage();
        expect(commissionLevelDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.commissionLevel.home.createOrEditLabel/);
        commissionLevelDialogPage.close();
    });

    it('should create and save CommissionLevels', () => {
        commissionLevelComponentsPage.clickOnCreateButton();
        commissionLevelDialogPage.setNameInput('name');
        expect(commissionLevelDialogPage.getNameInput()).toMatch('name');
        commissionLevelDialogPage.setCommissionRateInput('5');
        expect(commissionLevelDialogPage.getCommissionRateInput()).toMatch('5');
        commissionLevelDialogPage.setUpdatedDateInput(12310020012301);
        expect(commissionLevelDialogPage.getUpdatedDateInput()).toMatch('2001-12-31T02:30');
        commissionLevelDialogPage.save();
        expect(commissionLevelDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommissionLevelComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-commission-level div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommissionLevelDialogPage {
    modalTitle = element(by.css('h4#myCommissionLevelLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    commissionRateInput = element(by.css('input#field_commissionRate'));
    updatedDateInput = element(by.css('input#field_updatedDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCommissionRateInput = function(commissionRate) {
        this.commissionRateInput.sendKeys(commissionRate);
    };

    getCommissionRateInput = function() {
        return this.commissionRateInput.getAttribute('value');
    };

    setUpdatedDateInput = function(updatedDate) {
        this.updatedDateInput.sendKeys(updatedDate);
    };

    getUpdatedDateInput = function() {
        return this.updatedDateInput.getAttribute('value');
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
