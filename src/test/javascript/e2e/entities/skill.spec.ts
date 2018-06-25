import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Skill e2e test', () => {

    let navBarPage: NavBarPage;
    let skillDialogPage: SkillDialogPage;
    let skillComponentsPage: SkillComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Skills', () => {
        navBarPage.goToEntity('skill');
        skillComponentsPage = new SkillComponentsPage();
        expect(skillComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.skill.home.title/);

    });

    it('should load create Skill dialog', () => {
        skillComponentsPage.clickOnCreateButton();
        skillDialogPage = new SkillDialogPage();
        expect(skillDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.skill.home.createOrEditLabel/);
        skillDialogPage.close();
    });

    it('should create and save Skills', () => {
        skillComponentsPage.clickOnCreateButton();
        skillDialogPage.setNameInput('name');
        expect(skillDialogPage.getNameInput()).toMatch('name');
        skillDialogPage.save();
        expect(skillDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SkillComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-skill div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SkillDialogPage {
    modalTitle = element(by.css('h4#mySkillLabel'));
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
