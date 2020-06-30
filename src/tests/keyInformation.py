from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webDriverFunction import *

def keyInfoTesting():
    driver = webdriver.Chrome("./chromedriver.exe")
    driver.get("http://localhost:3000/")

    keySort = driver.find_elements(By.XPATH, "//div[@class='ant-table-column-sorters-with-tooltip']")
    keySort[0].click()
    time.sleep(1)
    keySort[0].click()
    time.sleep(1)

    search = driver.find_elements(By.XPATH, "//span[@class='ant-table-filter-trigger ant-dropdown-trigger']")
    search[0].click()
    time.sleep(1)

    inputName = driver.find_elements(By.XPATH, "//input[@class='ant-input']")
    inputName[0].send_keys("Zuofu")
    time.sleep(1)

    onSearch = driver.find_elements(By.XPATH, "//span[.='Search']")
    onSearch[0].click()
    time.sleep(1)

    search[0].click()
    time.sleep(1)
    
    onReset = driver.find_elements(By.XPATH, "//span[.='Reset']")
    onReset[0].click()

    time.sleep(1)

    driver.close()


keyInfoTesting()