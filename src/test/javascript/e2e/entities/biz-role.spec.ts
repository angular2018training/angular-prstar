import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BizRole e2e test', () => {

    let navBarPage: NavBarPage;
    let bizRoleDialogPage: BizRoleDialogPage;
    let bizRoleComponentsPage: BizRoleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BizRoles', () => {
        navBarPage.goToEntity('biz-role');
        bizRoleComponentsPage = new BizRoleComponentsPage();
        expect(bizRoleComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.bizRole.home.title/);

    });

    it('should load create BizRole dialog', () => {
        bizRoleComponentsPage.clickOnCreateButton();
        bizRoleDialogPage = new BizRoleDialogPage();
        expect(bizRoleDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.bizRole.home.createOrEditLabel/);
        bizRoleDialogPage.close();
    });

    it('should create and save BizRoles', () => {
        bizRoleComponentsPage.clickOnCreateButton();
        bizRoleDialogPage.setLocationInput('location');
        expect(bizRoleDialogPage.getLocationInput()).toMatch('location');
        bizRoleDialogPage.bizSelectLastOption();
        bizRoleDialogPage.roleSelectLastOption();
        bizRoleDialogPage.save();
        expect(bizRoleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BizRoleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-biz-role div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BizRoleDialogPage {
    modalTitle = element(by.css('h4#myBizRoleLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    locationInput = element(by.css('input#field_location'));
    bizSelect = element(by.css('select#field_biz'));
    roleSelect = element(by.css('select#field_role'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLocationInput = function(location) {
        this.locationInput.sendKeys(location);
    };

    getLocationInput = function() {
        return this.locationInput.getAttribute('value');
    };

    bizSelectLastOption = function() {
        this.bizSelect.all(by.tagName('option')).last().click();
    };

    bizSelectOption = function(option) {
        this.bizSelect.sendKeys(option);
    };

    getBizSelect = function() {
        return this.bizSelect;
    };

    getBizSelectedOption = function() {
        return this.bizSelect.element(by.css('option:checked')).getText();
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
