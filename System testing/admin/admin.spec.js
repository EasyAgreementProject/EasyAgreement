// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Default Suite', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('EditPasswordTest', async function() {
    // Test name: EditPasswordTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x650 |  | 
    await driver.manage().window().setRect(1280, 650)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | id=nome |  | 
    await driver.findElement(By.id("nome")).click()
    // 10 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 11 | click | id=inputOldPassword |  | 
    await driver.findElement(By.id("inputOldPassword")).click()
    // 12 | type | id=inputOldPassword | filip123 | 
    await driver.findElement(By.id("inputOldPassword")).sendKeys("filip123")
    // 13 | click | id=inputPassword |  | 
    await driver.findElement(By.id("inputPassword")).click()
    // 14 | type | id=inputPassword | Filippo1 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("Filippo1")
    // 15 | click | id=inputConfirmPassword |  | 
    await driver.findElement(By.id("inputConfirmPassword")).click()
    // 16 | type | id=inputConfirmPassword | Filippo1 | 
    await driver.findElement(By.id("inputConfirmPassword")).sendKeys("Filippo1")
    // 17 | click | css=.btn-secondary |  | 
    await driver.findElement(By.css(".btn-secondary")).click()
    // 18 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 19 | open | http://localhost:8080/logout |  | 
    await driver.get("http://localhost:8080/logout")
    // 20 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 21 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 22 | type | id=inputPassword | Filippo1 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("Filippo1")
    // 23 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 24 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 25 | click | id=nome |  | 
    await driver.findElement(By.id("nome")).click()
    // 26 | click | id=inputOldPassword |  | 
    await driver.findElement(By.id("inputOldPassword")).click()
    // 27 | type | id=inputOldPassword | Filippo1 | 
    await driver.findElement(By.id("inputOldPassword")).sendKeys("Filippo1")
    // 28 | click | id=inputPassword |  | 
    await driver.findElement(By.id("inputPassword")).click()
    // 29 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 30 | click | id=inputConfirmPassword |  | 
    await driver.findElement(By.id("inputConfirmPassword")).click()
    // 31 | type | id=inputConfirmPassword | filip123 | 
    await driver.findElement(By.id("inputConfirmPassword")).sendKeys("filip123")
    // 32 | click | css=.btn-secondary |  | 
    await driver.findElement(By.css(".btn-secondary")).click()
    // 33 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 34 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
  })
  it('Insert/DeleteExternalTutorTest', async function() {
    // Test name: Insert/DeleteExternalTutorTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x648 |  | 
    await driver.manage().window().setRect(1280, 648)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | css=.nav-item:nth-child(3) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(3) p")).click()
    // 10 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 11 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 12 | type | id=inputNameEx | Antonio | 
    await driver.findElement(By.id("inputNameEx")).sendKeys("Antonio")
    // 13 | click | css=.form-label-group:nth-child(3) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(3) > label")).click()
    // 14 | type | id=inputSurnameEx | Gioia | 
    await driver.findElement(By.id("inputSurnameEx")).sendKeys("Gioia")
    // 15 | click | css=.form-label-group:nth-child(4) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(4) > label")).click()
    // 16 | type | id=inputEmailEx | a.gioia@gmail.com | 
    await driver.findElement(By.id("inputEmailEx")).sendKeys("a.gioia@gmail.com")
    // 17 | click | css=.form-label-group:nth-child(5) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(5) > label")).click()
    // 18 | type | id=inputOrganizzazioneEx | Selenium | 
    await driver.findElement(By.id("inputOrganizzazioneEx")).sendKeys("Selenium")
    // 19 | click | css=.form-label-group:nth-child(6) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(6) > label")).click()
    // 20 | type | id=inputPassword | antonio1234 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("antonio1234")
    // 21 | click | css=.form-label-group:nth-child(7) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(7) > label")).click()
    // 22 | type | id=inputRePassword | antonio1234 | 
    await driver.findElement(By.id("inputRePassword")).sendKeys("antonio1234")
    // 23 | click | id=send |  | 
    await driver.findElement(By.id("send")).click()
    // 24 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 25 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 26 | mouseOver | css=.nav-item:nth-child(4) p |  | 
    {
      const element = await driver.findElement(By.css(".nav-item:nth-child(4) p"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 27 | mouseOut | css=.nav-item:nth-child(4) p |  | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 28 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 29 | select | id=tipo | label=Tutor Esterni | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Tutor Esterni']")).click()
    }
    // 30 | click | id=externalTutor |  | 
    await driver.findElement(By.id("externalTutor")).click()
    // 31 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 32 | click | css=.card:nth-child(4) #delUser |  | 
    await driver.findElement(By.css(".card:nth-child(4) #delUser")).click()
    // 33 | click | css=.swal-button--confirm |  | 
    await driver.findElement(By.css(".swal-button--confirm")).click()
    // 34 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
  })
  it('LogoutAdminTest', async function() {
    // Test name: LogoutAdminTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x648 |  | 
    await driver.manage().window().setRect(1280, 648)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | linkText=Logout |  | 
    await driver.findElement(By.linkText("Logout")).click()
    // 10 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
  })
  it('Insert/DeleteHostOrganizationTest', async function() {
    // Test name: Insert/DeleteHostOrganizationTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x649 |  | 
    await driver.manage().window().setRect(1280, 649)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | css=.nav-item:nth-child(2) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(2) p")).click()
    // 10 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 11 | type | id=inputErasmusCode | xiaomi9080 | 
    await driver.findElement(By.id("inputErasmusCode")).sendKeys("xiaomi9080")
    // 12 | click | css=.form-label-group:nth-child(3) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(3) > label")).click()
    // 13 | type | id=inputFacolta | Informatica | 
    await driver.findElement(By.id("inputFacolta")).sendKeys("Informatica")
    // 14 | click | css=.form-label-group:nth-child(4) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(4) > label")).click()
    // 15 | type | id=inputAddress | Via delle foglie 80 | 
    await driver.findElement(By.id("inputAddress")).sendKeys("Via delle foglie 80")
    // 16 | click | css=.form-label-group:nth-child(5) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(5) > label")).click()
    // 17 | type | id=inputSize | 3000 | 
    await driver.findElement(By.id("inputSize")).sendKeys("3000")
    // 18 | click | id=inlineFormCustomSelect |  | 
    await driver.findElement(By.id("inlineFormCustomSelect")).click()
    // 19 | select | id=inlineFormCustomSelect | label=Cina - Hong Kong | 
    {
      const dropdown = await driver.findElement(By.id("inlineFormCustomSelect"))
      await dropdown.findElement(By.xpath("//option[. = 'Cina - Hong Kong']")).click()
    }
    // 20 | click | css=option:nth-child(43) |  | 
    await driver.findElement(By.css("option:nth-child(43)")).click()
    // 21 | click | css=.form-label-group:nth-child(7) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(7) > label")).click()
    // 22 | type | id=inputContacts | help@xiaomi.com | 
    await driver.findElement(By.id("inputContacts")).sendKeys("help@xiaomi.com")
    // 23 | click | css=.form-label-group:nth-child(8) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(8) > label")).click()
    // 24 | type | id=inputNameT | Xiaomi | 
    await driver.findElement(By.id("inputNameT")).sendKeys("Xiaomi")
    // 25 | click | id=send |  | 
    await driver.findElement(By.id("send")).click()
    // 26 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 27 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 28 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 29 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 30 | select | id=tipo | label=Organizzazioni Ospitanti | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Organizzazioni Ospitanti']")).click()
    }
    // 31 | click | id=hostOrganization |  | 
    await driver.findElement(By.id("hostOrganization")).click()
    // 32 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 33 | click | css=.card:nth-child(6) #delUser |  | 
    await driver.findElement(By.css(".card:nth-child(6) #delUser")).click()
    // 34 | click | css=.swal-button--confirm |  | 
    await driver.findElement(By.css(".swal-button--confirm")).click()
    // 35 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
  })
  it('LoginAdminTest', async function() {
    // Test name: LoginAdminTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x648 |  | 
    await driver.manage().window().setRect(1280, 648)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
  })
  it('ViewInfoExternalTutorTest', async function() {
    // Test name: ViewInfoExternalTutorTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x650 |  | 
    await driver.manage().window().setRect(1280, 650)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 8 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 9 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 10 | select | id=tipo | label=Tutor Esterni | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Tutor Esterni']")).click()
    }
    // 11 | click | id=externalTutor |  | 
    await driver.findElement(By.id("externalTutor")).click()
    // 12 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 13 | click | css=.card:nth-child(2) form > .btn |  | 
    await driver.findElement(By.css(".card:nth-child(2) form > .btn")).click()
  })
  it('ViewInfoHostOrganizationTest', async function() {
    // Test name: ViewInfoHostOrganizationTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x650 |  | 
    await driver.manage().window().setRect(1280, 650)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 10 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 11 | select | id=tipo | label=Organizzazioni Ospitanti | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Organizzazioni Ospitanti']")).click()
    }
    // 12 | click | id=hostOrganization |  | 
    await driver.findElement(By.id("hostOrganization")).click()
    // 13 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 14 | click | css=.card:nth-child(2) form > .btn |  | 
    await driver.findElement(By.css(".card:nth-child(2) form > .btn")).click()
  })
  it('ViewListAcademicTutorTest', async function() {
    // Test name: ViewListAcademicTutorTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x650 |  | 
    await driver.manage().window().setRect(1280, 650)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 10 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 11 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 12 | select | id=tipo | label=Tutor Accademici | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Tutor Accademici']")).click()
    }
    // 13 | click | id=academicTutor |  | 
    await driver.findElement(By.id("academicTutor")).click()
    // 14 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
  })
  it('ViewListExternalTutorTest', async function() {
    // Test name: ViewListExternalTutorTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 2560x1573 |  | 
    await driver.manage().window().setRect(2560, 1573)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 5 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 6 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 7 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 8 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 9 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 10 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 11 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 12 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 13 | select | id=tipo | label=Tutor Esterni | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Tutor Esterni']")).click()
    }
    // 14 | click | id=externalTutor |  | 
    await driver.findElement(By.id("externalTutor")).click()
    // 15 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
  })
  it('ViewListHostOrganizationTest', async function() {
    // Test name: ViewListHostOrganizationTest
    // Step # | name | target | value | comment
    // 1 | open | http://localhost:8080/ |  | 
    await driver.get("http://localhost:8080/")
    // 2 | setWindowSize | 1280x814 |  | 
    await driver.manage().window().setRect(1280, 814)
    // 3 | type | id=inputUsername | f.intrieri@unisa.it | 
    await driver.findElement(By.id("inputUsername")).sendKeys("f.intrieri@unisa.it")
    // 4 | click | css=.form-label-group:nth-child(2) > label |  | 
    await driver.findElement(By.css(".form-label-group:nth-child(2) > label")).click()
    // 5 | type | id=inputPassword | filip123 | 
    await driver.findElement(By.id("inputPassword")).sendKeys("filip123")
    // 6 | click | css=.btn |  | 
    await driver.findElement(By.css(".btn")).click()
    // 7 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 8 | click | css=.swal-button |  | 
    await driver.findElement(By.css(".swal-button")).click()
    // 9 | click | css=.nav-item:nth-child(4) p |  | 
    await driver.findElement(By.css(".nav-item:nth-child(4) p")).click()
    // 10 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
    // 11 | click | id=tipo |  | 
    await driver.findElement(By.id("tipo")).click()
    // 12 | select | id=tipo | label=Organizzazioni Ospitanti | 
    {
      const dropdown = await driver.findElement(By.id("tipo"))
      await dropdown.findElement(By.xpath("//option[. = 'Organizzazioni Ospitanti']")).click()
    }
    // 13 | click | id=hostOrganization |  | 
    await driver.findElement(By.id("hostOrganization")).click()
    // 14 | runScript | window.scrollTo(0,0) |  | 
    await driver.executeScript("window.scrollTo(0,0)")
  })
})