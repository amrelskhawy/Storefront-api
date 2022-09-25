# Storefront Backend Project

## Getting Started
<br>

1. install Necessary Modules with
```
npm run migration
``` 
2. Setup the Database
3. Add .env to your project ( At the Root Folder )
4. Add database.json file ( At the Root Folder )
5. Migrate the DATABASE run :
```
npm run migration
```
6. start the project run : 
```
npm run start
```
## Testing the project by Running:
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


## ENVIRONMENT VARIABLES FILE
```
PORT=3000
NODE_ENV=dev

POSTGRES_HOST=localhost
POSTGRES_PORT=8000
POSTGRES_DB=ecommerce
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASS=root
BCRYPT_PASSWORD=your-secret
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token
```

## Database.json config file
```
{
    "defaultEnv": {"ENV": "NODE_ENV"},
    "dev" : {
        "driver": "pg",
        "host": {"ENV": "POSTGRES_HOST"},
        "port": {"ENV": "POSTGRES_PORT"},
        "database": {"ENV": "POSTGRES_DB"},
        "user": {"ENV": "POSTGRES_USER"},
        "password": {"ENV": "POSTGRES_PASS"}
    }, "test" : {
        "driver": "pg",
        "host": {"ENV": "POSTGRES_HOST"},
        "port": {"ENV": "POSTGRES_PORT"},
        "database": {"ENV": "POSTGRES_DB_TEST"},
        "user": {"ENV": "POSTGRES_USER"},
        "password": {"ENV": "POSTGRES_PASS"}
    }
}
```
