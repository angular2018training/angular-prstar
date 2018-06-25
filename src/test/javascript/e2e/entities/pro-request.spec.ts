import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProRequest e2e test', () => {

    let navBarPage: NavBarPage;
    let proRequestDialogPage: ProRequestDialogPage;
    let proRequestComponentsPage: ProRequestComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProRequests', () => {
        navBarPage.goToEntity('pro-request');
        proRequestComponentsPage = new ProRequestComponentsPage();
        expect(proRequestComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.proRequest.home.title/);

    });

    it('should load create ProRequest dialog', () => {
        proRequestComponentsPage.clickOnCreateButton();
        proRequestDialogPage = new ProRequestDialogPage();
        expect(proRequestDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.proRequest.home.createOrEditLabel/);
        proRequestDialogPage.close();
    });

    it('should create and save ProRequests', () => {
        proRequestComponentsPage.clickOnCreateButton();
        proRequestDialogPage.setCreatedDateInput(12310020012301);
        expect(proRequestDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        proRequestDialogPage.setNumberOfProsInput('5');
        expect(proRequestDialogPage.getNumberOfProsInput()).toMatch('5');
        proRequestDialogPage.save();
        expect(proRequestDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProRequestComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pro-request div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProRequestDialogPage {
    modalTitle = element(by.css('h4#myProRequestLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    createdDateInput = element(by.css('input#field_createdDate'));
    numberOfProsInput = element(by.css('input#field_numberOfPros'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    setNumberOfProsInput = function(numberOfPros) {
        this.numberOfProsInput.sendKeys(numberOfPros);
    };

    getNumberOfProsInput = function() {
        return this.numberOfProsInput.getAttribute('value');
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
