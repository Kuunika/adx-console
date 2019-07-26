/// <reference types="cypress" />
describe("home page", function() {
    it("tesing home page", function() {
cy.search()
cy.get('[data-cy=migrationID]').contains('my-channel')
    })
})