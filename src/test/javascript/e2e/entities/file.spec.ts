import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('File e2e test', () => {

    let navBarPage: NavBarPage;
    let fileDialogPage: FileDialogPage;
    let fileComponentsPage: FileComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Files', () => {
        navBarPage.goToEntity('file');
        fileComponentsPage = new FileComponentsPage();
        expect(fileComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.file.home.title/);

    });

    it('should load create File dialog', () => {
        fileComponentsPage.clickOnCreateButton();
        fileDialogPage = new FileDialogPage();
        expect(fileDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.file.home.createOrEditLabel/);
        fileDialogPage.close();
    });

    it('should create and save Files', () => {
        fileComponentsPage.clickOnCreateButton();
        fileDialogPage.setContentInput(absolutePath);
        fileDialogPage.bizSelectLastOption();
        fileDialogPage.typeSelectLastOption();
        fileDialogPage.save();
        expect(fileDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FileComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-file div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FileDialogPage {
    modalTitle = element(by.css('h4#myFileLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    contentInput = element(by.css('input#file_content'));
    bizSelect = element(by.css('select#field_biz'));
    typeSelect = element(by.css('select#field_type'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    };

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    };

    bizSelectLastOption = function() {
        this.bizSelect.all(by.tagName('option')).last().click();
    };

    bizSelectOption = function(option) {
        this.bizSelect.sendKeys(option);
    };

    getBizSelect = function() {
        return this.bizSelect;
    };

    getBizSelectedOption = function() {
        return this.bizSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };

    typeSelectOption = function(option) {
        this.typeSelect.sendKeys(option);
    };

    getTypeSelect = function() {
        return this.typeSelect;
    };

    getTypeSelectedOption = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
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
