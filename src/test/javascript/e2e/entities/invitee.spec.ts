import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Invitee e2e test', () => {

    let navBarPage: NavBarPage;
    let inviteeDialogPage: InviteeDialogPage;
    let inviteeComponentsPage: InviteeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Invitees', () => {
        navBarPage.goToEntity('invitee');
        inviteeComponentsPage = new InviteeComponentsPage();
        expect(inviteeComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.invitee.home.title/);

    });

    it('should load create Invitee dialog', () => {
        inviteeComponentsPage.clickOnCreateButton();
        inviteeDialogPage = new InviteeDialogPage();
        expect(inviteeDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.invitee.home.createOrEditLabel/);
        inviteeDialogPage.close();
    });

    it('should create and save Invitees', () => {
        inviteeComponentsPage.clickOnCreateButton();
        inviteeDialogPage.setFirstNameInput('firstName');
        expect(inviteeDialogPage.getFirstNameInput()).toMatch('firstName');
        inviteeDialogPage.setLastNameInput('lastName');
        expect(inviteeDialogPage.getLastNameInput()).toMatch('lastName');
        inviteeDialogPage.setEmailInput('email');
        expect(inviteeDialogPage.getEmailInput()).toMatch('email');
        inviteeDialogPage.setPhoneInput('phone');
        expect(inviteeDialogPage.getPhoneInput()).toMatch('phone');
        inviteeDialogPage.setBriefSummaryInput('briefSummary');
        expect(inviteeDialogPage.getBriefSummaryInput()).toMatch('briefSummary');
        inviteeDialogPage.setTokenInput('token');
        expect(inviteeDialogPage.getTokenInput()).toMatch('token');
        inviteeDialogPage.inviterSelectLastOption();
        inviteeDialogPage.save();
        expect(inviteeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InviteeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-invitee div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InviteeDialogPage {
    modalTitle = element(by.css('h4#myInviteeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    phoneInput = element(by.css('input#field_phone'));
    briefSummaryInput = element(by.css('input#field_briefSummary'));
    tokenInput = element(by.css('input#field_token'));
    inviterSelect = element(by.css('select#field_inviter'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    };

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    };

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    };

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    };

    setBriefSummaryInput = function(briefSummary) {
        this.briefSummaryInput.sendKeys(briefSummary);
    };

    getBriefSummaryInput = function() {
        return this.briefSummaryInput.getAttribute('value');
    };

    setTokenInput = function(token) {
        this.tokenInput.sendKeys(token);
    };

    getTokenInput = function() {
        return this.tokenInput.getAttribute('value');
    };

    inviterSelectLastOption = function() {
        this.inviterSelect.all(by.tagName('option')).last().click();
    };

    inviterSelectOption = function(option) {
        this.inviterSelect.sendKeys(option);
    };

    getInviterSelect = function() {
        return this.inviterSelect;
    };

    getInviterSelectedOption = function() {
        return this.inviterSelect.element(by.css('option:checked')).getText();
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
