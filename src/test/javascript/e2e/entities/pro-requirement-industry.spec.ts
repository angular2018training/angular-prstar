import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProRequirementIndustry e2e test', () => {

    let navBarPage: NavBarPage;
    let proRequirementIndustryDialogPage: ProRequirementIndustryDialogPage;
    let proRequirementIndustryComponentsPage: ProRequirementIndustryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProRequirementIndustries', () => {
        navBarPage.goToEntity('pro-requirement-industry');
        proRequirementIndustryComponentsPage = new ProRequirementIndustryComponentsPage();
        expect(proRequirementIndustryComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.proRequirementIndustry.home.title/);

    });

    it('should load create ProRequirementIndustry dialog', () => {
        proRequirementIndustryComponentsPage.clickOnCreateButton();
        proRequirementIndustryDialogPage = new ProRequirementIndustryDialogPage();
        expect(proRequirementIndustryDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.proRequirementIndustry.home.createOrEditLabel/);
        proRequirementIndustryDialogPage.close();
    });

    it('should create and save ProRequirementIndustries', () => {
        proRequirementIndustryComponentsPage.clickOnCreateButton();
        proRequirementIndustryDialogPage.setYearsOfExperienceInput('5');
        expect(proRequirementIndustryDialogPage.getYearsOfExperienceInput()).toMatch('5');
        proRequirementIndustryDialogPage.proRequirementSelectLastOption();
        proRequirementIndustryDialogPage.industrySelectLastOption();
        proRequirementIndustryDialogPage.save();
        expect(proRequirementIndustryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProRequirementIndustryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro-requirement-industry div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProRequirementIndustryDialogPage {
    modalTitle = element(by.css('h4#myProRequirementIndustryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    yearsOfExperienceInput = element(by.css('input#field_yearsOfExperience'));
    proRequirementSelect = element(by.css('select#field_proRequirement'));
    industrySelect = element(by.css('select#field_industry'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    industrySelectLastOption = function() {
        this.industrySelect.all(by.tagName('option')).last().click();
    };

    industrySelectOption = function(option) {
        this.industrySelect.sendKeys(option);
    };

    getIndustrySelect = function() {
        return this.industrySelect;
    };

    getIndustrySelectedOption = function() {
        return this.industrySelect.element(by.css('option:checked')).getText();
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
