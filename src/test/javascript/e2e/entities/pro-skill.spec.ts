import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProSkill e2e test', () => {

    let navBarPage: NavBarPage;
    let proSkillDialogPage: ProSkillDialogPage;
    let proSkillComponentsPage: ProSkillComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProSkills', () => {
        navBarPage.goToEntity('pro-skill');
        proSkillComponentsPage = new ProSkillComponentsPage();
        expect(proSkillComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.proSkill.home.title/);

    });

    it('should load create ProSkill dialog', () => {
        proSkillComponentsPage.clickOnCreateButton();
        proSkillDialogPage = new ProSkillDialogPage();
        expect(proSkillDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.proSkill.home.createOrEditLabel/);
        proSkillDialogPage.close();
    });

    it('should create and save ProSkills', () => {
        proSkillComponentsPage.clickOnCreateButton();
        proSkillDialogPage.setStrengthInput('5');
        expect(proSkillDialogPage.getStrengthInput()).toMatch('5');
        proSkillDialogPage.setYearsOfExperienceInput('5');
        expect(proSkillDialogPage.getYearsOfExperienceInput()).toMatch('5');
        proSkillDialogPage.proSelectLastOption();
        proSkillDialogPage.skillSelectLastOption();
        proSkillDialogPage.save();
        expect(proSkillDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProSkillComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro-skill div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProSkillDialogPage {
    modalTitle = element(by.css('h4#myProSkillLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    strengthInput = element(by.css('input#field_strength'));
    yearsOfExperienceInput = element(by.css('input#field_yearsOfExperience'));
    proSelect = element(by.css('select#field_pro'));
    skillSelect = element(by.css('select#field_skill'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStrengthInput = function(strength) {
        this.strengthInput.sendKeys(strength);
    };

    getStrengthInput = function() {
        return this.strengthInput.getAttribute('value');
    };

    setYearsOfExperienceInput = function(yearsOfExperience) {
        this.yearsOfExperienceInput.sendKeys(yearsOfExperience);
    };

    getYearsOfExperienceInput = function() {
        return this.yearsOfExperienceInput.getAttribute('value');
    };

    proSelectLastOption = function() {
        this.proSelect.all(by.tagName('option')).last().click();
    };

    proSelectOption = function(option) {
        this.proSelect.sendKeys(option);
    };

    getProSelect = function() {
        return this.proSelect;
    };

    getProSelectedOption = function() {
        return this.proSelect.element(by.css('option:checked')).getText();
    };

    skillSelectLastOption = function() {
        this.skillSelect.all(by.tagName('option')).last().click();
    };

    skillSelectOption = function(option) {
        this.skillSelect.sendKeys(option);
    };

    getSkillSelect = function() {
        return this.skillSelect;
    };

    getSkillSelectedOption = function() {
        return this.skillSelect.element(by.css('option:checked')).getText();
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
