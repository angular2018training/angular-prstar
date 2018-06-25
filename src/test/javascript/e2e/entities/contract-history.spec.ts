import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ContractHistory e2e test', () => {

    let navBarPage: NavBarPage;
    let contractHistoryDialogPage: ContractHistoryDialogPage;
    let contractHistoryComponentsPage: ContractHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ContractHistories', () => {
        navBarPage.goToEntity('contract-history');
        contractHistoryComponentsPage = new ContractHistoryComponentsPage();
        expect(contractHistoryComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.contractHistory.home.title/);

    });

    it('should load create ContractHistory dialog', () => {
        contractHistoryComponentsPage.clickOnCreateButton();
        contractHistoryDialogPage = new ContractHistoryDialogPage();
        expect(contractHistoryDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.contractHistory.home.createOrEditLabel/);
        contractHistoryDialogPage.close();
    });

    it('should create and save ContractHistories', () => {
        contractHistoryComponentsPage.clickOnCreateButton();
        contractHistoryDialogPage.setNoteInput('note');
        expect(contractHistoryDialogPage.getNoteInput()).toMatch('note');
        contractHistoryDialogPage.setCreatedDateInput(12310020012301);
        expect(contractHistoryDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        contractHistoryDialogPage.contractSelectLastOption();
        contractHistoryDialogPage.save();
        expect(contractHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContractHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contract-history div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContractHistoryDialogPage {
    modalTitle = element(by.css('h4#myContractHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    noteInput = element(by.css('input#field_note'));
    createdDateInput = element(by.css('input#field_createdDate'));
    contractSelect = element(by.css('select#field_contract'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    contractSelectLastOption = function() {
        this.contractSelect.all(by.tagName('option')).last().click();
    };

    contractSelectOption = function(option) {
        this.contractSelect.sendKeys(option);
    };

    getContractSelect = function() {
        return this.contractSelect;
    };

    getContractSelectedOption = function() {
        return this.contractSelect.element(by.css('option:checked')).getText();
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
