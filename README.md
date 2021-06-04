# About the project

Fetches top 10 results from api(https://api.wazirx.com/api/v2/tickers), stores them in local database and displays data on a webpage.

> The app schedules a cron job to fetch data from api(https://api.wazirx.com/api/v2/tickers) every minute and updates them in the database.

# Directory Structure

```bash
├── config (constants and configuration files)
│   ├── *.js
├── controllers (business logic)
│   ├── *.js
├── models (database models)
│   ├── *.js
├── routes (app routes)
│   ├── *.js
├── views (html files)
│   ├── *.html
├── services (extra utils i.e. fetching data from external apis)
│   ├── *.js
├── public (static files)
|   ├── css
|   |   ├── *.css
|   ├── js
|   |   ├── *.js
|   ├── img
|   |   ├── *.png/jpg/ico
├── app.js (entry point)
├── README.md
├── package.json
```

# Quick Start

## 1. Clone the git project
``` bash
git clone https://github.com/kinjal1993/QuadBAssignment.git
``` 
## 2. Navigate to the folder
``` bash
cd <folder-name>
``` 
## 3. Install dependencies
``` bash
npm install
```
## 4. Environment Variables
create `.env` file at the root directory and set following parameters
``` bash
APP_PORT = 3000
HOST = localhost
DATABASE = <db-name>
DBPORT = 3306
DBUSER = <username>
DBPASSWORD = <password>
```

> this app uses mysql as database engine. so mysql server should exist in the system.

## 5. Run the project
``` bash
npm start
```