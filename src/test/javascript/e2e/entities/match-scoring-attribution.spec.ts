import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('MatchScoringAttribution e2e test', () => {

    let navBarPage: NavBarPage;
    let matchScoringAttributionDialogPage: MatchScoringAttributionDialogPage;
    let matchScoringAttributionComponentsPage: MatchScoringAttributionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MatchScoringAttributions', () => {
        navBarPage.goToEntity('match-scoring-attribution');
        matchScoringAttributionComponentsPage = new MatchScoringAttributionComponentsPage();
        expect(matchScoringAttributionComponentsPage.getTitle())
            .toMatch(/prostarsWebApp.matchScoringAttribution.home.title/);

    });

    it('should load create MatchScoringAttribution dialog', () => {
        matchScoringAttributionComponentsPage.clickOnCreateButton();
        matchScoringAttributionDialogPage = new MatchScoringAttributionDialogPage();
        expect(matchScoringAttributionDialogPage.getModalTitle())
            .toMatch(/prostarsWebApp.matchScoringAttribution.home.createOrEditLabel/);
        matchScoringAttributionDialogPage.close();
    });

    it('should create and save MatchScoringAttributions', () => {
        matchScoringAttributionComponentsPage.clickOnCreateButton();
        matchScoringAttributionDialogPage.setSkillsInput('5');
        expect(matchScoringAttributionDialogPage.getSkillsInput()).toMatch('5');
        matchScoringAttributionDialogPage.setRateInput('5');
        expect(matchScoringAttributionDialogPage.getRateInput()).toMatch('5');
        matchScoringAttributionDialogPage.setRoleNameInput('5');
        expect(matchScoringAttributionDialogPage.getRoleNameInput()).toMatch('5');
        matchScoringAttributionDialogPage.setRatingInput('5');
        expect(matchScoringAttributionDialogPage.getRatingInput()).toMatch('5');
        matchScoringAttributionDialogPage.setIndustryExpertiseInput('5');
        expect(matchScoringAttributionDialogPage.getIndustryExpertiseInput()).toMatch('5');
        matchScoringAttributionDialogPage.typeSelectLastOption();
        matchScoringAttributionDialogPage.save();
        expect(matchScoringAttributionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MatchScoringAttributionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-match-scoring-attribution div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MatchScoringAttributionDialogPage {
    modalTitle = element(by.css('h4#myMatchScoringAttributionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    skillsInput = element(by.css('input#field_skills'));
    rateInput = element(by.css('input#field_rate'));
    roleNameInput = element(by.css('input#field_roleName'));
    ratingInput = element(by.css('input#field_rating'));
    industryExpertiseInput = element(by.css('input#field_industryExpertise'));
    typeSelect = element(by.css('select#field_type'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSkillsInput = function(skills) {
        this.skillsInput.sendKeys(skills);
    };

    getSkillsInput = function() {
        return this.skillsInput.getAttribute('value');
    };

    setRateInput = function(rate) {
        this.rateInput.sendKeys(rate);
    };

    getRateInput = function() {
        return this.rateInput.getAttribute('value');
    };

    setRoleNameInput = function(roleName) {
        this.roleNameInput.sendKeys(roleName);
    };

    getRoleNameInput = function() {
        return this.roleNameInput.getAttribute('value');
    };

    setRatingInput = function(rating) {
        this.ratingInput.sendKeys(rating);
    };

    getRatingInput = function() {
        return this.ratingInput.getAttribute('value');
    };

    setIndustryExpertiseInput = function(industryExpertise) {
        this.industryExpertiseInput.sendKeys(industryExpertise);
    };

    getIndustryExpertiseInput = function() {
        return this.industryExpertiseInput.getAttribute('value');
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
