const {When,Then,Before,After,Given, AfterAll, BeforeAll, setDefaultTimeout} = require('@cucumber/cucumber')
const {expect, assert} = require('chai');
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const { findAsync } = require('../../src/util/asyncUtil');

const appPage = 'http://localhost:3000/';
setDefaultTimeout(60 * 1000);


let driver;

BeforeAll(function() {
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments("no-sandbox", "headless"))
    .build();
});

AfterAll(function () {
    driver.quit();
});

Given('User enter the url of application', async function () {
    return await driver.get(appPage);
});

Then('User check for the title of home page', async function(){
    let title = await driver.getTitle();
    return expect(title).equal('Todo App')
})

Given('There is a text-box to write todo', async function(){
    let textbox = await driver.findElement(By.id("todo-textbox"));
    return assert.exists(textbox, "textbox is neither `null` nor `undefined`")
})

When('User writes {string} on the textbox', async function(mystr){
    let textbox = await driver.findElement(By.id("todo-textbox"));
    return textbox.sendKeys(mystr);
})

When('User clicks the add button', async function(){
    let addButton = await driver.findElement(By.id('todo-add-button'));
    return addButton.click();
})

Then('the text of the 1st todo should be {string}', async function(mystr){
    let todoItems = await driver.findElements(By.id("todo-list"));
    const isCreateSuccess = await findAsync(todoItems, async (todoItem) => {
        const todoText = await todoItem.findElement(By.id('todo-text'));
        const content = todoText && (await todoText.getText());
        const isFind = mystr === content;
        assert.equal(isFind, true);
    });
    return isCreateSuccess;
})

Given("There are already {int} todo as undone", async function(count){
    let todoItems = await driver.findElements(By.id("todo-list"));
    const isCheckedSuccess = await findAsync(todoItems, async (todoItem) => {
        const todoCheck = await todoItem.findElement(By.id('todo-checkbox'));
        const content = todoCheck && (await todoCheck.isSelected());
        assert.equal(content, false);
    });
    assert.lengthOf(todoItems, count, 'array has length of 1');
    return isCheckedSuccess;
})

When("User marks the 1st todo as done", async function(){
    let checkbox = await driver.findElement(By.id("todo-checkbox"));
    return await checkbox.click();
})

Then("The 1st todo should be marked as done", async function(){
    let todoItems = await driver.findElements(By.id("todo-list"));
    const isCheckedSuccess = await findAsync(todoItems, async (todoItem) => {
        const todoCheck = await todoItem.findElement(By.id('todo-checkbox'));
        const content = todoCheck && (await todoCheck.isSelected());
        assert.equal(content, true);
    });
    return isCheckedSuccess;
})

Given("There are already 1 todo as done", async function(){
    let todoItems = await driver.findElements(By.id("todo-list"));
    const isCheckedSuccess = await findAsync(todoItems, async (todoItem) => {
        const todoCheck = await todoItem.findElement(By.id('todo-checkbox'));
        const content = todoCheck && (await todoCheck.isSelected());
        assert.equal(content, true);
    });
    return isCheckedSuccess;
})

When("I mark the the 1st todo as undone", async function(){
    let checkbox = await driver.findElement(By.id("todo-checkbox"));
    return await checkbox.click();
})

Then("The 1st todo should be marked as undone", async function(){
    let todoItems = await driver.findElements(By.id("todo-list"));
    const isCheckedSuccess = await findAsync(todoItems, async (todoItem) => {
        const todoCheck = await todoItem.findElement(By.id('todo-checkbox'));
        const content = todoCheck && (await todoCheck.isSelected());
        assert.equal(content, false);
    });
    return isCheckedSuccess;
})

Given("There are already {int} todo", async function(count){
    let todoItems = await driver.findElements(By.id("todo-list"));
    return assert.lengthOf(todoItems, count, 'array has length of 1');
})

When("I click the delete button of 1st todo", async function(){
    let deleteButton = await driver.findElement(By.id("todo-delete-button"));
    return await deleteButton.click();
})

Then("The 1st todo {string} should be deleted", async function(mystr){
    let todoItems = await driver.findElement(By.id("todo-list"));
    return assert.notEqual(todoItems, mystr);
})