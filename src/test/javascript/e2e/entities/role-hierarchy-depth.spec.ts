import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RoleHierarchyDepth e2e test', () => {

    let navBarPage: NavBarPage;
    let roleHierarchyDepthDialogPage: RoleHierarchyDepthDialogPage;
    let roleHierarchyDepthComponentsPage: RoleHierarchyDepthComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RoleHierarchyDepths', () => {
        navBarPage.goToEntity('role-hierarchy-depth');
        roleHierarchyDepthComponentsPage = new RoleHierarchyDepthComponentsPage();
        expect(roleHierarchyDepthComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.roleHierarchyDepth.home.title/);

    });

    it('should load create RoleHierarchyDepth dialog', () => {
        roleHierarchyDepthComponentsPage.clickOnCreateButton();
        roleHierarchyDepthDialogPage = new RoleHierarchyDepthDialogPage();
        expect(roleHierarchyDepthDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.roleHierarchyDepth.home.createOrEditLabel/);
        roleHierarchyDepthDialogPage.close();
    });

    it('should create and save RoleHierarchyDepths', () => {
        roleHierarchyDepthComponentsPage.clickOnCreateButton();
        roleHierarchyDepthDialogPage.setNameInput('name');
        expect(roleHierarchyDepthDialogPage.getNameInput()).toMatch('name');
        roleHierarchyDepthDialogPage.setDepthInput('5');
        expect(roleHierarchyDepthDialogPage.getDepthInput()).toMatch('5');
        roleHierarchyDepthDialogPage.save();
        expect(roleHierarchyDepthDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RoleHierarchyDepthComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-role-hierarchy-depth div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleHierarchyDepthDialogPage {
    modalTitle = element(by.css('h4#myRoleHierarchyDepthLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    depthInput = element(by.css('input#field_depth'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDepthInput = function(depth) {
        this.depthInput.sendKeys(depth);
    };

    getDepthInput = function() {
        return this.depthInput.getAttribute('value');
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
