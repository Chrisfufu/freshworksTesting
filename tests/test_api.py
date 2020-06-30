import requests
import pytest # have to install via command "pip3 install -U pytest"
import json

import time

def test_get_all_info():
    # create your test case 1
    r = requests.get('http://localhost:8000/api/info/all/')
    print(r)
    assert(r.status_code == 200)

def test_post_key():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "name": "Apple",
        "description": "Food",
        "expiryTime": "2006-10-25 14:30:59"
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 201)

def test_post_key_case_1():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "name": "Apple",
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 500)

def test_post_key_case_2():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "description": "Food",
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 500)

def test_post_key_case_3():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "expiryTime": "2020-06-20"
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)

def test_post_key_case_4():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "name": "Apple",
        "description": "Food",
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 500)


def test_post_key_case_5():
    url = 'http://localhost:8000/api/info/create/'
    myobj = {
        "description": "Food",
        "expiryTime": "2020-06-20"
    }
    r = requests.post(url, data = myobj)
    assert(r.status_code == 400)
