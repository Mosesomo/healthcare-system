# Health Information System

A web application for managing clients and health programs/services, built with React.js, Node.js, Express, and MongoDB.

## Features

- Create and manage health programs (TB, Malaria, HIV, etc.)
- Register new clients in the system
- Enroll clients in one or more health programs
- Search for clients from the registered list
- View client profiles including enrolled programs
- REST API for client profile data

## Technologies Used

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation and Setup

### Clone the repository
```bash
git clone https://github.com/Mosesomo/healthcare-system.git
cd healthcare-system
```

### Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# start the server 
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file with API URL
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the React development server
npm run dev
```


# API Documentation

This system provides a RESTful API for managing programs, clients, and enrollments.

## Programs Endpoints

### Get All Programs
- **Endpoint:** `GET /api/programs`
- **Description:** Retrieve a list of all available programs
- **Response:** Array of program objects

### Create Program
- **Endpoint:** `POST /api/programs`
- **Description:** Create a new program
- **Request Body:** Program details
- **Response:** Created program object

### Get Program Details
- **Endpoint:** `GET /api/programs/:id`
- **Description:** Get details of a specific program
- **Parameters:**
  - `id` - Program ID
- **Response:** Program object

## Clients Endpoints

### Get All Clients
- **Endpoint:** `GET /api/clients`
- **Description:** Retrieve a list of all clients
- **Response:** Array of client objects

### Search Clients
- **Endpoint:** `GET /api/clients/search?query=searchterm`
- **Description:** Search for clients by name or other attributes
- **Query Parameters:**
  - `query` - Search term
- **Response:** Array of matching client objects

### Register Client
- **Endpoint:** `POST /api/clients`
- **Description:** Register a new client
- **Request Body:** Client details
- **Response:** Created client object

### Get Client Profile
- **Endpoint:** `GET /api/clients/:id`
- **Description:** Get details of a specific client
- **Parameters:**
  - `id` - Client ID
- **Response:** Client object

### Update Client
- **Endpoint:** `PUT /api/clients/:id`
- **Description:** Update client information
- **Parameters:**
  - `id` - Client ID
- **Request Body:** Updated client details
- **Response:** Updated client object

### Enroll Client in Programs
- **Endpoint:** `POST /api/clients/:id/programs`
- **Description:** Enroll a client in one or more programs
- **Parameters:**
  - `id` - Client ID
- **Request Body:** Array of program IDs to enroll in
- **Response:** Enrollment confirmation

### Get Client's Programs
- **Endpoint:** `GET /api/clients/:id/programs`
- **Description:** Get all programs a client is enrolled in
- **Parameters:**
  - `id` - Client ID
- **Response:** Array of program objects the client is enrolled in

## Enrollments Endpoints

### Create Enrollment
- **Endpoint:** `POST /api/enrollments`
- **Description:** Enroll a client in a program
- **Request Body:** Enrollment details (clientId, programId, etc.)
- **Response:** Created enrollment object

### Get All Enrollments
- **Endpoint:** `GET /api/enrollments`
- **Description:** Retrieve all enrollments
- **Response:** Array of enrollment objects

### Get Enrollment by ID
- **Endpoint:** `GET /api/enrollments/:id`
- **Description:** Get details of a specific enrollment
- **Parameters:**
  - `id` - Enrollment ID
- **Response:** Enrollment object

### Get Client's Enrollments
- **Endpoint:** `GET /api/enrollments/client/:clientId`
- **Description:** Get all enrollments for a specific client
- **Parameters:**
  - `clientId` - Client ID
- **Response:** Array of enrollment objects for the client

### Update Enrollment
- **Endpoint:** `PUT /api/enrollments/:id`
- **Description:** Update enrollment details
- **Parameters:**
  - `id` - Enrollment ID
- **Request Body:** Updated enrollment details
- **Response:** Updated enrollment object

### Delete Enrollment
- **Endpoint:** `DELETE /api/enrollments/:id`
- **Description:** Remove an enrollment
- **Parameters:**
  - `id` - Enrollment ID
- **Response:** Success message

## Future Enhancements

- Role-based access control
- Data export functionality
- Advanced reporting and analytics
- Client appointment scheduling
- Medication tracking
- Mobile application

The App is live through this link --> https://healthcare-system-9vr1.vercel.app/

