import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BizMemberRole e2e test', () => {

    let navBarPage: NavBarPage;
    let bizMemberRoleDialogPage: BizMemberRoleDialogPage;
    let bizMemberRoleComponentsPage: BizMemberRoleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BizMemberRoles', () => {
        navBarPage.goToEntity('biz-member-role');
        bizMemberRoleComponentsPage = new BizMemberRoleComponentsPage();
        expect(bizMemberRoleComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.bizMemberRole.home.title/);

    });

    it('should load create BizMemberRole dialog', () => {
        bizMemberRoleComponentsPage.clickOnCreateButton();
        bizMemberRoleDialogPage = new BizMemberRoleDialogPage();
        expect(bizMemberRoleDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.bizMemberRole.home.createOrEditLabel/);
        bizMemberRoleDialogPage.close();
    });

    it('should create and save BizMemberRoles', () => {
        bizMemberRoleComponentsPage.clickOnCreateButton();
        bizMemberRoleDialogPage.setNameInput('name');
        expect(bizMemberRoleDialogPage.getNameInput()).toMatch('name');
        bizMemberRoleDialogPage.save();
        expect(bizMemberRoleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BizMemberRoleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-biz-member-role div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BizMemberRoleDialogPage {
    modalTitle = element(by.css('h4#myBizMemberRoleLabel'));
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
