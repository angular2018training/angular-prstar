import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CompanySize e2e test', () => {

    let navBarPage: NavBarPage;
    let companySizeDialogPage: CompanySizeDialogPage;
    let companySizeComponentsPage: CompanySizeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CompanySizes', () => {
        navBarPage.goToEntity('company-size');
        companySizeComponentsPage = new CompanySizeComponentsPage();
        expect(companySizeComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.companySize.home.title/);

    });

    it('should load create CompanySize dialog', () => {
        companySizeComponentsPage.clickOnCreateButton();
        companySizeDialogPage = new CompanySizeDialogPage();
        expect(companySizeDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.companySize.home.createOrEditLabel/);
        companySizeDialogPage.close();
    });

    it('should create and save CompanySizes', () => {
        companySizeComponentsPage.clickOnCreateButton();
        companySizeDialogPage.setSizeValueInput('sizeValue');
        expect(companySizeDialogPage.getSizeValueInput()).toMatch('sizeValue');
        companySizeDialogPage.save();
        expect(companySizeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CompanySizeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-company-size div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompanySizeDialogPage {
    modalTitle = element(by.css('h4#myCompanySizeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sizeValueInput = element(by.css('input#field_sizeValue'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSizeValueInput = function(sizeValue) {
        this.sizeValueInput.sendKeys(sizeValue);
    };

    getSizeValueInput = function() {
        return this.sizeValueInput.getAttribute('value');
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
