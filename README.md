# Storefront Backend Project

## Getting Started

to Migrate the DATABASE run :
```
npm run migration
```
to start the project run : 
```
npm run start
```
you can test the project by Running:
```
npm run test
```

PORTS

* Local_PORT: 3000
* Database port: default (8000)

To Generate Your Token : You should route to /api/users in **POST** method , and Create Your own user then route to /api/users/auth and put your first and password in body request to get your own one . Then you can START Using the Appication
**NOTE: There are sample token to test on it at REPO**

There are three Endpoints :
1. users 
   - create "/api/users" [GET]
   - index "/api/users" [POST] ( token required ) 
   - show "/api/users/:id" [GET] ( token required )
2. products 
    - Index 
   - Show
   - Create [token required]
3. orders 
   - Current Order by user (args: user id)[token required]
