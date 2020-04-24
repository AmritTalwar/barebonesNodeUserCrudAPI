Dependencies
---
Install all dependencies by running `npm install` at project route.

Endpoints 
---
 - POST /post-new-user - Post new user creds (email, username, password) as JSON
 - POST /authenticate-user - Authenticate user creds
 - GET/POST /login - Login via posting credentials or via persisted login session cookie (client side cookie)

Database
---
This API uses a pg database to store users. This db is containerised (see `\db\docker-compose.yml`).

To setup the postgresql server (start + build tables), run `/bin/sh dbinit.sh` in `\db`.

Testing
---
To run the tests:
 1) Start dev server with `npm run start:DEV`
 2) Goto `/db` and run `/bin/sh dbinit.sh` to start the pg db container and build the necessary tables
 2) Run `npm test` at the project route

N.B.
---
This wont work on a windows machine due to how the env vars are set in `package.json`
