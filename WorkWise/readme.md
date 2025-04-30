# Seat Booking App (Full Stack)

A simple seat booking app with login, viewing available seats, and booking functionality.

## Tech Stack
- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express, MongoDB, JWT

## Project Structure
```
/seat-booking-app
  /frontend   # React app
  /backend    # Node.js backend
```

## Frontend Setup
```bash
git clone https://github.com/shiv2240/Int-Pre/tree/master/WorkWise
cd seat-booking-app/frontend
npm install
npm start
```
Runs at `https://workwise-intpre.netlify.app/`

## Backend Setup
```bash
cd seat-booking-app/backend
npm install
```
Create a `.env` file:
```
PORT=2030
MONGO_URI=mongodb://localhost:27017/seat-booking-app
JWT_SECRET=your-jwt-secret
```
Start server:
```bash
npm start
```
Runs at `http://localhost:2030`|| `https://int-pre.onrender.com`

## API Overview
### Auth
- `POST /api/auth/signup` – Register
- `POST /api/auth/login` – Login

### Seats
- `GET /api/auth/seat/available` – View seats
- `POST /api/auth/seat/book` – Book seats (requires token)

## Deployment
- **Frontend**: Netlify (`npm run build` → deploy `/build`)
- **Backend**: Heroku (push repo, set env variables)

## Note
Replace all placeholders with your actual project info.

