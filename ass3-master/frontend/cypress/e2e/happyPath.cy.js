// https://edstem.org/au/courses/9853/discussion/1135519
// tutor on forum said this was ok only for this file
/* eslint-disable no-undef */

/// <reference types='cypress' />
describe('User Happy Path', () => {
  const email = 'john' + Math.floor(Math.random() * 99999) + '@email.com';
  const password = 'megaPassword' + Math.floor(Math.random() * 99999);
  const name = 'name' + Math.floor(Math.random() * 99999);

  const User2Email = 'meme' + Math.floor(Math.random() * 99999) + '@email.com';
  const User2Password = 'megaPassword' + Math.floor(Math.random() * 99999);
  const User2Name = 'GET ME OUT PLEASE!' + Math.floor(Math.random() * 99999);

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
    const info = 'zzz' + Math.floor(Math.random() * 99999);
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

    cy.wait(1000);
    cy.get('#createListingTestButton').click();
    cy.wait(3000);
  });

  it('Updates the thumbnail and title of the listing successfully', () => {
    cy.visit('http://localhost:3000/');
    const changedTitle = 'publish' + Math.floor(Math.random() * 99999);
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
    cy.get('#HostedListingTesting').click();
    cy.get('#clickEditForTest').click();
    cy.get('#list-new-listing-thumbnail').selectFile(
      './cypress/fixtures/images.jpg'
    );
    cy.get('#updateTitleTest').focus().type(changedTitle);
    cy.wait(3000);
    cy.get('#updateInfoButtonTest').click();
    cy.wait(3000);
  });

  it('Publish a listing successfully', () => {
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

  it('Unpublish a listing successfully', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
    cy.wait(1000);
    cy.get('#HostedListingTesting').click();
    cy.wait(1000);
    cy.get('#clickUnpublishForTest').click();
    cy.wait(1000);
    cy.get('#LandingPageTestingToken').click();
    cy.wait(3000);
  });

  it('Republish a listing for other user to book property listed', () => {
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

  it('Another User Logs In to make booking', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(2000);
    cy.get('#registerTesting').click();
    cy.wait(1000);
    cy.get('#regEmailTesting').focus().type(User2Email);
    cy.get('#regPasswordTesting').focus().type(User2Password);
    cy.get('#regConfirmPasswordTesting').focus().type(User2Password);
    cy.get('#regNameTesting').focus().type(User2Name);
    cy.wait(1000);
    cy.get('#regButtonSubmit').click();
  });

  it('Another User Makes Booking', () => {
    cy.visit('http://localhost:3000/');
    let value = '#bookListingTest' + 0;
    value = value.toString();
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(User2Email);
    cy.get('#passwordLoginTest').focus().type(User2Password);
    cy.get('#loginButtonTest').click();
    cy.get(value).click();
    cy.get('#makeBookingModalPopupTest').click();
    cy.get('#makeBookingTest').click();
    cy.wait(4000);
  });

  it('logout and login', () => {
    cy.get('#logoutBtnTest').click();
    cy.get('#loginTesting').click();
    cy.get('#emailLoginTest').focus().type(email);
    cy.get('#passwordLoginTest').focus().type(password);
    cy.get('#loginButtonTest').click();
  });
});
