import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BizDelegation e2e test', () => {

    let navBarPage: NavBarPage;
    let bizDelegationDialogPage: BizDelegationDialogPage;
    let bizDelegationComponentsPage: BizDelegationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BizDelegations', () => {
        navBarPage.goToEntity('biz-delegation');
        bizDelegationComponentsPage = new BizDelegationComponentsPage();
        expect(bizDelegationComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.bizDelegation.home.title/);

    });

    it('should load create BizDelegation dialog', () => {
        bizDelegationComponentsPage.clickOnCreateButton();
        bizDelegationDialogPage = new BizDelegationDialogPage();
        expect(bizDelegationDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.bizDelegation.home.createOrEditLabel/);
        bizDelegationDialogPage.close();
    });

    it('should create and save BizDelegations', () => {
        bizDelegationComponentsPage.clickOnCreateButton();
        bizDelegationDialogPage.statusSelectLastOption();
        bizDelegationDialogPage.typeSelectLastOption();
        bizDelegationDialogPage.save();
        expect(bizDelegationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BizDelegationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-biz-delegation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BizDelegationDialogPage {
    modalTitle = element(by.css('h4#myBizDelegationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));
    typeSelect = element(by.css('select#field_type'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    };
    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };

    typeSelectOption = function(option) {
        this.typeSelect.sendKeys(option);
    };

    getTypeSelect = function() {
        return this.typeSelect;
    };

    getTypeSelectedOption = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
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
