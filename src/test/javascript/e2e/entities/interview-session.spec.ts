import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InterviewSession e2e test', () => {

    let navBarPage: NavBarPage;
    let interviewSessionDialogPage: InterviewSessionDialogPage;
    let interviewSessionComponentsPage: InterviewSessionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InterviewSessions', () => {
        navBarPage.goToEntity('interview-session');
        interviewSessionComponentsPage = new InterviewSessionComponentsPage();
        expect(interviewSessionComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.interviewSession.home.title/);

    });

    it('should load create InterviewSession dialog', () => {
        interviewSessionComponentsPage.clickOnCreateButton();
        interviewSessionDialogPage = new InterviewSessionDialogPage();
        expect(interviewSessionDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.interviewSession.home.createOrEditLabel/);
        interviewSessionDialogPage.close();
    });

    it('should create and save InterviewSessions', () => {
        interviewSessionComponentsPage.clickOnCreateButton();
        interviewSessionDialogPage.setInterviewTypeInput('interviewType');
        expect(interviewSessionDialogPage.getInterviewTypeInput()).toMatch('interviewType');
        interviewSessionDialogPage.setInterviewDateInput(12310020012301);
        expect(interviewSessionDialogPage.getInterviewDateInput()).toMatch('2001-12-31T02:30');
        interviewSessionDialogPage.setFromTimeInput('fromTime');
        expect(interviewSessionDialogPage.getFromTimeInput()).toMatch('fromTime');
        interviewSessionDialogPage.setDurationInput('5');
        expect(interviewSessionDialogPage.getDurationInput()).toMatch('5');
        interviewSessionDialogPage.setTimezoneInput('timezone');
        expect(interviewSessionDialogPage.getTimezoneInput()).toMatch('timezone');
        interviewSessionDialogPage.decisionSelectLastOption();
        interviewSessionDialogPage.setNoteInput('note');
        expect(interviewSessionDialogPage.getNoteInput()).toMatch('note');
        interviewSessionDialogPage.interviewSelectLastOption();
        interviewSessionDialogPage.save();
        expect(interviewSessionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InterviewSessionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-interview-session div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InterviewSessionDialogPage {
    modalTitle = element(by.css('h4#myInterviewSessionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    interviewTypeInput = element(by.css('input#field_interviewType'));
    interviewDateInput = element(by.css('input#field_interviewDate'));
    fromTimeInput = element(by.css('input#field_fromTime'));
    durationInput = element(by.css('input#field_duration'));
    timezoneInput = element(by.css('input#field_timezone'));
    decisionSelect = element(by.css('select#field_decision'));
    noteInput = element(by.css('input#field_note'));
    interviewSelect = element(by.css('select#field_interview'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setInterviewTypeInput = function(interviewType) {
        this.interviewTypeInput.sendKeys(interviewType);
    };

    getInterviewTypeInput = function() {
        return this.interviewTypeInput.getAttribute('value');
    };

    setInterviewDateInput = function(interviewDate) {
        this.interviewDateInput.sendKeys(interviewDate);
    };

    getInterviewDateInput = function() {
        return this.interviewDateInput.getAttribute('value');
    };

    setFromTimeInput = function(fromTime) {
        this.fromTimeInput.sendKeys(fromTime);
    };

    getFromTimeInput = function() {
        return this.fromTimeInput.getAttribute('value');
    };

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    };

    setTimezoneInput = function(timezone) {
        this.timezoneInput.sendKeys(timezone);
    };

    getTimezoneInput = function() {
        return this.timezoneInput.getAttribute('value');
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
    setNoteInput = function(note) {
        this.noteInput.sendKeys(note);
    };

    getNoteInput = function() {
        return this.noteInput.getAttribute('value');
    };

    interviewSelectLastOption = function() {
        this.interviewSelect.all(by.tagName('option')).last().click();
    };

    interviewSelectOption = function(option) {
        this.interviewSelect.sendKeys(option);
    };

    getInterviewSelect = function() {
        return this.interviewSelect;
    };

    getInterviewSelectedOption = function() {
        return this.interviewSelect.element(by.css('option:checked')).getText();
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
