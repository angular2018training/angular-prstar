import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DocumentType e2e test', () => {

    let navBarPage: NavBarPage;
    let documentTypeDialogPage: DocumentTypeDialogPage;
    let documentTypeComponentsPage: DocumentTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DocumentTypes', () => {
        navBarPage.goToEntity('document-type');
        documentTypeComponentsPage = new DocumentTypeComponentsPage();
        expect(documentTypeComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.documentType.home.title/);

    });

    it('should load create DocumentType dialog', () => {
        documentTypeComponentsPage.clickOnCreateButton();
        documentTypeDialogPage = new DocumentTypeDialogPage();
        expect(documentTypeDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.documentType.home.createOrEditLabel/);
        documentTypeDialogPage.close();
    });

    it('should create and save DocumentTypes', () => {
        documentTypeComponentsPage.clickOnCreateButton();
        documentTypeDialogPage.setNameInput('name');
        expect(documentTypeDialogPage.getNameInput()).toMatch('name');
        documentTypeDialogPage.save();
        expect(documentTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DocumentTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-document-type div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DocumentTypeDialogPage {
    modalTitle = element(by.css('h4#myDocumentTypeLabel'));
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
