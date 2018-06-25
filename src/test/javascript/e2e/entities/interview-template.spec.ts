import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InterviewTemplate e2e test', () => {

    let navBarPage: NavBarPage;
    let interviewTemplateDialogPage: InterviewTemplateDialogPage;
    let interviewTemplateComponentsPage: InterviewTemplateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InterviewTemplates', () => {
        navBarPage.goToEntity('interview-template');
        interviewTemplateComponentsPage = new InterviewTemplateComponentsPage();
        expect(interviewTemplateComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.interviewTemplate.home.title/);

    });

    it('should load create InterviewTemplate dialog', () => {
        interviewTemplateComponentsPage.clickOnCreateButton();
        interviewTemplateDialogPage = new InterviewTemplateDialogPage();
        expect(interviewTemplateDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.interviewTemplate.home.createOrEditLabel/);
        interviewTemplateDialogPage.close();
    });

    it('should create and save InterviewTemplates', () => {
        interviewTemplateComponentsPage.clickOnCreateButton();
        interviewTemplateDialogPage.setNameInput('name');
        expect(interviewTemplateDialogPage.getNameInput()).toMatch('name');
        interviewTemplateDialogPage.setInterviewTypeInput('interviewType');
        expect(interviewTemplateDialogPage.getInterviewTypeInput()).toMatch('interviewType');
        interviewTemplateDialogPage.setDurationInput('5');
        expect(interviewTemplateDialogPage.getDurationInput()).toMatch('5');
        interviewTemplateDialogPage.save();
        expect(interviewTemplateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InterviewTemplateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-interview-template div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InterviewTemplateDialogPage {
    modalTitle = element(by.css('h4#myInterviewTemplateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    interviewTypeInput = element(by.css('input#field_interviewType'));
    durationInput = element(by.css('input#field_duration'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setInterviewTypeInput = function(interviewType) {
        this.interviewTypeInput.sendKeys(interviewType);
    };

    getInterviewTypeInput = function() {
        return this.interviewTypeInput.getAttribute('value');
    };

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
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
