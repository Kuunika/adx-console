import { type } from "os";

describe("home page", function() {
  it("tesing home page", function() {
    cy.visit("/")
      .get("input")
      .type("my-channel")
      .get("[data-test=migrationbutton]")
      .click()
      .wait(7000)
      .location().should((loc) => {
        expect(loc.pathname).to.eq('/migration')
      })
  });
});
