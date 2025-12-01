# 🌌 Wayfinder

Greetings, young Padawan! ✨

Through the stars you must go; with this guide, your destination you shall find.

## Setup

- Execute the following command in the root folder: `docker-compose up --build`
- Make sure **both** the wayfinder-server and the wayfinder-client containers have successfully started  
  (⚠️ The wayfinder-client could take a bit longer than the wayfinder-server)
- Now you can access the Wayfinder!
  - 🌌 Client: http://localhost:8001
  - 🔌 Server: http://localhost:8000

## Unit Tests

Execute `npm run test` in the root directory to execute all unit tests.

## API Endpoints

**GET /compute**

Computes the fastest route to a given destination planet.

- Request  
  `curl "http://localhost:8000/compute?arrival=Endor"`

- Response  
  `{ "route": ["Tatooine", "Hoth", "Endor"], "duration": 8 }`

## Technical Details

- Uses a recursive depth-first search algorithm
- Aborts path computation when the current path is already longer than the known fastest path
- Supports direct routes (e.g., Tatooine → Endor)
- Optimizes by duration first:
  - A longer direct route loses to a quicker multi-stop route (not using breath-first search for this reason)
  - If durations are the same, the route with fewer stops is prioritised
- Case-insensitive search (e.g., _Endor_, _endor_, and _enDoR_, they all work)

## Others

- The frontend has a dropdown menu for `spaceship` but it is purely cosmetic, as per instructions the `/compute` endpoint only accepts one parameter which is `arrival`
- In the backend, the spaceship is hardcoded as well, as we are constrained by the static `millennium-falcon.json` file
- These were retained to leave room for future functionality, such as allowing users to select different spaceships.

## Future Improvements

- Save computed routes in the database to avoid future recomputations
- Store spaceship attributes in a database, allowing the `/compute` endpoint to accept a real spaceship parameter, removing the limitations imposed by static JSON files
- Add a standardized `origin_code` and `destination_code` to the `routes` table, allowing consistent lookups regardless of input casing.
- Make the UI responsive across devices
- Add frontend tests
- Publish the Docker images to a public registry.

## Demo Video

https://github.com/user-attachments/assets/63a52085-1080-47f9-9ce7-a1243c3a3de6

**May the Force be with you 🌟**
