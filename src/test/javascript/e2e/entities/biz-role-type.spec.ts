import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BizRoleType e2e test', () => {

    let navBarPage: NavBarPage;
    let bizRoleTypeDialogPage: BizRoleTypeDialogPage;
    let bizRoleTypeComponentsPage: BizRoleTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BizRoleTypes', () => {
        navBarPage.goToEntity('biz-role-type');
        bizRoleTypeComponentsPage = new BizRoleTypeComponentsPage();
        expect(bizRoleTypeComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.bizRoleType.home.title/);

    });

    it('should load create BizRoleType dialog', () => {
        bizRoleTypeComponentsPage.clickOnCreateButton();
        bizRoleTypeDialogPage = new BizRoleTypeDialogPage();
        expect(bizRoleTypeDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.bizRoleType.home.createOrEditLabel/);
        bizRoleTypeDialogPage.close();
    });

    it('should create and save BizRoleTypes', () => {
        bizRoleTypeComponentsPage.clickOnCreateButton();
        bizRoleTypeDialogPage.setNameInput('name');
        expect(bizRoleTypeDialogPage.getNameInput()).toMatch('name');
        bizRoleTypeDialogPage.save();
        expect(bizRoleTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BizRoleTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-biz-role-type div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BizRoleTypeDialogPage {
    modalTitle = element(by.css('h4#myBizRoleTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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
