import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Phone e2e test', () => {

    let navBarPage: NavBarPage;
    let phoneDialogPage: PhoneDialogPage;
    let phoneComponentsPage: PhoneComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Phones', () => {
        navBarPage.goToEntity('phone');
        phoneComponentsPage = new PhoneComponentsPage();
        expect(phoneComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.phone.home.title/);

    });

    it('should load create Phone dialog', () => {
        phoneComponentsPage.clickOnCreateButton();
        phoneDialogPage = new PhoneDialogPage();
        expect(phoneDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.phone.home.createOrEditLabel/);
        phoneDialogPage.close();
    });

    it('should create and save Phones', () => {
        phoneComponentsPage.clickOnCreateButton();
        phoneDialogPage.setNumberInput('number');
        expect(phoneDialogPage.getNumberInput()).toMatch('number');
        phoneDialogPage.typeSelectLastOption();
        phoneDialogPage.save();
        expect(phoneDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PhoneComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-phone div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PhoneDialogPage {
    modalTitle = element(by.css('h4#myPhoneLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numberInput = element(by.css('input#field_number'));
    typeSelect = element(by.css('select#field_type'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNumberInput = function(number) {
        this.numberInput.sendKeys(number);
    };

    getNumberInput = function() {
        return this.numberInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
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
