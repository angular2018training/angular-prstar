import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Bid e2e test', () => {

    let navBarPage: NavBarPage;
    let bidDialogPage: BidDialogPage;
    let bidComponentsPage: BidComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bids', () => {
        navBarPage.goToEntity('bid');
        bidComponentsPage = new BidComponentsPage();
        expect(bidComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.bid.home.title/);

    });

    it('should load create Bid dialog', () => {
        bidComponentsPage.clickOnCreateButton();
        bidDialogPage = new BidDialogPage();
        expect(bidDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.bid.home.createOrEditLabel/);
        bidDialogPage.close();
    });

    it('should create and save Bids', () => {
        bidComponentsPage.clickOnCreateButton();
        bidDialogPage.setProposalInput(absolutePath);
        bidDialogPage.setProposedPriceInput('5');
        expect(bidDialogPage.getProposedPriceInput()).toMatch('5');
        bidDialogPage.setCreatedDateInput(12310020012301);
        expect(bidDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        bidDialogPage.postSelectLastOption();
        bidDialogPage.ownerSelectLastOption();
        bidDialogPage.save();
        expect(bidDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BidComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bid div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BidDialogPage {
    modalTitle = element(by.css('h4#myBidLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    proposalInput = element(by.css('input#file_proposal'));
    proposedPriceInput = element(by.css('input#field_proposedPrice'));
    createdDateInput = element(by.css('input#field_createdDate'));
    postSelect = element(by.css('select#field_post'));
    ownerSelect = element(by.css('select#field_owner'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setProposalInput = function(proposal) {
        this.proposalInput.sendKeys(proposal);
    };

    getProposalInput = function() {
        return this.proposalInput.getAttribute('value');
    };

    setProposedPriceInput = function(proposedPrice) {
        this.proposedPriceInput.sendKeys(proposedPrice);
    };

    getProposedPriceInput = function() {
        return this.proposedPriceInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
    };

    postSelectLastOption = function() {
        this.postSelect.all(by.tagName('option')).last().click();
    };

    postSelectOption = function(option) {
        this.postSelect.sendKeys(option);
    };

    getPostSelect = function() {
        return this.postSelect;
    };

    getPostSelectedOption = function() {
        return this.postSelect.element(by.css('option:checked')).getText();
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
