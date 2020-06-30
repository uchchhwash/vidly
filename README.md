
# Vidly Video Rental Application

Vidly is a videl rental application responsible for adding and managing movies and customers and most important thing the rentals and returns.
This project uses node.js express, mongoDB and the backend is currently hosted on Heroku.
#### https://vidly-rental-app.herokuapp.com/api

All backend code follows  standard javascript ES6 conventions and coding styles. All codes are written in clean and all files are structured very well.
No frontend is developed for this app, you can check the api using **curl** or  [Postman](https://www.postman.com/)
## Getting Started

### Installing Dependencies

#### Node.JS v12.16.3

Follow instructions to install the latest version of node.js for your platform in the [nodejs installation](https://nodejs.org/en/)
For any reference of the using codes search here [nodejs docs](https://nodejs.org/docs/latest-v13.x/api/)
 #### MongoDB 4.0 or Updated
#### Enviornment
You just need a required Node.js version tobe installed on your machine to run te application. 

#### Dependency Installation
There are lots of third party modules has been used from the npm library so to install them simple in your project directory write and enter the command ```npm install```  on your terminal.

#### Dev Dependencies

There are also two DevDependency for the application to perform unit and integration testing.
so for performing the written test you will need the dev dependencies to be installed.

Once you have your virtual environment setup and running, install dependencies by naviging to the root directory of this project and running:

### Database Setup
As MongoDB will automatically create the databse when you run the program if it doesnt exists. But you can create a database and change the database name in db config path. There are several config files you will find in config folder. As we will be running our application on local env we can take our db URL and set it the development config file inside config directory.
You can , create a database named **vidly**

##  Project Configuration
This project is hosted on Heroku. To run this application locally you need to configure set some enviroment variables. But as I have used the config package from npm we will not need to configure anything for test and development environment.
But if you need switch your database and want to change the SECRET Key for JWT Authentication just have a loot at the config files.

#### JWT AUTHENTICATION 
JWT Authentication has been implemented in the application with using custom middlewares to have full control of requests and responses.
### Production & local Database Configurations
Development Enviroment will take the `MONGODB_URL` from development.json and  Test Enviroment will take it from test.json
```export MONGODB_URL = 'Put Your MongoDB Database Path Here'
export NODE_ENV = development/production/test  
```
any if thing NODE_ENV will triggered the declared the application to run on that specific environment.

### Authentication Tokens
```
x-auth-token = "For Protected Routes request will have to have the token in a field on header of the request as x-auth-token"
```
User Permissions are provided in the payload of JWT Token.

### Running the server
To run this application on development server enter the command `nodemon index.js` in the project directory. This will update and return the application if any changes are made in the codes.
You can also run the application using `npm start`.

## Authentication
This project uses jsonwebtoken for authentication using custom middlewares.
RoleBase Permission is implemented User & Admin.
Click on the login button and signup. Note down the access token from the URL for further use.
##### Key Dependencies
- [express](https://www.npmjs.com/package/express)  
- [mongoose](https://www.npmjs.com/package/mongoose)  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)  
- [fawn](https://www.npmjs.com/package/fawn)  
- [config](https://www.npmjs.com/package/config)  
- [joi](https://www.npmjs.com/package/joi)  
- [moment](https://www.npmjs.com/package/moment)  
- [winston](https://www.npmjs.com/package/winston)  


## Users & Roles
**Vidly** has 2 types of users. each user has his own privileges.
-   **User**
    -   Can View All Movies
    -   Can View All Genres
    -   Can Create A Rental
    -   Can See All Rentals
    -   Can Return A Rental
    -   Can Add, Edit, View All Customers
    
-   **Admin**
    -   All Permissons of a User and…
    -   Add, Edit, Delete Movies
    -   Add, Edit, Delete Genres
    -   Can Create, View All Rentals
    -   Can Return Rentals
    -   Can Add, Edit, Delete Customers
    -   View Server Logs
    

## API Reference
### Endpoints
-   Auth
    -   /api/auth
-   Users
    -   GET /api/users
    -   GET /api/users/:id
    -   POST /api/users    
    -   DELETE /api/users
-   Genres
    -   GET /api/genres
    -   GET /api/genres/:id
    -   POST /api/genres
    -   PUT /api/genres
    -   DELETE /api/genres
-   Movies
    -   GET /api/movies
    -   GET /api/movies/:id
    -   POST /api/movies
    -   PUT /api/movies
    -   PATCH /api/movies
    -   DELETE /api/movies
-   Customers
    -   GET /api/customers
    -   GET /api/customers/:id
    -   POST /api/customers
    -   PUT /api/customers
    -   PATCH /api/customers
    -   DELETE /api/customers
-   Rentals
    -   GET /api/rentals
    -   GET /api/rentals/:id
    -   POST /api/rentals
-   Returns
    -   POST /api/returns
-   Logs
    -   GET /api/logs
### Full Documentation OF API Can Be Found Here
https://documenter.getpostman.com/view/11574085/T17CEVyR?version=latest


The API will return  error types with multiple different error messages when requests fails:

## Testing

### Testing Remote/Local server using postman

- Import the postman collection `./vidly.postman_collection.json`.
- run the postman collection to test all endpoints

Postman Collection has Development & Production Enviroment. Configure the domain url as your need.
>**From Auth Register A User To Get The The Access Token In Header Response or Make a Request With Auth Endpoint With 
The Registered Username & Password To Get The Token In Response Request. Auth Token Will Be Automatically Updated Into 
The Postman Enviroment.**

## Running the Unit Tests & Integrations Tests
To run the unit & Integrations tests just type the command `npm test` in the project directory. Make Sure To Follow The Installation and Configuration Instructions.

Then run the follwing commands to run the tests. All Tests Will Be Done On The Specified DB Configured On The Test Config File On config/test.config:

## Production Deployment
We are using Heroku for deployment.
* Install heroku in your machine.
* Login to heroku
```bash
heroku login
```
* Create an app
```bash
heroku create appname
```
* Create a database at MongoDB Atlas for free and get the connection string and set in the enviroment variable on the project settings.

* Initialize git in the project directory
```bash
git init
git remote add heroku https://git.heroku.com/appname.git
```
* Push it to heroku
```bash
git add .
git commit -am "make it better"
git push heroku master

### Author
[Uchchhwash Chakraborty](https://www.linkedin.com/in/uchchhwash)
