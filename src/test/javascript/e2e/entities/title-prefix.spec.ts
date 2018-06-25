import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TitlePrefix e2e test', () => {

    let navBarPage: NavBarPage;
    let titlePrefixDialogPage: TitlePrefixDialogPage;
    let titlePrefixComponentsPage: TitlePrefixComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TitlePrefixes', () => {
        navBarPage.goToEntity('title-prefix');
        titlePrefixComponentsPage = new TitlePrefixComponentsPage();
        expect(titlePrefixComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.titlePrefix.home.title/);

    });

    it('should load create TitlePrefix dialog', () => {
        titlePrefixComponentsPage.clickOnCreateButton();
        titlePrefixDialogPage = new TitlePrefixDialogPage();
        expect(titlePrefixDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.titlePrefix.home.createOrEditLabel/);
        titlePrefixDialogPage.close();
    });

    it('should create and save TitlePrefixes', () => {
        titlePrefixComponentsPage.clickOnCreateButton();
        titlePrefixDialogPage.setNameInput('name');
        expect(titlePrefixDialogPage.getNameInput()).toMatch('name');
        titlePrefixDialogPage.save();
        expect(titlePrefixDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TitlePrefixComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-title-prefix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TitlePrefixDialogPage {
    modalTitle = element(by.css('h4#myTitlePrefixLabel'));
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
