import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Pro e2e test', () => {

    let navBarPage: NavBarPage;
    let proDialogPage: ProDialogPage;
    let proComponentsPage: ProComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pros', () => {
        navBarPage.goToEntity('pro');
        proComponentsPage = new ProComponentsPage();
        expect(proComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.pro.home.title/);

    });

    it('should load create Pro dialog', () => {
        proComponentsPage.clickOnCreateButton();
        proDialogPage = new ProDialogPage();
        expect(proDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.pro.home.createOrEditLabel/);
        proDialogPage.close();
    });

    it('should create and save Pros', () => {
        proComponentsPage.clickOnCreateButton();
        proDialogPage.setNameInput('name');
        expect(proDialogPage.getNameInput()).toMatch('name');
        proDialogPage.setEmailInput('email');
        expect(proDialogPage.getEmailInput()).toMatch('email');
        proDialogPage.setAddressInput('address');
        expect(proDialogPage.getAddressInput()).toMatch('address');
        proDialogPage.setPhoneInput('phone');
        expect(proDialogPage.getPhoneInput()).toMatch('phone');
        proDialogPage.setBackgroundInput('background');
        expect(proDialogPage.getBackgroundInput()).toMatch('background');
        proDialogPage.setPictureInput(absolutePath);
        proDialogPage.setSummaryBioInput('summaryBio');
        expect(proDialogPage.getSummaryBioInput()).toMatch('summaryBio');
        proDialogPage.setDesiredRateLowInput('5');
        expect(proDialogPage.getDesiredRateLowInput()).toMatch('5');
        proDialogPage.setDesiredRateHighInput('5');
        expect(proDialogPage.getDesiredRateHighInput()).toMatch('5');
        proDialogPage.accountSelectLastOption();
        // proDialogPage.roleSelectLastOption();
        proDialogPage.save();
        expect(proDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProDialogPage {
    modalTitle = element(by.css('h4#myProLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    emailInput = element(by.css('input#field_email'));
    addressInput = element(by.css('input#field_address'));
    phoneInput = element(by.css('input#field_phone'));
    backgroundInput = element(by.css('input#field_background'));
    pictureInput = element(by.css('input#file_picture'));
    summaryBioInput = element(by.css('input#field_summaryBio'));
    desiredRateLowInput = element(by.css('input#field_desiredRateLow'));
    desiredRateHighInput = element(by.css('input#field_desiredRateHigh'));
    accountSelect = element(by.css('select#field_account'));
    roleSelect = element(by.css('select#field_role'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    };

    setBackgroundInput = function(background) {
        this.backgroundInput.sendKeys(background);
    };

    getBackgroundInput = function() {
        return this.backgroundInput.getAttribute('value');
    };

    setPictureInput = function(picture) {
        this.pictureInput.sendKeys(picture);
    };

    getPictureInput = function() {
        return this.pictureInput.getAttribute('value');
    };

    setSummaryBioInput = function(summaryBio) {
        this.summaryBioInput.sendKeys(summaryBio);
    };

    getSummaryBioInput = function() {
        return this.summaryBioInput.getAttribute('value');
    };

    setDesiredRateLowInput = function(desiredRateLow) {
        this.desiredRateLowInput.sendKeys(desiredRateLow);
    };

    getDesiredRateLowInput = function() {
        return this.desiredRateLowInput.getAttribute('value');
    };

    setDesiredRateHighInput = function(desiredRateHigh) {
        this.desiredRateHighInput.sendKeys(desiredRateHigh);
    };

    getDesiredRateHighInput = function() {
        return this.desiredRateHighInput.getAttribute('value');
    };

    accountSelectLastOption = function() {
        this.accountSelect.all(by.tagName('option')).last().click();
    };

    accountSelectOption = function(option) {
        this.accountSelect.sendKeys(option);
    };

    getAccountSelect = function() {
        return this.accountSelect;
    };

    getAccountSelectedOption = function() {
        return this.accountSelect.element(by.css('option:checked')).getText();
    };

    roleSelectLastOption = function() {
        this.roleSelect.all(by.tagName('option')).last().click();
    };

    roleSelectOption = function(option) {
        this.roleSelect.sendKeys(option);
    };

    getRoleSelect = function() {
        return this.roleSelect;
    };

    getRoleSelectedOption = function() {
        return this.roleSelect.element(by.css('option:checked')).getText();
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
