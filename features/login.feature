@login
Feature: Login
  Scenario: Login with valid credentials
    Given I am on the ParaBank sign-in page
    When I login using data from "login-kavya.json"
    Then I should be logged in successfully
