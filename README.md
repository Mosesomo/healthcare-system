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
git clone https://github.com/yourusername/health-information-system.git
cd health-information-system
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

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


## API Documentation
The system provides a RESTful API with the following endpoints:

### Programs
- `GET /api/programs` - Get all programs
- `POST /api/programs` - Create a new program
- `GET /api/programs/:id` - Get program details

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/search?query=searchterm` - Search for clients
- `POST /api/clients` - Register a new client
- `GET /api/clients/:id` - Get client profile
- `PUT /api/clients/:id` - Update client information
- `POST /api/clients/:id/programs` - Enroll client in programs
- `GET /api/clients/:id/programs` - Get programs client is enrolled in


## Future Enhancements

- Role-based access control
- Data export functionality
- Advanced reporting and analytics
- Client appointment scheduling
- Medication tracking
- Mobile application

The App is live through this link --> https://healthcare-system-9vr1.vercel.app/

