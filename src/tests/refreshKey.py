from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webDriverFunction import *

def refreshTesting():
    driver = webdriver.Chrome("./chromedriver.exe")
    driver.get("http://localhost:3000/")

    refresh = waitWebDriver(driver, "//li[@class='ant-menu-item'][3]/span")
    refresh.click()

    key = driver.find_element_by_id("key")
    key.send_keys("80959ae6ddb54435a2b5d344ca386648")

    submit = driver.find_elements(By.XPATH, "//button[@class='ant-btn ant-btn-primary']")
    submit[0].click()
    ok = waitWebDriver(driver, "//span[.='OK']")
    time.sleep(1)
    ok.click()
    time.sleep(2)

    driver.close()

def updateDescriptionTesting():
    driver = webdriver.Chrome("./chromedriver.exe")
    driver.get("http://localhost:3000/")

    refresh = waitWebDriver(driver, "//li[@class='ant-menu-item'][3]/span")
    refresh.click()

    key = driver.find_element_by_id("key")
    key.send_keys("80959ae6ddb54435a2b5d344ca386648")

    description = driver.find_element_by_id("description")
    description.send_keys("asdfzxcvzxcvafbadfb  asdfzbv")

    submit = waitWebDriver(driver, "//span[.='Update Description']")
    submit.click()

    ok = waitWebDriver(driver, "//span[.='OK']")
    time.sleep(1)
    ok.click()
    time.sleep(2)

    driver.close()

refreshTesting()
updateDescriptionTesting()