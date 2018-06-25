import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('VetChangeLog e2e test', () => {

    let navBarPage: NavBarPage;
    let vetChangeLogDialogPage: VetChangeLogDialogPage;
    let vetChangeLogComponentsPage: VetChangeLogComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load VetChangeLogs', () => {
        navBarPage.goToEntity('vet-change-log');
        vetChangeLogComponentsPage = new VetChangeLogComponentsPage();
        expect(vetChangeLogComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.vetChangeLog.home.title/);

    });

    it('should load create VetChangeLog dialog', () => {
        vetChangeLogComponentsPage.clickOnCreateButton();
        vetChangeLogDialogPage = new VetChangeLogDialogPage();
        expect(vetChangeLogDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.vetChangeLog.home.createOrEditLabel/);
        vetChangeLogDialogPage.close();
    });

    it('should create and save VetChangeLogs', () => {
        vetChangeLogComponentsPage.clickOnCreateButton();
        vetChangeLogDialogPage.setCreatedDateInput(12310020012301);
        expect(vetChangeLogDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        vetChangeLogDialogPage.decisionSelectLastOption();
        vetChangeLogDialogPage.setVetterCommentInput('vetterComment');
        expect(vetChangeLogDialogPage.getVetterCommentInput()).toMatch('vetterComment');
        vetChangeLogDialogPage.applicantSelectLastOption();
        vetChangeLogDialogPage.veterSelectLastOption();
        vetChangeLogDialogPage.save();
        expect(vetChangeLogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VetChangeLogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-vet-change-log div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VetChangeLogDialogPage {
    modalTitle = element(by.css('h4#myVetChangeLogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    createdDateInput = element(by.css('input#field_createdDate'));
    decisionSelect = element(by.css('select#field_decision'));
    vetterCommentInput = element(by.css('input#field_vetterComment'));
    applicantSelect = element(by.css('select#field_applicant'));
    veterSelect = element(by.css('select#field_veter'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setDecisionSelect = function(decision) {
        this.decisionSelect.sendKeys(decision);
    };

    getDecisionSelect = function() {
        return this.decisionSelect.element(by.css('option:checked')).getText();
    };

    decisionSelectLastOption = function() {
        this.decisionSelect.all(by.tagName('option')).last().click();
    };
    setVetterCommentInput = function(vetterComment) {
        this.vetterCommentInput.sendKeys(vetterComment);
    };

    getVetterCommentInput = function() {
        return this.vetterCommentInput.getAttribute('value');
    };

    applicantSelectLastOption = function() {
        this.applicantSelect.all(by.tagName('option')).last().click();
    };

    applicantSelectOption = function(option) {
        this.applicantSelect.sendKeys(option);
    };

    getApplicantSelect = function() {
        return this.applicantSelect;
    };

    getApplicantSelectedOption = function() {
        return this.applicantSelect.element(by.css('option:checked')).getText();
    };

    veterSelectLastOption = function() {
        this.veterSelect.all(by.tagName('option')).last().click();
    };

    veterSelectOption = function(option) {
        this.veterSelect.sendKeys(option);
    };

    getVeterSelect = function() {
        return this.veterSelect;
    };

    getVeterSelectedOption = function() {
        return this.veterSelect.element(by.css('option:checked')).getText();
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
