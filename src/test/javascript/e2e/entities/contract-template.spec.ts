import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ContractTemplate e2e test', () => {

    let navBarPage: NavBarPage;
    let contractTemplateDialogPage: ContractTemplateDialogPage;
    let contractTemplateComponentsPage: ContractTemplateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ContractTemplates', () => {
        navBarPage.goToEntity('contract-template');
        contractTemplateComponentsPage = new ContractTemplateComponentsPage();
        expect(contractTemplateComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.contractTemplate.home.title/);

    });

    it('should load create ContractTemplate dialog', () => {
        contractTemplateComponentsPage.clickOnCreateButton();
        contractTemplateDialogPage = new ContractTemplateDialogPage();
        expect(contractTemplateDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.contractTemplate.home.createOrEditLabel/);
        contractTemplateDialogPage.close();
    });

    it('should create and save ContractTemplates', () => {
        contractTemplateComponentsPage.clickOnCreateButton();
        contractTemplateDialogPage.setNameInput(12310020012301);
        expect(contractTemplateDialogPage.getNameInput()).toMatch('2001-12-31T02:30');
        contractTemplateDialogPage.setCreatedDateInput(12310020012301);
        expect(contractTemplateDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        contractTemplateDialogPage.save();
        expect(contractTemplateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContractTemplateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contract-template div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContractTemplateDialogPage {
    modalTitle = element(by.css('h4#myContractTemplateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    createdDateInput = element(by.css('input#field_createdDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
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
