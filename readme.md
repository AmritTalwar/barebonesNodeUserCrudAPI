Dependencies
---
Install all dependencies by running `npm install` at project route.

Endpoints 
---
 - POST /post-new-user - Post new user creds (email, username, password) as JSON
 - POST /authenticate-user - Authenticate user creds
 - GET/POST /login - Login via posting credentials or via persisted login session cookie (client side cookie)

Testing
---
To run the tests:
 1) Start dev server with `npm run start:DEV`
 2) Run `npm test` at the project route

N.B.
---
This wont work on a windows machine due to how the env vars are set in `package.json`

