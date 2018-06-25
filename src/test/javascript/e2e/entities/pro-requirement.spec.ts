import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProRequirement e2e test', () => {

    let navBarPage: NavBarPage;
    let proRequirementDialogPage: ProRequirementDialogPage;
    let proRequirementComponentsPage: ProRequirementComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProRequirements', () => {
        navBarPage.goToEntity('pro-requirement');
        proRequirementComponentsPage = new ProRequirementComponentsPage();
        expect(proRequirementComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.proRequirement.home.title/);

    });

    it('should load create ProRequirement dialog', () => {
        proRequirementComponentsPage.clickOnCreateButton();
        proRequirementDialogPage = new ProRequirementDialogPage();
        expect(proRequirementDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.proRequirement.home.createOrEditLabel/);
        proRequirementDialogPage.close();
    });

    it('should create and save ProRequirements', () => {
        proRequirementComponentsPage.clickOnCreateButton();
        proRequirementDialogPage.setStartDateInput(12310020012301);
        expect(proRequirementDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        proRequirementDialogPage.setEndDateInput(12310020012301);
        expect(proRequirementDialogPage.getEndDateInput()).toMatch('2001-12-31T02:30');
        proRequirementDialogPage.setWorkLocationInput('workLocation');
        expect(proRequirementDialogPage.getWorkLocationInput()).toMatch('workLocation');
        proRequirementDialogPage.setAdditionalCommmentaryInput('additionalCommmentary');
        expect(proRequirementDialogPage.getAdditionalCommmentaryInput()).toMatch('additionalCommmentary');
        proRequirementDialogPage.projectSelectLastOption();
        proRequirementDialogPage.roleSelectLastOption();
        proRequirementDialogPage.save();
        expect(proRequirementDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProRequirementComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro-requirement div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProRequirementDialogPage {
    modalTitle = element(by.css('h4#myProRequirementLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    workLocationInput = element(by.css('input#field_workLocation'));
    additionalCommmentaryInput = element(by.css('input#field_additionalCommmentary'));
    projectSelect = element(by.css('select#field_project'));
    roleSelect = element(by.css('select#field_role'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setWorkLocationInput = function(workLocation) {
        this.workLocationInput.sendKeys(workLocation);
    };

    getWorkLocationInput = function() {
        return this.workLocationInput.getAttribute('value');
    };

    setAdditionalCommmentaryInput = function(additionalCommmentary) {
        this.additionalCommmentaryInput.sendKeys(additionalCommmentary);
    };

    getAdditionalCommmentaryInput = function() {
        return this.additionalCommmentaryInput.getAttribute('value');
    };

    projectSelectLastOption = function() {
        this.projectSelect.all(by.tagName('option')).last().click();
    };

    projectSelectOption = function(option) {
        this.projectSelect.sendKeys(option);
    };

    getProjectSelect = function() {
        return this.projectSelect;
    };

    getProjectSelectedOption = function() {
        return this.projectSelect.element(by.css('option:checked')).getText();
    };

    roleSelectLastOption = function() {
        this.roleSelect.all(by.tagName('option')).last().click();
    };

    roleSelectOption = function(option) {
        this.roleSelect.sendKeys(option);
    };

    getRoleSelect = function() {
        return this.roleSelect;
    };

    getRoleSelectedOption = function() {
        return this.roleSelect.element(by.css('option:checked')).getText();
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
