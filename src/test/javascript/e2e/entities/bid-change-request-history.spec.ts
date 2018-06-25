import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BidChangeRequestHistory e2e test', () => {

    let navBarPage: NavBarPage;
    let bidChangeRequestHistoryDialogPage: BidChangeRequestHistoryDialogPage;
    let bidChangeRequestHistoryComponentsPage: BidChangeRequestHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BidChangeRequestHistories', () => {
        navBarPage.goToEntity('bid-change-request-history');
        bidChangeRequestHistoryComponentsPage = new BidChangeRequestHistoryComponentsPage();
        expect(bidChangeRequestHistoryComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.bidChangeRequestHistory.home.title/);

    });

    it('should load create BidChangeRequestHistory dialog', () => {
        bidChangeRequestHistoryComponentsPage.clickOnCreateButton();
        bidChangeRequestHistoryDialogPage = new BidChangeRequestHistoryDialogPage();
        expect(bidChangeRequestHistoryDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.bidChangeRequestHistory.home.createOrEditLabel/);
        bidChangeRequestHistoryDialogPage.close();
    });

    it('should create and save BidChangeRequestHistories', () => {
        bidChangeRequestHistoryComponentsPage.clickOnCreateButton();
        bidChangeRequestHistoryDialogPage.setCommentInput('comment');
        expect(bidChangeRequestHistoryDialogPage.getCommentInput()).toMatch('comment');
        bidChangeRequestHistoryDialogPage.setCreatedDateInput(12310020012301);
        expect(bidChangeRequestHistoryDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        bidChangeRequestHistoryDialogPage.save();
        expect(bidChangeRequestHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BidChangeRequestHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bid-change-request-history div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BidChangeRequestHistoryDialogPage {
    modalTitle = element(by.css('h4#myBidChangeRequestHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    commentInput = element(by.css('input#field_comment'));
    createdDateInput = element(by.css('input#field_createdDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCommentInput = function(comment) {
        this.commentInput.sendKeys(comment);
    };

    getCommentInput = function() {
        return this.commentInput.getAttribute('value');
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
