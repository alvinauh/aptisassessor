# APTIS Practice Test App

This application helps users practice for the APTIS English language test by providing exercises for speaking, listening, reading, and writing skills. It includes a backend CRM to manage user signups and track progress.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   ```
   Replace the placeholder values with your actual OpenAI API key, MongoDB connection string, and a secure JWT secret.

4. Start the development server and backend:
   ```
   npm run dev
   ```

## Important Note

This application uses the OpenAI API for CEFR level assessment and MongoDB for user data storage. You must provide valid credentials in the `.env` file for these features to work correctly.

## Features

- User registration and authentication
- Speaking practice
- Listening practice
- Reading practice
- Writing practice
- CEFR level assessment using OpenAI API
- User progress tracking
- Admin dashboard for monitoring user progress

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
- Backend:
  - Node.js
  - Express
  - MongoDB
  - JSON Web Tokens (JWT) for authentication
- OpenAI API for CEFR level assessment

## Accessing the Admin Dashboard

To access the admin dashboard, you need to manually set a user's `isAdmin` flag to `true` in the MongoDB database. Once set, that user can access the `/admin` route to view all users' progress.