@balance
Feature: Account Balance
  Scenario: Verify account balance after login
    Given I am on the ParaBank sign-in page
    When I login using data from "login-kavya.json"
    Then I verify account balance and capture screenshot
