import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Notification e2e test', () => {

    let navBarPage: NavBarPage;
    let notificationDialogPage: NotificationDialogPage;
    let notificationComponentsPage: NotificationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Notifications', () => {
        navBarPage.goToEntity('notification');
        notificationComponentsPage = new NotificationComponentsPage();
        expect(notificationComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.notification.home.title/);

    });

    it('should load create Notification dialog', () => {
        notificationComponentsPage.clickOnCreateButton();
        notificationDialogPage = new NotificationDialogPage();
        expect(notificationDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.notification.home.createOrEditLabel/);
        notificationDialogPage.close();
    });

    it('should create and save Notifications', () => {
        notificationComponentsPage.clickOnCreateButton();
        notificationDialogPage.setUserIdInput('5');
        expect(notificationDialogPage.getUserIdInput()).toMatch('5');
        notificationDialogPage.setDescriptionInput('description');
        expect(notificationDialogPage.getDescriptionInput()).toMatch('description');
        notificationDialogPage.setTypeInput('5');
        expect(notificationDialogPage.getTypeInput()).toMatch('5');
        notificationDialogPage.getIsReadInput().isSelected().then((selected) => {
            if (selected) {
                notificationDialogPage.getIsReadInput().click();
                expect(notificationDialogPage.getIsReadInput().isSelected()).toBeFalsy();
            } else {
                notificationDialogPage.getIsReadInput().click();
                expect(notificationDialogPage.getIsReadInput().isSelected()).toBeTruthy();
            }
        });
        notificationDialogPage.setLinkInput('link');
        expect(notificationDialogPage.getLinkInput()).toMatch('link');
        notificationDialogPage.setCreatedDateInput(12310020012301);
        expect(notificationDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        notificationDialogPage.save();
        expect(notificationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NotificationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-notification div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NotificationDialogPage {
    modalTitle = element(by.css('h4#myNotificationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    descriptionInput = element(by.css('input#field_description'));
    typeInput = element(by.css('input#field_type'));
    isReadInput = element(by.css('input#field_isRead'));
    linkInput = element(by.css('input#field_link'));
    createdDateInput = element(by.css('input#field_createdDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    };

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    };

    getIsReadInput = function() {
        return this.isReadInput;
    };
    setLinkInput = function(link) {
        this.linkInput.sendKeys(link);
    };

    getLinkInput = function() {
        return this.linkInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
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
