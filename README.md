This guide provides instructions for setting up and running the Wanderlust application, an Airbnb clone built on the MERN stack with EJS.
------------------------------------------------------------------------------------------------------------------------------------------------------------
About the Application
The application is a full-stack web platform that allows users to find and list vacation rentals. It includes features such as secure user authentication, CRUD operations for listings and reviews, and integration with third-party services like Cloudinary for image uploads and Mapbox for geographical mapping. The front-end uses EJS for dynamic content rendering, and the backend is powered by Node.js and Express.js with MongoDB as the database.
------------------------------------------------------------------------------------------------------------------------------------------------------------
Prerequisites
To run the application, ensure you have the following installed:

Node.js: The JavaScript runtime environment. The project specifies a Node.js version of 22.17.0 in package-lock.json.

MongoDB: A NoSQL database. You can use a local instance or a cloud-based service like MongoDB Atlas.

Cloudinary Account: Required for image uploads.

Mapbox Account: Required for location-based services.

Setup Instructions
Clone the Repository and Install Dependencies
First, clone the repository and navigate into the project directory. Then, install all the necessary packages using npm.

------------------------------------------------------------------------------------------------------------------------------------------------------------
Bash

git clone https://github.com/akash-ramireddy/airbnb-clone-mern.git
cd airbnb-clone-mern
npm install
Configure Environment Variables
Create a .env file in the project's root directory to store sensitive information. Populate it with your credentials:

------------------------------------------------------------------------------------------------------------------------------------------------------------
Code snippet

ATLASDB_URL="your_mongodb_connection_string"
SECRET="your_session_secret"
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_api_key"
CLOUD_API_SECRET="your_cloudinary_api_secret"
MAP_TOKEN="your_mapbox_access_token"
Initialize the Database
Run the initialization script to populate your database with sample listings and their geographic data using the Mapbox API.
------------------------------------------------------------------------------------------------------------------------------------------------------------
Bash

node init/index.js
Upon successful execution, you should see "Connected to DB" and "Data was initialised." messages in your console.
------------------------------------------------------------------------------------------------------------------------------------------------------------

Start the Application
Start the server to make the application accessible.
------------------------------------------------------------------------------------------------------------------------------------------------------------
Bash

node app.js
The application will be live on http://localhost:8080, and a confirmation message "Listening on port 8080" will appear in your console.
------------------------------------------------------------------------------------------------------------------------------------------------------------
