import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Interview e2e test', () => {

    let navBarPage: NavBarPage;
    let interviewDialogPage: InterviewDialogPage;
    let interviewComponentsPage: InterviewComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Interviews', () => {
        navBarPage.goToEntity('interview');
        interviewComponentsPage = new InterviewComponentsPage();
        expect(interviewComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.interview.home.title/);

    });

    it('should load create Interview dialog', () => {
        interviewComponentsPage.clickOnCreateButton();
        interviewDialogPage = new InterviewDialogPage();
        expect(interviewDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.interview.home.createOrEditLabel/);
        interviewDialogPage.close();
    });

    it('should create and save Interviews', () => {
        interviewComponentsPage.clickOnCreateButton();
        interviewDialogPage.statusSelectLastOption();
        interviewDialogPage.setNoteInput('note');
        expect(interviewDialogPage.getNoteInput()).toMatch('note');
        interviewDialogPage.save();
        expect(interviewDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InterviewComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-interview div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InterviewDialogPage {
    modalTitle = element(by.css('h4#myInterviewLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    statusSelect = element(by.css('select#field_status'));
    noteInput = element(by.css('input#field_note'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    };
    setNoteInput = function(note) {
        this.noteInput.sendKeys(note);
    };

    getNoteInput = function() {
        return this.noteInput.getAttribute('value');
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
