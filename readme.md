Motivations
---
The main point of this repo is to display my journey of trying to learn backend development, from crawling to sprinting.

My idea is that i start with a very simple idea of what a CRUD api should look like using no frameworks or anything of the sort (litterally just a node http server writting to a json file), then slowly build this up as i learn about different technologies/ frameworks/ principles. Perhaps when i get sick of this backend stuff i will slap a frontend around this api.

Open to PRs/ suggestions :) 


Dependencies
---
Have docker and docker-compose installed.

Services
---
- Server: Run a nodejs server allowing CRUD operations over https. Endpoints:
    - POST /post-new-user - Post new user creds (email, username, password) as JSON
    - POST /authenticate-user - Authenticate user creds
    - GET/POST /login - Login via posting credentials or via persisted login session cookie (client side cookie)

- Postgres: Run a postgres server to store users


Start Services
---
To start the server and database:
1) `docker-compose up && ./dbinit.sh`

N.B. You may need to `dbinit.sh` to be executable, to do so run `chmod +x dbinit.sh`.

Testing
---
To run the tests:
 1) Start services (see above). N.B.
 2) Run `npm test` at project route

The tests will "clean up after themselves" (each unit tests flushes Users table).
 
N.B. Tests need DB tables to be empty. A quick and cheap way to refresh all tables is by running `docker-compose down postgres && docker-compose up postgres -d && ./dbinit.sh`.

