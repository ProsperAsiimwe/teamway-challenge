Teamway work planning service REST API challenge

-   INSTALL ALL NODE PACKAGES WITH COMMAND: yarn install
-   START THE SERVER BY RUNNING COMMAND: yarn start
-   TO RUN SOME TESTS WITH COMMAND: yarn test

-   API ENDPOINT TO ALLOCATE A WORKER TO TODAY'S SHIFT: (POST) http://localhost:8000/planner/
    Body expects json like example below:
    {
    "worker_number": 456,
    "shift": "0-8"
    }
    All sample workers with their worker_numbers can be found in json file src/json/workers.json
    All sample shifts can be found in json file src/json/shifts.json

-   API TO FETCH ALL WORKER-SHIFT ALLOCATIONS FOR TODAY: (GET) http://localhost:8000/planner/
