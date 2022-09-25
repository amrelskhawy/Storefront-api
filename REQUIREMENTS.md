# Schema

![image](https://user-images.githubusercontent.com/68334383/192117891-2bbaf489-1ec4-4ada-9cf2-d5eb6953e126.png)


## **API Endpoints**
#### 1. users 
   - create "/api/users" [GET]
   - index "/api/users" [POST] ( token required ) 
   - show "/api/users/:id" [GET] ( token required )
#### 2. products 
   - Index [GET]
   - Show [GET]
   - Create [POST] (token required)
#### 3. orders 
   - Current Order by user [GET] (args: user id)[token required]
   - Create [POST] (token required)


## Data Shapes
#### 1. Product
-  id
- name
- price
- [OPTIONAL] category

#### 2. User
- id
- firstName
- lastName
- password

#### 3. Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


## Database Setup
```
-- create DB to work with:
CREATE DATABASE ecommerce;
CREATE DATABASE store_test;

-- create User:
CREATE USER postgres WITH PASSWORD 'root';

-- to grant privileages
GRANT ALL PRIVILEAGES ON DATABASE 'ecommerce' TO postgres;
GRANT ALL PRIVILEAGES ON DATABASE 'store_test' TO postgres;

```


