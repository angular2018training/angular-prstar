import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProRequirementSkill e2e test', () => {

    let navBarPage: NavBarPage;
    let proRequirementSkillDialogPage: ProRequirementSkillDialogPage;
    let proRequirementSkillComponentsPage: ProRequirementSkillComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProRequirementSkills', () => {
        navBarPage.goToEntity('pro-requirement-skill');
        proRequirementSkillComponentsPage = new ProRequirementSkillComponentsPage();
        expect(proRequirementSkillComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.proRequirementSkill.home.title/);

    });

    it('should load create ProRequirementSkill dialog', () => {
        proRequirementSkillComponentsPage.clickOnCreateButton();
        proRequirementSkillDialogPage = new ProRequirementSkillDialogPage();
        expect(proRequirementSkillDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.proRequirementSkill.home.createOrEditLabel/);
        proRequirementSkillDialogPage.close();
    });

    it('should create and save ProRequirementSkills', () => {
        proRequirementSkillComponentsPage.clickOnCreateButton();
        proRequirementSkillDialogPage.setStrengthInput('5');
        expect(proRequirementSkillDialogPage.getStrengthInput()).toMatch('5');
        proRequirementSkillDialogPage.setYearsOfExperienceInput('5');
        expect(proRequirementSkillDialogPage.getYearsOfExperienceInput()).toMatch('5');
        proRequirementSkillDialogPage.proRequirementSelectLastOption();
        proRequirementSkillDialogPage.skillSelectLastOption();
        proRequirementSkillDialogPage.save();
        expect(proRequirementSkillDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProRequirementSkillComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro-requirement-skill div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProRequirementSkillDialogPage {
    modalTitle = element(by.css('h4#myProRequirementSkillLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    strengthInput = element(by.css('input#field_strength'));
    yearsOfExperienceInput = element(by.css('input#field_yearsOfExperience'));
    proRequirementSelect = element(by.css('select#field_proRequirement'));
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

    proRequirementSelectLastOption = function() {
        this.proRequirementSelect.all(by.tagName('option')).last().click();
    };

    proRequirementSelectOption = function(option) {
        this.proRequirementSelect.sendKeys(option);
    };

    getProRequirementSelect = function() {
        return this.proRequirementSelect;
    };

    getProRequirementSelectedOption = function() {
        return this.proRequirementSelect.element(by.css('option:checked')).getText();
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
