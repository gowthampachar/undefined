Feature: Login

  Background:
    Given I am on the login page

  Scenario: Login with invalid credentials shows error
    When I enter username "wronguser" and password "wrongpass"
    And I click the login button
    Then I should see an error message

  Scenario: Login using credentials from environment variables
    When I login using credentials from "env" key "invalid"
    Then I should see an error message

  Scenario: Login using credentials from JSON file
    When I login using credentials from "json" key "invalid"
    Then I should see an error message

  Scenario: Login using credentials from XML file
    When I login using credentials from "xml" key "invalid"
    Then I should see an error message
