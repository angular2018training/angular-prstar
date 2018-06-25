import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SuggestedAnswer e2e test', () => {

    let navBarPage: NavBarPage;
    let suggestedAnswerDialogPage: SuggestedAnswerDialogPage;
    let suggestedAnswerComponentsPage: SuggestedAnswerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SuggestedAnswers', () => {
        navBarPage.goToEntity('suggested-answer');
        suggestedAnswerComponentsPage = new SuggestedAnswerComponentsPage();
        expect(suggestedAnswerComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.suggestedAnswer.home.title/);

    });

    it('should load create SuggestedAnswer dialog', () => {
        suggestedAnswerComponentsPage.clickOnCreateButton();
        suggestedAnswerDialogPage = new SuggestedAnswerDialogPage();
        expect(suggestedAnswerDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.suggestedAnswer.home.createOrEditLabel/);
        suggestedAnswerDialogPage.close();
    });

    it('should create and save SuggestedAnswers', () => {
        suggestedAnswerComponentsPage.clickOnCreateButton();
        suggestedAnswerDialogPage.setAnswerInput('answer');
        expect(suggestedAnswerDialogPage.getAnswerInput()).toMatch('answer');
        suggestedAnswerDialogPage.questionSelectLastOption();
        suggestedAnswerDialogPage.save();
        expect(suggestedAnswerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SuggestedAnswerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-suggested-answer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SuggestedAnswerDialogPage {
    modalTitle = element(by.css('h4#mySuggestedAnswerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    answerInput = element(by.css('input#field_answer'));
    questionSelect = element(by.css('select#field_question'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAnswerInput = function(answer) {
        this.answerInput.sendKeys(answer);
    };

    getAnswerInput = function() {
        return this.answerInput.getAttribute('value');
    };

    questionSelectLastOption = function() {
        this.questionSelect.all(by.tagName('option')).last().click();
    };

    questionSelectOption = function(option) {
        this.questionSelect.sendKeys(option);
    };

    getQuestionSelect = function() {
        return this.questionSelect;
    };

    getQuestionSelectedOption = function() {
        return this.questionSelect.element(by.css('option:checked')).getText();
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
