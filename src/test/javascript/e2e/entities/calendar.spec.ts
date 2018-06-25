import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Calendar e2e test', () => {

    let navBarPage: NavBarPage;
    let calendarDialogPage: CalendarDialogPage;
    let calendarComponentsPage: CalendarComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Calendars', () => {
        navBarPage.goToEntity('calendar');
        calendarComponentsPage = new CalendarComponentsPage();
        expect(calendarComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.calendar.home.title/);

    });

    it('should load create Calendar dialog', () => {
        calendarComponentsPage.clickOnCreateButton();
        calendarDialogPage = new CalendarDialogPage();
        expect(calendarDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.calendar.home.createOrEditLabel/);
        calendarDialogPage.close();
    });

    it('should create and save Calendars', () => {
        calendarComponentsPage.clickOnCreateButton();
        calendarDialogPage.setStartTimeInput(12310020012301);
        expect(calendarDialogPage.getStartTimeInput()).toMatch('2001-12-31T02:30');
        calendarDialogPage.setEndTimeInput(12310020012301);
        expect(calendarDialogPage.getEndTimeInput()).toMatch('2001-12-31T02:30');
        calendarDialogPage.setDescriptionInput('description');
        expect(calendarDialogPage.getDescriptionInput()).toMatch('description');
        calendarDialogPage.setTypeInput('5');
        expect(calendarDialogPage.getTypeInput()).toMatch('5');
        calendarDialogPage.save();
        expect(calendarDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CalendarComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-calendar div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CalendarDialogPage {
    modalTitle = element(by.css('h4#myCalendarLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startTimeInput = element(by.css('input#field_startTime'));
    endTimeInput = element(by.css('input#field_endTime'));
    descriptionInput = element(by.css('input#field_description'));
    typeInput = element(by.css('input#field_type'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStartTimeInput = function(startTime) {
        this.startTimeInput.sendKeys(startTime);
    };

    getStartTimeInput = function() {
        return this.startTimeInput.getAttribute('value');
    };

    setEndTimeInput = function(endTime) {
        this.endTimeInput.sendKeys(endTime);
    };

    getEndTimeInput = function() {
        return this.endTimeInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
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
