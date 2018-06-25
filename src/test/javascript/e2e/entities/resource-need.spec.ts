import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ResourceNeed e2e test', () => {

    let navBarPage: NavBarPage;
    let resourceNeedDialogPage: ResourceNeedDialogPage;
    let resourceNeedComponentsPage: ResourceNeedComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ResourceNeeds', () => {
        navBarPage.goToEntity('resource-need');
        resourceNeedComponentsPage = new ResourceNeedComponentsPage();
        expect(resourceNeedComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.resourceNeed.home.title/);

    });

    it('should load create ResourceNeed dialog', () => {
        resourceNeedComponentsPage.clickOnCreateButton();
        resourceNeedDialogPage = new ResourceNeedDialogPage();
        expect(resourceNeedDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.resourceNeed.home.createOrEditLabel/);
        resourceNeedDialogPage.close();
    });

    it('should create and save ResourceNeeds', () => {
        resourceNeedComponentsPage.clickOnCreateButton();
        resourceNeedDialogPage.bizSelectLastOption();
        resourceNeedDialogPage.roleSelectLastOption();
        resourceNeedDialogPage.locationSelectLastOption();
        resourceNeedDialogPage.save();
        expect(resourceNeedDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResourceNeedComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-resource-need div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ResourceNeedDialogPage {
    modalTitle = element(by.css('h4#myResourceNeedLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    bizSelect = element(by.css('select#field_biz'));
    roleSelect = element(by.css('select#field_role'));
    locationSelect = element(by.css('select#field_location'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    locationSelectLastOption = function() {
        this.locationSelect.all(by.tagName('option')).last().click();
    };

    locationSelectOption = function(option) {
        this.locationSelect.sendKeys(option);
    };

    getLocationSelect = function() {
        return this.locationSelect;
    };

    getLocationSelectedOption = function() {
        return this.locationSelect.element(by.css('option:checked')).getText();
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
