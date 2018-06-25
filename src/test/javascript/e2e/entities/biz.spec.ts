import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Biz e2e test', () => {

    let navBarPage: NavBarPage;
    let bizDialogPage: BizDialogPage;
    let bizComponentsPage: BizComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bizs', () => {
        navBarPage.goToEntity('biz');
        bizComponentsPage = new BizComponentsPage();
        expect(bizComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.biz.home.title/);

    });

    it('should load create Biz dialog', () => {
        bizComponentsPage.clickOnCreateButton();
        bizDialogPage = new BizDialogPage();
        expect(bizDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.biz.home.createOrEditLabel/);
        bizDialogPage.close();
    });

    it('should create and save Bizs', () => {
        bizComponentsPage.clickOnCreateButton();
        bizDialogPage.setNameInput('name');
        expect(bizDialogPage.getNameInput()).toMatch('name');
        bizDialogPage.setEmailInput('email');
        expect(bizDialogPage.getEmailInput()).toMatch('email');
        bizDialogPage.setAddressInput('address');
        expect(bizDialogPage.getAddressInput()).toMatch('address');
        bizDialogPage.setPhoneInput('phone');
        expect(bizDialogPage.getPhoneInput()).toMatch('phone');
        bizDialogPage.setCompanyNameInput('companyName');
        expect(bizDialogPage.getCompanyNameInput()).toMatch('companyName');
        bizDialogPage.setWebsiteInput('website');
        expect(bizDialogPage.getWebsiteInput()).toMatch('website');
        bizDialogPage.setHqAddressInput('hqAddress');
        expect(bizDialogPage.getHqAddressInput()).toMatch('hqAddress');
        bizDialogPage.setCompanyBioInput('companyBio');
        expect(bizDialogPage.getCompanyBioInput()).toMatch('companyBio');
        bizDialogPage.setContractTemplateInput(absolutePath);
        bizDialogPage.accountSelectLastOption();
        // bizDialogPage.companySizeSelectLastOption();
        // bizDialogPage.industrySelectLastOption();
        // bizDialogPage.bizMemberRoleSelectLastOption();
        bizDialogPage.save();
        expect(bizDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BizComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-biz div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BizDialogPage {
    modalTitle = element(by.css('h4#myBizLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    emailInput = element(by.css('input#field_email'));
    addressInput = element(by.css('input#field_address'));
    phoneInput = element(by.css('input#field_phone'));
    companyNameInput = element(by.css('input#field_companyName'));
    websiteInput = element(by.css('input#field_website'));
    hqAddressInput = element(by.css('input#field_hqAddress'));
    companyBioInput = element(by.css('input#field_companyBio'));
    contractTemplateInput = element(by.css('input#file_contractTemplate'));
    accountSelect = element(by.css('select#field_account'));
    companySizeSelect = element(by.css('select#field_companySize'));
    industrySelect = element(by.css('select#field_industry'));
    bizMemberRoleSelect = element(by.css('select#field_bizMemberRole'));

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

    setCompanyNameInput = function(companyName) {
        this.companyNameInput.sendKeys(companyName);
    };

    getCompanyNameInput = function() {
        return this.companyNameInput.getAttribute('value');
    };

    setWebsiteInput = function(website) {
        this.websiteInput.sendKeys(website);
    };

    getWebsiteInput = function() {
        return this.websiteInput.getAttribute('value');
    };

    setHqAddressInput = function(hqAddress) {
        this.hqAddressInput.sendKeys(hqAddress);
    };

    getHqAddressInput = function() {
        return this.hqAddressInput.getAttribute('value');
    };

    setCompanyBioInput = function(companyBio) {
        this.companyBioInput.sendKeys(companyBio);
    };

    getCompanyBioInput = function() {
        return this.companyBioInput.getAttribute('value');
    };

    setContractTemplateInput = function(contractTemplate) {
        this.contractTemplateInput.sendKeys(contractTemplate);
    };

    getContractTemplateInput = function() {
        return this.contractTemplateInput.getAttribute('value');
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

    companySizeSelectLastOption = function() {
        this.companySizeSelect.all(by.tagName('option')).last().click();
    };

    companySizeSelectOption = function(option) {
        this.companySizeSelect.sendKeys(option);
    };

    getCompanySizeSelect = function() {
        return this.companySizeSelect;
    };

    getCompanySizeSelectedOption = function() {
        return this.companySizeSelect.element(by.css('option:checked')).getText();
    };

    industrySelectLastOption = function() {
        this.industrySelect.all(by.tagName('option')).last().click();
    };

    industrySelectOption = function(option) {
        this.industrySelect.sendKeys(option);
    };

    getIndustrySelect = function() {
        return this.industrySelect;
    };

    getIndustrySelectedOption = function() {
        return this.industrySelect.element(by.css('option:checked')).getText();
    };

    bizMemberRoleSelectLastOption = function() {
        this.bizMemberRoleSelect.all(by.tagName('option')).last().click();
    };

    bizMemberRoleSelectOption = function(option) {
        this.bizMemberRoleSelect.sendKeys(option);
    };

    getBizMemberRoleSelect = function() {
        return this.bizMemberRoleSelect;
    };

    getBizMemberRoleSelectedOption = function() {
        return this.bizMemberRoleSelect.element(by.css('option:checked')).getText();
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
