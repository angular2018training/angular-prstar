import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PaymentTerm e2e test', () => {

    let navBarPage: NavBarPage;
    let paymentTermDialogPage: PaymentTermDialogPage;
    let paymentTermComponentsPage: PaymentTermComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PaymentTerms', () => {
        navBarPage.goToEntity('payment-term');
        paymentTermComponentsPage = new PaymentTermComponentsPage();
        expect(paymentTermComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.paymentTerm.home.title/);

    });

    it('should load create PaymentTerm dialog', () => {
        paymentTermComponentsPage.clickOnCreateButton();
        paymentTermDialogPage = new PaymentTermDialogPage();
        expect(paymentTermDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.paymentTerm.home.createOrEditLabel/);
        paymentTermDialogPage.close();
    });

    it('should create and save PaymentTerms', () => {
        paymentTermComponentsPage.clickOnCreateButton();
        paymentTermDialogPage.setNameInput('name');
        expect(paymentTermDialogPage.getNameInput()).toMatch('name');
        paymentTermDialogPage.setTermInput('5');
        expect(paymentTermDialogPage.getTermInput()).toMatch('5');
        paymentTermDialogPage.save();
        expect(paymentTermDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PaymentTermComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-payment-term div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PaymentTermDialogPage {
    modalTitle = element(by.css('h4#myPaymentTermLabel'));
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
