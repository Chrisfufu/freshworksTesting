import requests
import pytest # have to install via command "pip3 install -U pytest"
import json

import time

def test_case1():
    # create your test case 1
    print('\n\n\nthere\n\n\n')
    r = requests.get('http://0.0.0.0:8000/api/info/all/')
    print('\n\n\n',r,'here\n\n\n')
    assert(r.status_code == 500)