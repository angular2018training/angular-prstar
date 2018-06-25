import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Question e2e test', () => {

    let navBarPage: NavBarPage;
    let questionDialogPage: QuestionDialogPage;
    let questionComponentsPage: QuestionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Questions', () => {
        navBarPage.goToEntity('question');
        questionComponentsPage = new QuestionComponentsPage();
        expect(questionComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.question.home.title/);

    });

    it('should load create Question dialog', () => {
        questionComponentsPage.clickOnCreateButton();
        questionDialogPage = new QuestionDialogPage();
        expect(questionDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.question.home.createOrEditLabel/);
        questionDialogPage.close();
    });

    it('should create and save Questions', () => {
        questionComponentsPage.clickOnCreateButton();
        questionDialogPage.setQuestionInput('question');
        expect(questionDialogPage.getQuestionInput()).toMatch('question');
        questionDialogPage.questionTypeSelectLastOption();
        questionDialogPage.save();
        expect(questionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuestionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-question div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuestionDialogPage {
    modalTitle = element(by.css('h4#myQuestionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    questionInput = element(by.css('input#field_question'));
    questionTypeSelect = element(by.css('select#field_questionType'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setQuestionInput = function(question) {
        this.questionInput.sendKeys(question);
    };

    getQuestionInput = function() {
        return this.questionInput.getAttribute('value');
    };

    setQuestionTypeSelect = function(questionType) {
        this.questionTypeSelect.sendKeys(questionType);
    };

    getQuestionTypeSelect = function() {
        return this.questionTypeSelect.element(by.css('option:checked')).getText();
    };

    questionTypeSelectLastOption = function() {
        this.questionTypeSelect.all(by.tagName('option')).last().click();
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
