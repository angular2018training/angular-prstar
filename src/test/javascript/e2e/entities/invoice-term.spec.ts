import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InvoiceTerm e2e test', () => {

    let navBarPage: NavBarPage;
    let invoiceTermDialogPage: InvoiceTermDialogPage;
    let invoiceTermComponentsPage: InvoiceTermComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InvoiceTerms', () => {
        navBarPage.goToEntity('invoice-term');
        invoiceTermComponentsPage = new InvoiceTermComponentsPage();
        expect(invoiceTermComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.invoiceTerm.home.title/);

    });

    it('should load create InvoiceTerm dialog', () => {
        invoiceTermComponentsPage.clickOnCreateButton();
        invoiceTermDialogPage = new InvoiceTermDialogPage();
        expect(invoiceTermDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.invoiceTerm.home.createOrEditLabel/);
        invoiceTermDialogPage.close();
    });

    it('should create and save InvoiceTerms', () => {
        invoiceTermComponentsPage.clickOnCreateButton();
        invoiceTermDialogPage.setNameInput('name');
        expect(invoiceTermDialogPage.getNameInput()).toMatch('name');
        invoiceTermDialogPage.setTermInput('5');
        expect(invoiceTermDialogPage.getTermInput()).toMatch('5');
        invoiceTermDialogPage.save();
        expect(invoiceTermDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceTermComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-invoice-term div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceTermDialogPage {
    modalTitle = element(by.css('h4#myInvoiceTermLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    termInput = element(by.css('input#field_term'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setTermInput = function(term) {
        this.termInput.sendKeys(term);
    };

    getTermInput = function() {
        return this.termInput.getAttribute('value');
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
