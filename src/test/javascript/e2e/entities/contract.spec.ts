import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contract e2e test', () => {

    let navBarPage: NavBarPage;
    let contractDialogPage: ContractDialogPage;
    let contractComponentsPage: ContractComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contracts', () => {
        navBarPage.goToEntity('contract');
        contractComponentsPage = new ContractComponentsPage();
        expect(contractComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.contract.home.title/);

    });

    it('should load create Contract dialog', () => {
        contractComponentsPage.clickOnCreateButton();
        contractDialogPage = new ContractDialogPage();
        expect(contractDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.contract.home.createOrEditLabel/);
        contractDialogPage.close();
    });

    it('should create and save Contracts', () => {
        contractComponentsPage.clickOnCreateButton();
        contractDialogPage.setNameInput('name');
        expect(contractDialogPage.getNameInput()).toMatch('name');
        contractDialogPage.setNoteInput('note');
        expect(contractDialogPage.getNoteInput()).toMatch('note');
        contractDialogPage.setCreatedDateInput(12310020012301);
        expect(contractDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        contractDialogPage.bizStatusSelectLastOption();
        contractDialogPage.proStatusSelectLastOption();
        contractDialogPage.save();
        expect(contractDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContractComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contract div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContractDialogPage {
    modalTitle = element(by.css('h4#myContractLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    noteInput = element(by.css('input#field_note'));
    createdDateInput = element(by.css('input#field_createdDate'));
    bizStatusSelect = element(by.css('select#field_bizStatus'));
    proStatusSelect = element(by.css('select#field_proStatus'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setNoteInput = function(note) {
        this.noteInput.sendKeys(note);
    };

    getNoteInput = function() {
        return this.noteInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setBizStatusSelect = function(bizStatus) {
        this.bizStatusSelect.sendKeys(bizStatus);
    };

    getBizStatusSelect = function() {
        return this.bizStatusSelect.element(by.css('option:checked')).getText();
    };

    bizStatusSelectLastOption = function() {
        this.bizStatusSelect.all(by.tagName('option')).last().click();
    };
    setProStatusSelect = function(proStatus) {
        this.proStatusSelect.sendKeys(proStatus);
    };

    getProStatusSelect = function() {
        return this.proStatusSelect.element(by.css('option:checked')).getText();
    };

    proStatusSelectLastOption = function() {
        this.proStatusSelect.all(by.tagName('option')).last().click();
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
