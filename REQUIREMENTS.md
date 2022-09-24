# Schema

![image](https://user-images.githubusercontent.com/68334383/192117891-2bbaf489-1ec4-4ada-9cf2-d5eb6953e126.png)


## API Endpoints
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


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

