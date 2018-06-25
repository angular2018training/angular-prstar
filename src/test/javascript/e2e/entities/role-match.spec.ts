import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RoleMatch e2e test', () => {

    let navBarPage: NavBarPage;
    let roleMatchDialogPage: RoleMatchDialogPage;
    let roleMatchComponentsPage: RoleMatchComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RoleMatches', () => {
        navBarPage.goToEntity('role-match');
        roleMatchComponentsPage = new RoleMatchComponentsPage();
        expect(roleMatchComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.roleMatch.home.title/);

    });

    it('should load create RoleMatch dialog', () => {
        roleMatchComponentsPage.clickOnCreateButton();
        roleMatchDialogPage = new RoleMatchDialogPage();
        expect(roleMatchDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.roleMatch.home.createOrEditLabel/);
        roleMatchDialogPage.close();
    });

    it('should create and save RoleMatches', () => {
        roleMatchComponentsPage.clickOnCreateButton();
        roleMatchDialogPage.setRoleNameInput('roleName');
        expect(roleMatchDialogPage.getRoleNameInput()).toMatch('roleName');
        roleMatchDialogPage.matchReportSelectLastOption();
        roleMatchDialogPage.save();
        expect(roleMatchDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RoleMatchComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-role-match div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleMatchDialogPage {
    modalTitle = element(by.css('h4#myRoleMatchLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    roleNameInput = element(by.css('input#field_roleName'));
    matchReportSelect = element(by.css('select#field_matchReport'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRoleNameInput = function(roleName) {
        this.roleNameInput.sendKeys(roleName);
    };

    getRoleNameInput = function() {
        return this.roleNameInput.getAttribute('value');
    };

    matchReportSelectLastOption = function() {
        this.matchReportSelect.all(by.tagName('option')).last().click();
    };

    matchReportSelectOption = function(option) {
        this.matchReportSelect.sendKeys(option);
    };

    getMatchReportSelect = function() {
        return this.matchReportSelect;
    };

    getMatchReportSelectedOption = function() {
        return this.matchReportSelect.element(by.css('option:checked')).getText();
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
