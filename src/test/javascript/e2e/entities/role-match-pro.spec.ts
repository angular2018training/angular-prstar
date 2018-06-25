import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RoleMatchPro e2e test', () => {

    let navBarPage: NavBarPage;
    let roleMatchProDialogPage: RoleMatchProDialogPage;
    let roleMatchProComponentsPage: RoleMatchProComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RoleMatchPros', () => {
        navBarPage.goToEntity('role-match-pro');
        roleMatchProComponentsPage = new RoleMatchProComponentsPage();
        expect(roleMatchProComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.roleMatchPro.home.title/);

    });

    it('should load create RoleMatchPro dialog', () => {
        roleMatchProComponentsPage.clickOnCreateButton();
        roleMatchProDialogPage = new RoleMatchProDialogPage();
        expect(roleMatchProDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.roleMatchPro.home.createOrEditLabel/);
        roleMatchProDialogPage.close();
    });

    it('should create and save RoleMatchPros', () => {
        roleMatchProComponentsPage.clickOnCreateButton();
        roleMatchProDialogPage.statusSelectLastOption();
        roleMatchProDialogPage.save();
        expect(roleMatchProDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RoleMatchProComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-role-match-pro div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleMatchProDialogPage {
    modalTitle = element(by.css('h4#myRoleMatchProLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));

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
