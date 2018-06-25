import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SkillHierarchyDepth e2e test', () => {

    let navBarPage: NavBarPage;
    let skillHierarchyDepthDialogPage: SkillHierarchyDepthDialogPage;
    let skillHierarchyDepthComponentsPage: SkillHierarchyDepthComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SkillHierarchyDepths', () => {
        navBarPage.goToEntity('skill-hierarchy-depth');
        skillHierarchyDepthComponentsPage = new SkillHierarchyDepthComponentsPage();
        expect(skillHierarchyDepthComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.skillHierarchyDepth.home.title/);

    });

    it('should load create SkillHierarchyDepth dialog', () => {
        skillHierarchyDepthComponentsPage.clickOnCreateButton();
        skillHierarchyDepthDialogPage = new SkillHierarchyDepthDialogPage();
        expect(skillHierarchyDepthDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.skillHierarchyDepth.home.createOrEditLabel/);
        skillHierarchyDepthDialogPage.close();
    });

    it('should create and save SkillHierarchyDepths', () => {
        skillHierarchyDepthComponentsPage.clickOnCreateButton();
        skillHierarchyDepthDialogPage.setNameInput('name');
        expect(skillHierarchyDepthDialogPage.getNameInput()).toMatch('name');
        skillHierarchyDepthDialogPage.setDepthInput('5');
        expect(skillHierarchyDepthDialogPage.getDepthInput()).toMatch('5');
        skillHierarchyDepthDialogPage.save();
        expect(skillHierarchyDepthDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SkillHierarchyDepthComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-skill-hierarchy-depth div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SkillHierarchyDepthDialogPage {
    modalTitle = element(by.css('h4#mySkillHierarchyDepthLabel'));
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
