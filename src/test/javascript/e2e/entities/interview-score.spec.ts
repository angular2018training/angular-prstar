import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InterviewScore e2e test', () => {

    let navBarPage: NavBarPage;
    let interviewScoreDialogPage: InterviewScoreDialogPage;
    let interviewScoreComponentsPage: InterviewScoreComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InterviewScores', () => {
        navBarPage.goToEntity('interview-score');
        interviewScoreComponentsPage = new InterviewScoreComponentsPage();
        expect(interviewScoreComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.interviewScore.home.title/);

    });

    it('should load create InterviewScore dialog', () => {
        interviewScoreComponentsPage.clickOnCreateButton();
        interviewScoreDialogPage = new InterviewScoreDialogPage();
        expect(interviewScoreDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.interviewScore.home.createOrEditLabel/);
        interviewScoreDialogPage.close();
    });

    it('should create and save InterviewScores', () => {
        interviewScoreComponentsPage.clickOnCreateButton();
        interviewScoreDialogPage.setCriteriaInput('criteria');
        expect(interviewScoreDialogPage.getCriteriaInput()).toMatch('criteria');
        interviewScoreDialogPage.setScoreInput('5');
        expect(interviewScoreDialogPage.getScoreInput()).toMatch('5');
        interviewScoreDialogPage.interviewSessionSelectLastOption();
        interviewScoreDialogPage.save();
        expect(interviewScoreDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InterviewScoreComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-interview-score div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InterviewScoreDialogPage {
    modalTitle = element(by.css('h4#myInterviewScoreLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    criteriaInput = element(by.css('input#field_criteria'));
    scoreInput = element(by.css('input#field_score'));
    interviewSessionSelect = element(by.css('select#field_interviewSession'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCriteriaInput = function(criteria) {
        this.criteriaInput.sendKeys(criteria);
    };

    getCriteriaInput = function() {
        return this.criteriaInput.getAttribute('value');
    };

    setScoreInput = function(score) {
        this.scoreInput.sendKeys(score);
    };

    getScoreInput = function() {
        return this.scoreInput.getAttribute('value');
    };

    interviewSessionSelectLastOption = function() {
        this.interviewSessionSelect.all(by.tagName('option')).last().click();
    };

    interviewSessionSelectOption = function(option) {
        this.interviewSessionSelect.sendKeys(option);
    };

    getInterviewSessionSelect = function() {
        return this.interviewSessionSelect;
    };

    getInterviewSessionSelectedOption = function() {
        return this.interviewSessionSelect.element(by.css('option:checked')).getText();
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
