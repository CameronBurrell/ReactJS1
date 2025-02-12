// https://edstem.org/au/courses/9853/discussion/1135519
// tutor on forum said this was ok only for this file
/* eslint-disable no-undef */

/// <reference types='cypress' />
describe('Leave A Review', () => {
  const email = 'zzz' + Math.floor(Math.random() * 99999) + '@email.com';
  const password = 'megaPassword' + Math.floor(Math.random() * 99999);
  const name = 'name' + Math.floor(Math.random() * 99999);

  it('Registers successfully', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(2000);
    cy.get('#registerTesting').click();
    cy.wait(1000);
    cy.get('#regEmailTesting').focus().type(email);
    cy.get('#regPasswordTesting').focus().type(password);
    cy.get('#regConfirmPasswordTesting').focus().type(password);
    cy.get('#regNameTesting').focus().type(name);
    cy.wait(1000);
    cy.get('#regButtonSubmit').click();
  });

  it('Creates a new listing successfully', () => {
    cy.visit('http://localhost:3000/');
    const info = '123' + Math.floor(Math.random() * 99999);
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
    cy.get('#HostedListingTesting').click();
    cy.wait(3000);
    cy.get('#openListingModalTest').click();
    cy.wait(1000);
    cy.get('#titleTestCreate').focus().type(info);
    cy.get('#addressTestStreet').focus().type(info);
    cy.get('#addressTestCity ').focus().type(info);
    cy.get('#addressTestState').focus().type(info);
    cy.get('#addressTestPostcode').focus().type(info);
    cy.get('#addressTestCountry').focus().type(info);
    cy.get('#priceTestCreate').focus().type('123');
    cy.get('#typeTestCreate').focus('house').type(info);
    cy.get('#bedroomTestAddButtonCreate').click();
    cy.get('#bedroomTestCreate').focus().type('2');
    cy.get('#bathroomTestCreate').focus().type('3');
    cy.get('#amenitiesTestAddButtonCreate').click();
    cy.get('#amentiyTestCreate').focus().type('car');
    cy.get('#youtubeVideoLinkTest').focus().type('https://www.youtube.com/watch?v=L5sw9ITJORY?autoplay=1')

    cy.wait(1000);
    cy.get('#createListingTestButton').click();
    cy.wait(3000);
  });

  it('DarkMode Movie Time', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#darkModeMovieTime').click();
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
    cy.get('#HostedListingTesting').click();
    cy.get('#HostedListingTesting').click();
    cy.wait(60000)
  });

  it('publish a listing', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
    cy.wait(1000);
    cy.get('#HostedListingTesting').click();
    cy.wait(1000);
    cy.get('#clickPublishForTest').click();
    cy.wait(1000);
    cy.get('#listingPublishedTest').click();
    cy.wait(1000);
    cy.get('#LandingPageTestingToken').click();
    cy.wait(5000);
  });

  it('delete listing', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
    cy.get('#HostedListingTesting').click();
    cy.get('#deleteListing').click();
  });

  it('listing removed from dashboard/landingpage', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
  });
});
