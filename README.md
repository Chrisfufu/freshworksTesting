# freshworksTesting

Created with React + Redux, Django + Django Rest Framework.  


### Website on server: http://199.116.235.230:3000/

### User Manual
1. https://github.com/Chrisfufu/freshworksTesting/wiki/User-Manual    

### To start the BackEnd locally:  
1. docker-compose up -d --build   

### To start the FrontEnd locally:  
1. npm install   
2. npm start  

### How to run the system on server:  
1. npm run build   
2. serve -s build -l 3000 &   
3. docker-compose up -d --build  


# Approach Ideas
1. This problem is using one table in the PostgreSQL database.
2. In the system, there are two tabs:
  - View all information: http://199.116.235.230:3000/
  - Adding info: http://199.116.235.230:3000/addInfo  
  - Refresh Keys/ Updating Description: http://199.116.235.230:3000/refreshInfo  
3. How to use the system:
  - The user needs to add the Key info object to the system first, by using this link: http://199.116.235.230:3000/addInfo  
  - After adding fokey info into the database, then click on the first tab or go to http://199.116.235.230:3000/, the user could view all data in a table, with sorting and searching options.
  - The third tab should allow an user to extend the key's expiry time, and update description. There are two buttons to submit different actions. 
        - Extend 24 Hours: this button only allows user to extend the key's expiry time if the user input the correct key.
        - Update Descriptions: this button allows user to update the description, but not extend the expiry time.
        - Reset: this button allows user to clear the form. 
4. ### Automatically Deployment:
  - Now, every time we push a change to the master branch, it will automatically deploy to the server by using GitHub Actions.  
  - Deploy backend GitHub Action will finish the workflow.
  - Deploy frontend github actions will cancel at 4 minutes because after "serve -s build -n -l 3000 &", the GitHub action will not move forward. Then we need to have a timeout-minutes = 4, because in 4 minutes, the automatic deployment would be finished.
5. GitHub Actions also have pytests (automated tests) feature and automatically revert feature.
6. Technologies chosen: I used Django Rest Framework (python), the database is PostgreSQL, and frontend is React & Redux.
  - Django rest framework and PostgreSQL are built-in Docker containers (I set it up less than 15 minutes, just learnt it online). It is very convenient to use. Other programmers could just run one line of command, and do not need extra technology, then everything is working properly. Django Rest also provides MVC framework, as a 3-tier architecture, Django is very useful.
  - Views and Controllers are located at: https://github.com/Chrisfufu/freshworksTesting/tree/fastloop/myApp/api    
  - Models are located at: https://github.com/Chrisfufu/freshworksTesting/blob/fastloop/myApp/models.py      
  - ### backend APIs are built-in the swagger file: https://github.com/Chrisfufu/freshworksTesting/blob/fastloop/swagger.yml  
    - ### backend APIs: 
      - The following APIs are for key information:
      - To create key information: http://199.116.235.230:8000/api/info/create/
      - To view all key information: http://199.116.235.230:8000/api/info/all/
      - To update a key description: http://199.116.235.230:8000/api/update/{key}/
      - To refresh a key expiry date: http://199.116.235.230:8000/api/refresh/{key}/

  - Frontend is using React & Redux. these two technologies are very popular these days. Ant Design is also a really good User Interface. There are a few reasons I chose to use React & Redux:
    - Easy to setup
    - Redux store is a really good tool to store values in the Redux store, programmers could easy to call values in the store.  
    - React lifecycle is easy to understand, and easy to use. 
    - React could automatically handle some of the different screen sizes.   
8. ### Automated tests:   
  - ### Selenium tests:
    - https://github.com/Chrisfufu/freshworksTesting/tree/fastloop/src/tests.  
    - To run the tests, just run: python addInfo.py, then it will automatically open the chromedriver (windows version), and do the selenium tests.  
    - I am using Windows 10 for this project, so the chromedriver is also a Windows version. there are different versions to download if you are using different systems: https://chromedriver.chromium.org/downloads. I have Mac OS version downloaded in the repo.    
  - ### Pytests:  
    - https://github.com/Chrisfufu/freshworksTesting/tree/fastloop/tests  
    - For each push or merge in GitHub, these tests will automatically be tested in GitHub Actions.  

9. Roughly I took 8 hours, GitHub Actions, and all other tests, I do have experiences previously, so I used my own template, then I build everything really fast.  

10. ### To view all GitHub Actions:
   - https://github.com/Chrisfufu/freshworksTesting/tree/master/.github/workflows   
   
11. The project is launched on Cybera online services. It is free for us to use. https://www.cybera.ca/

