import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SuggestedInterviewSchedule e2e test', () => {

    let navBarPage: NavBarPage;
    let suggestedInterviewScheduleDialogPage: SuggestedInterviewScheduleDialogPage;
    let suggestedInterviewScheduleComponentsPage: SuggestedInterviewScheduleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SuggestedInterviewSchedules', () => {
        navBarPage.goToEntity('suggested-interview-schedule');
        suggestedInterviewScheduleComponentsPage = new SuggestedInterviewScheduleComponentsPage();
        expect(suggestedInterviewScheduleComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.suggestedInterviewSchedule.home.title/);

    });

    it('should load create SuggestedInterviewSchedule dialog', () => {
        suggestedInterviewScheduleComponentsPage.clickOnCreateButton();
        suggestedInterviewScheduleDialogPage = new SuggestedInterviewScheduleDialogPage();
        expect(suggestedInterviewScheduleDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.suggestedInterviewSchedule.home.createOrEditLabel/);
        suggestedInterviewScheduleDialogPage.close();
    });

    it('should create and save SuggestedInterviewSchedules', () => {
        suggestedInterviewScheduleComponentsPage.clickOnCreateButton();
        suggestedInterviewScheduleDialogPage.setInterviewDateInput(12310020012301);
        expect(suggestedInterviewScheduleDialogPage.getInterviewDateInput()).toMatch('2001-12-31T02:30');
        suggestedInterviewScheduleDialogPage.setFromTimeInput('fromTime');
        expect(suggestedInterviewScheduleDialogPage.getFromTimeInput()).toMatch('fromTime');
        suggestedInterviewScheduleDialogPage.setDurationInput('5');
        expect(suggestedInterviewScheduleDialogPage.getDurationInput()).toMatch('5');
        suggestedInterviewScheduleDialogPage.setTimezoneInput('timezone');
        expect(suggestedInterviewScheduleDialogPage.getTimezoneInput()).toMatch('timezone');
        suggestedInterviewScheduleDialogPage.setNoteInput('note');
        expect(suggestedInterviewScheduleDialogPage.getNoteInput()).toMatch('note');
        suggestedInterviewScheduleDialogPage.getProAcceptedInput().isSelected().then((selected) => {
            if (selected) {
                suggestedInterviewScheduleDialogPage.getProAcceptedInput().click();
                expect(suggestedInterviewScheduleDialogPage.getProAcceptedInput().isSelected()).toBeFalsy();
            } else {
                suggestedInterviewScheduleDialogPage.getProAcceptedInput().click();
                expect(suggestedInterviewScheduleDialogPage.getProAcceptedInput().isSelected()).toBeTruthy();
            }
        });
        suggestedInterviewScheduleDialogPage.getBizAcceptedInput().isSelected().then((selected) => {
            if (selected) {
                suggestedInterviewScheduleDialogPage.getBizAcceptedInput().click();
                expect(suggestedInterviewScheduleDialogPage.getBizAcceptedInput().isSelected()).toBeFalsy();
            } else {
                suggestedInterviewScheduleDialogPage.getBizAcceptedInput().click();
                expect(suggestedInterviewScheduleDialogPage.getBizAcceptedInput().isSelected()).toBeTruthy();
            }
        });
        suggestedInterviewScheduleDialogPage.interviewSessionSelectLastOption();
        suggestedInterviewScheduleDialogPage.save();
        expect(suggestedInterviewScheduleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SuggestedInterviewScheduleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-suggested-interview-schedule div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SuggestedInterviewScheduleDialogPage {
    modalTitle = element(by.css('h4#mySuggestedInterviewScheduleLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    interviewDateInput = element(by.css('input#field_interviewDate'));
    fromTimeInput = element(by.css('input#field_fromTime'));
    durationInput = element(by.css('input#field_duration'));
    timezoneInput = element(by.css('input#field_timezone'));
    noteInput = element(by.css('input#field_note'));
    proAcceptedInput = element(by.css('input#field_proAccepted'));
    bizAcceptedInput = element(by.css('input#field_bizAccepted'));
    interviewSessionSelect = element(by.css('select#field_interviewSession'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    setNoteInput = function(note) {
        this.noteInput.sendKeys(note);
    };

    getNoteInput = function() {
        return this.noteInput.getAttribute('value');
    };

    getProAcceptedInput = function() {
        return this.proAcceptedInput;
    };
    getBizAcceptedInput = function() {
        return this.bizAcceptedInput;
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
