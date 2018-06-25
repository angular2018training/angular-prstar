import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('MatchReport e2e test', () => {

    let navBarPage: NavBarPage;
    let matchReportDialogPage: MatchReportDialogPage;
    let matchReportComponentsPage: MatchReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MatchReports', () => {
        navBarPage.goToEntity('match-report');
        matchReportComponentsPage = new MatchReportComponentsPage();
        expect(matchReportComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.matchReport.home.title/);

    });

    it('should load create MatchReport dialog', () => {
        matchReportComponentsPage.clickOnCreateButton();
        matchReportDialogPage = new MatchReportDialogPage();
        expect(matchReportDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.matchReport.home.createOrEditLabel/);
        matchReportDialogPage.close();
    });

    it('should create and save MatchReports', () => {
        matchReportComponentsPage.clickOnCreateButton();
        matchReportDialogPage.save();
        expect(matchReportDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MatchReportComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-match-report div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MatchReportDialogPage {
    modalTitle = element(by.css('h4#myMatchReportLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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
