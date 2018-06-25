import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Industry e2e test', () => {

    let navBarPage: NavBarPage;
    let industryDialogPage: IndustryDialogPage;
    let industryComponentsPage: IndustryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Industries', () => {
        navBarPage.goToEntity('industry');
        industryComponentsPage = new IndustryComponentsPage();
        expect(industryComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.industry.home.title/);

    });

    it('should load create Industry dialog', () => {
        industryComponentsPage.clickOnCreateButton();
        industryDialogPage = new IndustryDialogPage();
        expect(industryDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.industry.home.createOrEditLabel/);
        industryDialogPage.close();
    });

    it('should create and save Industries', () => {
        industryComponentsPage.clickOnCreateButton();
        industryDialogPage.setNameInput('name');
        expect(industryDialogPage.getNameInput()).toMatch('name');
        industryDialogPage.save();
        expect(industryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IndustryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-industry div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IndustryDialogPage {
    modalTitle = element(by.css('h4#myIndustryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
