# Marvel Quiz

A full-stack Marvel character quiz built with React, Node.js, Express, and MongoDB.

Test your Marvel knowledge by identifying characters from blurred images. Each game contains 20 randomly selected Marvel characters, with a 20-second timer for every question.

## Features

* 20 questions per game
* Random, non-repeating Marvel characters
* Four answer options for each question
* Blurred character images
* 20-second timer per question
* Score system: +10 points for each correct answer
* Game Over screen with final score
* Username-based score saving
* Personal best score handling
* Competition-based ranking
* Top 10 leaderboard
* Play Again functionality
* Responsive UI
* Docker support

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Express Validator

## Docker

The application is fully Dockerized with separate containers for the frontend and backend.

### Frontend

```bash
docker build -t marvel-quiz-frontend ./frontend
docker run -p 5173:5173 --name marvel-quiz-frontend marvel-quiz-frontend
```

### Backend

```bash
docker build -t marvel-quiz-backend ./backend
docker run -p 8000:8000 --env-file ./backend/.env --name marvel-quiz-backend marvel-quiz-backend
```

The frontend runs on port `5173`, while the backend runs on port `8000`. MongoDB is hosted using MongoDB Atlas.

Both containers have been tested together locally and the complete application works successfully with Docker.


### Other

* Docker
* MongoDB Atlas
* Git & GitHub

## How It Works

The application fetches Marvel character data from the Superhero API and filters characters published by Marvel Comics.

A game randomly selects 20 unique characters. For each question, three incorrect characters are selected to create four answer options. The options are shuffled before being displayed.

The player's score is calculated on the frontend and submitted to the backend after the game ends.

The backend stores the player's best score and calculates their rank based on the number of players with a higher score.

For example:

```text
Score: 200 → Rank #1
Score: 180 → Rank #2
Score: 160 → Rank #3
Score: 160 → Rank #3
Score: 150 → Rank #5
```

Players with the same score share the same rank.

## API

Character data is provided by the Superhero API:

https://akabab.github.io/superhero-api/api/all.json

The application filters the API response to use characters whose publisher is `Marvel Comics`.

## Project Structure

```text
Marvel-Quiz/
├── frontend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── .gitignore
├── .dockerignore
└── README.md
```

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

### Backend

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
```

Environment files containing sensitive values are not committed to the repository.

## Running Locally

Clone the repository and install dependencies in both the frontend and backend directories.

### Start the backend

```bash
cd backend
npm install
npm run dev
```

### Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the Vite development server and communicate with the Express API.

## Future Improvements

* Add authentication
* Add difficulty levels
* Add more game modes
* Add question categories
* Add server-side score validation
* Add player profiles and game history
* Improve leaderboard statistics

## Author

Misbah Sheikh

Built as a personal full-stack project to practice React, Node.js, Express, MongoDB, API integration, and Docker.
