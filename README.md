# 🌌 Wayfinder

Greetings, young Padawan! 💫

This guide will help you navigate the stars and reach your destination through the Wayfinder.

## Setup
- Execute the following command in the root folder: `docker-compose up --build`
- Make sure both the wayfinder-server and the wayfinder-client containers have successfully started
- Now you can access the Wayfinder!
  - 🌌 Client (Frontend): http://localhost:8001
  - 🔌 Server (API): http://localhost:8000

## API Endpoints
**GET /compute**  

Computes the fastest route to a given destination planet.

Request  
`curl "http://localhost:8000/compute?arrival=Endor"`

Response  
`{
  "route": ["Tatooine", "Hoth", "Endor"],
  "duration": 8
}`

## Technical Details
- Case-insensitive search (e.g., Endor, endor, and enDoR, they all work)
- Uses a recursive depth-first search algorithm
- Aborts path computation when the current path is already longer than the known fastest path
- Supports direct routes (e.g., Tatooine → Endor)
- Optimizes by duration first. eg: A longer direct route loses to a quicker multi-stop route. If durations are the same, the route with fewer stops is prioritised.

## Others
- The frontend has a dropdown menu for `spaceship` but its purely cosmetic, as per instructions the /compute endpoint only accepts one parameter which is `arrival`
- In the backend, the spaceship attributes is hardcoded as well, as we are constrained by the static `millennium-falcon.json` file.

## Future Improvements
- Save computed routes in a database to avoid future recomputation
- Store spaceship attributes in a database, allowing the `/compute` endpoint to accept a real spaceship parameter, removing the limitations imposed by static JSON files
- Make the UI responsive across devices
- Publish the Docker Images to a public registry

## Preview
<img width="1468" height="819" alt="Screenshot 2025-11-30 at 14 37 32" src="https://github.com/user-attachments/assets/aa4efd7c-65d4-4f8f-8594-4ad7ba45c1a4" />
<img width="1470" height="822" alt="image" src="https://github.com/user-attachments/assets/c64f18ef-ec54-4e5d-a906-b5d7c79c08a2" />




