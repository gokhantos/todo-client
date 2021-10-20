Feature: Todo

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