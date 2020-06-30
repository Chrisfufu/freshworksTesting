from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webDriverFunction import *

def addInfoTesting():
    driver = webdriver.Chrome("./chromedriver.exe")
    # my server
    driver.get("http://localhost:3000/")

    addFood = waitWebDriver(driver, "//li[@class='ant-menu-item'][2]/span")
    addFood.click()
    time.sleep(1)
    foodName = driver.find_element_by_id("name")
    foodName.send_keys("Key")

    foodType = driver.find_element_by_id("description")
    foodType.send_keys("key description")

    foodCalories = driver.find_element_by_id("expiryTime")
    foodCalories.send_keys("2020-06-20")
    driver.find_element_by_id("description").click()
    time.sleep(1)
    submit = driver.find_elements(By.XPATH, "//button[@class='ant-btn ant-btn-primary']")
    submit[0].click()
    ok = waitWebDriver(driver, "//button[@class='ant-btn']")
    time.sleep(1)
    ok.click()
    time.sleep(1)
    driver.close()

addInfoTesting()
