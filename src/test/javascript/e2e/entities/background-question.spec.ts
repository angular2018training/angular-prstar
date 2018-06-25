import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BackgroundQuestion e2e test', () => {

    let navBarPage: NavBarPage;
    let backgroundQuestionDialogPage: BackgroundQuestionDialogPage;
    let backgroundQuestionComponentsPage: BackgroundQuestionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BackgroundQuestions', () => {
        navBarPage.goToEntity('background-question');
        backgroundQuestionComponentsPage = new BackgroundQuestionComponentsPage();
        expect(backgroundQuestionComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.backgroundQuestion.home.title/);

    });

    it('should load create BackgroundQuestion dialog', () => {
        backgroundQuestionComponentsPage.clickOnCreateButton();
        backgroundQuestionDialogPage = new BackgroundQuestionDialogPage();
        expect(backgroundQuestionDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.backgroundQuestion.home.createOrEditLabel/);
        backgroundQuestionDialogPage.close();
    });

    it('should create and save BackgroundQuestions', () => {
        backgroundQuestionComponentsPage.clickOnCreateButton();
        backgroundQuestionDialogPage.setAnswerInput('answer');
        expect(backgroundQuestionDialogPage.getAnswerInput()).toMatch('answer');
        backgroundQuestionDialogPage.proSelectLastOption();
        backgroundQuestionDialogPage.questionSelectLastOption();
        backgroundQuestionDialogPage.save();
        expect(backgroundQuestionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BackgroundQuestionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-background-question div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BackgroundQuestionDialogPage {
    modalTitle = element(by.css('h4#myBackgroundQuestionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    answerInput = element(by.css('input#field_answer'));
    proSelect = element(by.css('select#field_pro'));
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
