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
    # my server
    driver.get("http://localhost:3000/food")

    addFood = waitWebDriver(driver, "//li[@class='ant-menu-item'][2]/span")
    addFood.click()
    time.sleep(1)
    foodName = driver.find_element_by_id("foodform_food")
    foodName.send_keys("Apple")

    foodType = driver.find_element_by_id("foodform_foodType")
    foodType.send_keys("Fruit")

    foodCalories = driver.find_element_by_id("foodform_foodCalories")
    foodCalories.send_keys("100.3")

    time.sleep(1)
    submit = driver.find_elements(By.XPATH, "//button[@class='ant-btn ant-btn-primary']")
    submit[0].click()
    ok = waitWebDriver(driver, "//button[@class='ant-btn']")
    ok.click()
    time.sleep(1)
    # elem.send_keys(Keys.RETURN)
    driver.close()

signInTesting()
