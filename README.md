## Setup

### Set environment variables
```shell
export JWT_SECRET=qwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnm
export CLAIMS_PATH=https://hasura.io/jwt/claims
export HASURA_URL=http://hasura:8080/v1/graphql
export HASURA_ADMIN_SECRET=adminsecret
```
### Build image
```shell
docker build -t staytouch .
```
### Run
```shell
docker-compose up
```

## Testing
### Login endpoint:
```shell
curl --location 'http://localhost:8081/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username":"admin",
    "password":"admin"
}'
```
### Get users endpoint:
```shell
curl --location 'http://localhost:8081/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1Ni...CYHbDilxOaQvTIvaB3QlTTGo'
```
### Filter users by radius:
In order to filter users by radius, we should provide auth user location coordinates. These are hardcoded as this is a test project.
Radius is in km.

There are four users in DB: admin, test1, test2, test3. Admin user is located in Washington DC, test1 user is located in New York, test2 user is in Chicago and test3 user is in Los Angeles.

While logged in with admin user, if radius of 500 is provided, only test1 user should be in the response. If radius of 1000 is provided, test1 and test2 will be displayed. If radius of 4000 is provided, all three test users will be displayed.
```shell
curl --location 'http://localhost:8081/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1Ni...CYHbDilxOaQvTIvaB3QlTTGo' \
--header 'Content-Type: application/json' \
--data '{
    "lat":38.9072,
    "lng":-77.0369,
    "radius":500
}'
```

