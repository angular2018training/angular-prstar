import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DelegationType e2e test', () => {

    let navBarPage: NavBarPage;
    let delegationTypeDialogPage: DelegationTypeDialogPage;
    let delegationTypeComponentsPage: DelegationTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DelegationTypes', () => {
        navBarPage.goToEntity('delegation-type');
        delegationTypeComponentsPage = new DelegationTypeComponentsPage();
        expect(delegationTypeComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.delegationType.home.title/);

    });

    it('should load create DelegationType dialog', () => {
        delegationTypeComponentsPage.clickOnCreateButton();
        delegationTypeDialogPage = new DelegationTypeDialogPage();
        expect(delegationTypeDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.delegationType.home.createOrEditLabel/);
        delegationTypeDialogPage.close();
    });

    it('should create and save DelegationTypes', () => {
        delegationTypeComponentsPage.clickOnCreateButton();
        delegationTypeDialogPage.setUrlInput('url');
        expect(delegationTypeDialogPage.getUrlInput()).toMatch('url');
        delegationTypeDialogPage.setPriorityInput('5');
        expect(delegationTypeDialogPage.getPriorityInput()).toMatch('5');
        delegationTypeDialogPage.setNameInput('name');
        expect(delegationTypeDialogPage.getNameInput()).toMatch('name');
        delegationTypeDialogPage.save();
        expect(delegationTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DelegationTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-delegation-type div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DelegationTypeDialogPage {
    modalTitle = element(by.css('h4#myDelegationTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    urlInput = element(by.css('input#field_url'));
    priorityInput = element(by.css('input#field_priority'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUrlInput = function(url) {
        this.urlInput.sendKeys(url);
    };

    getUrlInput = function() {
        return this.urlInput.getAttribute('value');
    };

    setPriorityInput = function(priority) {
        this.priorityInput.sendKeys(priority);
    };

    getPriorityInput = function() {
        return this.priorityInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
