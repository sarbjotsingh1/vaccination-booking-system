# VacciBook 📅💉✨
VacciBook is a web application that helps users find and book vaccination slots at various vaccination centers. Additionally, it provides an Admin Panel for managing vaccination centers and appointments.

![image](https://github.com/sarbjotsingh1/vaccination-booking-system/assets/75158735/36f3d891-1d44-4676-94ec-8d1ffb9470ff)

## User Features 👤💉
- User Registration and Login:

  * Users can create an account and log in to access the application.
  * Registration requires providing basic information such as name, email, and password.
  * Upon successful registration, users can log in using their credentials.
  * Search Vaccination Centers:

![image](https://github.com/sarbjotsingh1/vaccination-booking-system/assets/75158735/b089b924-4f83-4520-aeac-d2b90bdf06c1)

- Users can search for vaccination centers based on name or city.

  * Enter the search query in the search bar and click the "Search" button.
  * The search results will display the matching vaccination centers.

- View Vaccination Centers:

  * Users can view the details of vaccination centers, including the center's name, address, city, working hours, and available slots.
  * The list of vaccination centers provides essential information to users.

- Book Vaccination Slot:

  * Users can select a vaccination center and choose an available date.
  * The available slots for the selected center and date will be displayed.
  * Users can book a slot by providing their name and confirming the booking.
  * The number of slots booked and the maximum number of candidates per day for each center are displayed.

- User Dashboard:
  
  * After booking a slot, users can access their dashboard to view their booked appointments and manage their account.
  * The dashboard displays the user's upcoming appointments and provides options for canceling or rescheduling appointments.


## Admin Features 🧑‍💼✨

- Admin Login:

 * Admins can log in to the Admin Panel using their credentials.
 * Enter the username and password in the provided fields.
 * Manage Vaccination Centers:
 
![image](https://github.com/sarbjotsingh1/vaccination-booking-system/assets/75158735/847dc003-279a-415b-a28a-914329553b55)

- Admins can view, add, update, and remove vaccination centers.
  * The Manage Centers page lists all the existing vaccination centers.
  * Admins can click on a center to view its details and make necessary modifications.

- View Appointments:

  * Admins can view the appointments booked at each vaccination center.
  * The Appointments page displays a list of vaccination centers along with their booked slots and appointment details.
  
  
- Add Vaccination Center:

  * Admins can add a new vaccination center to the system.
  * Fill in the required details such as name, address, city, working hours, and maximum candidates per day.
  * Click the "Add Center" button to create the center.
  

- Remove Vaccination Center:

  * Admins can remove a vaccination center from the system.
  * Visit the center's details page from the Manage Centers page.
  * Click the "Remove Center" button to delete the center permanently.

## Installation
-To set up VacciBook locally, follow these steps:

- Clone the repository: git clone https://github.com/sarbjotsingh1/vaccination-booking-system
- Goto client : cd client
- Install dependencies: npm install 
- Start the development server: npm start dev
- Goto Sever : cd server
- Install dependencies: npm install 
- Start the backend server: npm start
- Open VacciBook in your browser

## Technologies Used
- Frontend: React
- Backend: Node.js, Express.js, MongoDB
