from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webDriverFunction import *

def signInTesting():
    driver = webdriver.Chrome("./chromedriver")
    driver.get("http://localhost:3000/info")

    addInfo = waitWebDriver(driver, "//li[@class='ant-menu-item'][1]/span")
    addInfo.click()

    waitWebDriverByClass_name(driver,"ant-calendar-range-picker-input").click()
    time.sleep(1)
    startTime = driver.find_elements(By.XPATH, "//td[@title='May 2, 2020']/div[text()='2']")
    startTime[0].click()
    endTime = driver.find_elements(By.XPATH, "//td[@title='May 4, 2020']/div[text()='4']")
    endTime[0].click()
    ok = driver.find_elements(By.XPATH, "//a[@class='ant-calendar-ok-btn']")
    ok[0].click()
    location = driver.find_element_by_id("infoform_location")
    location.send_keys("Edmonton")

    numberOfDucks = driver.find_element_by_id("infoform_numberOfDucks")
    numberOfDucks.send_keys("100")
    driver.find_elements(By.XPATH, "//div[@class='ant-select-selection__placeholder']")[0].click()

    select1 = driver.find_elements(By.XPATH, "//i[@class='anticon anticon-check ant-select-selected-icon']")
    select1[0].click()
    location.click()

    submit = driver.find_elements(By.XPATH, "//button[@class='ant-btn ant-btn-primary']")
    submit[0].click()
    time.sleep(1)
    ok = waitWebDriver(driver, "//button[@class='ant-btn']")
    ok.click()
    time.sleep(2)

    driver.close()

signInTesting()
