# SkillTrade

SkillTrade is a MERN stack web application that allows users to connect and exchange skills. Users can create profiles, showcase skills they offer, list skills they want to learn, browse other users, and send trade requests for skill exchange.

## Features

### Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login using Context API

### Profile Management

* Create and Update Profile
* Add Skills Offered
* Add Skills Wanted

### Browse Users

* View all registered users
* Search users by username
* Search users by skills

### Trade Requests

* Send skill exchange requests
* Prevent duplicate pending requests
* Accept requests
* Reject requests
* Track request status
* View incoming requests
* View sent requests
* Filter requests by status

### User Experience

* Responsive UI
* Form Validation
* Success and Error Messages
* Custom 404 Page

## Tech Stack

### Frontend

* React
* React Router DOM
* Context API
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Project Structure

SkillTrade/
├── client/
│ ├── src/
│ ├── public/
│ └── ...
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── ...
└── README.md

## Installation

### Clone Repository

git clone https://github.com/sahilpatilcse/SkillTrade.git

cd SkillTrade

### Install Frontend Dependencies

cd client

npm install

### Install Backend Dependencies

cd ../server

npm install

## Environment Variables

Create a `.env` file inside the `server` folder.

Variables required:

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Run Backend

cd server

npm run dev

## Run Frontend

cd client

npm run dev

## Future Improvements

* Real-time notifications
* User ratings and reviews
* Profile images
* Chat system
* Skill matching recommendations

## Author

Sahil Patil
