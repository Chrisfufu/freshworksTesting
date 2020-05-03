import requests
import pytest # have to install via command "pip3 install -U pytest"
import json

import time

def test_get_all_info():
    # create your test case 1
    r = requests.get('http://localhost:8000/api/info/all/')
    assert(r.status_code == 200)

def test_get_all_foods():
    r = requests.get('http://localhost:8000/api/foods/all/')
    assert(r.status_code == 200)

def test_post_first_foods():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Apple",
        "foodType": "Food",
        "foodCalories": 100
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_second_foods():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Banana",
        "foodType": "Food",
        "foodCalories": 200.1
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_foods_foodCalories():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Banana",
        "foodType": "Food",
        "foodCalories": "abc"
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)

def test_post_foods_miss_foodType_foodCalories():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Banana",
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 500)

def test_post_foods_miss_foodCalories():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Banana",
        "foodType": "Food",
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 500)

def test_post_foods_foodType():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Banana",
        "foodType": 1,
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 500)

def test_post_foods_foodCalories2():
    url = 'http://localhost:8000/api/foods/create/'
    myobj = {
        "food": "Banana",
        "foodType": 1,
        "foodCalories": "abc"
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)

def test_get_one_foods():
    url = 'http://localhost:8000/api/foods/1/'
    r = requests.get(url)
    assert(r.status_code == 200)

def test_post_info():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "food": [
            {
                "foodId": 1
            },
            {
                "foodId": 2
            }
        ],
        "time": "2020-05-10T00:12:00-06:00",
        "location": "Edmonton",
        "numberOfDucks": 2,
        "repeatDays": 1
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_info_without_foods():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
        "location": "Edmonton",
        "numberOfDucks": 2,
        "repeatDays": 1
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_info_numberOfDucks():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
        "location": "Edmonton",
        "numberOfDucks": "2",
        "repeatDays": 1
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_info_repeatDays():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
        "location": "Edmonton",
        "numberOfDucks": 3,
        "repeatDays": "abc"
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)

def test_post_info_location():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
        "location": 2,
        "numberOfDucks": 3,
        "repeatDays": 1
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_info_only_time():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)

def test_post_info_only_time_location():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
        "location": 2,
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)

def test_post_info_without_repeatDays():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "time": "2020-05-10T00:12:00-06:00",
        "location": 2,
        "numberOfDucks": 3,
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)
