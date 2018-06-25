import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Post e2e test', () => {

    let navBarPage: NavBarPage;
    let postDialogPage: PostDialogPage;
    let postComponentsPage: PostComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Posts', () => {
        navBarPage.goToEntity('post');
        postComponentsPage = new PostComponentsPage();
        expect(postComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.post.home.title/);

    });

    it('should load create Post dialog', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage = new PostDialogPage();
        expect(postDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.post.home.createOrEditLabel/);
        postDialogPage.close();
    });

    it('should create and save Posts', () => {
        postComponentsPage.clickOnCreateButton();
        postDialogPage.setCreatedDateInput(12310020012301);
        expect(postDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        postDialogPage.projectSelectLastOption();
        postDialogPage.ownerSelectLastOption();
        postDialogPage.save();
        expect(postDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PostComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-post div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PostDialogPage {
    modalTitle = element(by.css('h4#myPostLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    createdDateInput = element(by.css('input#field_createdDate'));
    projectSelect = element(by.css('select#field_project'));
    ownerSelect = element(by.css('select#field_owner'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    projectSelectLastOption = function() {
        this.projectSelect.all(by.tagName('option')).last().click();
    };

    projectSelectOption = function(option) {
        this.projectSelect.sendKeys(option);
    };

    getProjectSelect = function() {
        return this.projectSelect;
    };

    getProjectSelectedOption = function() {
        return this.projectSelect.element(by.css('option:checked')).getText();
    };

    ownerSelectLastOption = function() {
        this.ownerSelect.all(by.tagName('option')).last().click();
    };

    ownerSelectOption = function(option) {
        this.ownerSelect.sendKeys(option);
    };

    getOwnerSelect = function() {
        return this.ownerSelect;
    };

    getOwnerSelectedOption = function() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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
