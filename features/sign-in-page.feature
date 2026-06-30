@sign-in
Feature: Sign In Page
  Scenario: Register new user
    Given I am on the ParaBank sign-in page
    When I register using data from "register-kavya.json"
    Then the account should be created successfully
