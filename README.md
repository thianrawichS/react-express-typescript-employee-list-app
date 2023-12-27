# react-express-typescript-employee-list-app

## Functionality
- CRUD Operations:
  - Retrieves data from the database to display a list of employees in the React app.
  - Allows users to add new employee data (first name, last name, position, salary, age) into the database.
  - Modify employee data.
  - Remove employee data from the database.
- Search Functionality:
  - Provides a search feature allowing users to search for employees by first name.
- Pagination:
  - Implements pagination functionality to display a limited number of employees per page.
- User Authentication and Security
  - Register: Encrypts user passwords using bcrypt before storing to database.
  - Login: Authenticates users using JWT stored in localStorage and passes the token via headers for authorization.
## Pre-requisites
- Docker installed
- Docker Compose installed
- .env file with the specified content

## Getting Started
1. Clone repository:
  ```bash
  git clone https://github.com/thianrawichS/react-express-typescript-employee-list-app.git
  ```
2. Create .env:
- create `.env` file (same directory with docker-compose.yml)
- variable:
  - DB_NAME = "db_employee"
  - DB_USER = (your db username)
  - DB_PASSWORD = (your db password)
  - PORT = (your express server port)
    - ***but it will map to port:3000 in the docker-compose***
  - SALTS = (***number*** of bcrypt's salts round)
  - TOKEN_KEY = (your secret token key)
3. Go to the directory that contain `docker-compose.yml`
  ```bash
  cd <your app folder>
  ```
4. Run the app:
  ```bash
  docker-compose up --build
  ```
5. Access employee react-app:
- Open browser: http://localhost:8080 (React served by `http-server`)
