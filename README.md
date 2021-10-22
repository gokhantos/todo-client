# Getting Started with Test Driven Development by creating a React Redux Todo Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TDD

### Acceptance tests

Acceptance tests are made by using cucumber and selenium libraries.

`npm run cucumber`can run acceptance tests.

```
    Scenario: Todo App Home Page
        Given User enter the url of application
        Then User check for the title of home page

    Scenario: Create Todo
        Given There is a text-box to write todo
        When User writes "Buy milk" on the textbox
        And User clicks the add button
        Then the text of the 1st todo should be "Buy milk"

    Scenario: Mark Todo Done
        Given There are already 1 todo as undone
        When User marks the 1st todo as done
        Then The 1st todo should be marked as done

    Scenario: Mark Todo Undone
        Given There are already 1 todo as done
        When I mark the the 1st todo as undone
        Then The 1st todo should be marked as undone

    Scenario: Delete Todo
        Given There are already 1 todo
        When I click the delete button of 1st todo
        Then The 1st todo "Buy milk" should be deleted
```

### Unit and Integration tests

Integration tests are made by mocking axios library on Actions.test.js file.

Unit tests are made by mocking react redux store and rendering the app component on App.test.js file.

### Consumer Driven Contracts

Consumer driver contracts are written by PactFlow library on todo_cdc.test.js
Pact tests can be run by `npm run test`
In order to publish pacts on pactflow `npm run pact:publish`


![Image of Pact](https://github.com/gokhantos/todo-client/blob/main/pactflow.png)

### CICD Pipeline

This repo published to CircleCI to create a pipeline. Acceptance tests are not used because I couldn't handle the error that "selenium webdriver needs to be in $path" that's why just unit tests, integration tests and CDC tests run on this pipeline and returns PASS.
![Image of Pipeline](https://github.com/gokhantos/todo-client/blob/main/cicd.png)



