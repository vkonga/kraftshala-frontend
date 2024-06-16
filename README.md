### Introduction
1. The Weather Forecast Application provides users with current weather information for various locations.
2. Users can search for locations, view detailed weather conditions, save favorite locations, and toggle between light and dark modes.
### Features
1. Weather Information: Get current weather details like temperature, humidity, visibility, wind speed, and direction.
2. Search and Save Locations: Look up locations and save them for future quick access.
3. Theme Toggle: Switch between light and dark themes.
4. Responsive Design: Optimized for different devices.
### Technologies Used
1. React: Main framework for building the user interface.
2. OpenWeatherMap API: Source for fetching weather data.
3. Context API: Manages the application state, particularly for theme toggling.
### Setup Instructions
# Clone the Repository:
git clone https://github.com/yourusername/weather-forecast-app.git
cd weather-forecast-app
# Install Dependencies:
npm install
# Run the Application:
npm start
### Usage
Search Locations: Type a location name in the search bar and press "ADD".
View Weather Details: Weather details for the entered location are displayed.
Save and Access Locations: Saved locations are displayed as buttons. Click a button to view the weather for that location.
Switch Theme: Toggle between light and dark modes using the sun/moon icon in the header.
### Components Breakdown
Header Component: Displays the app title and theme switch button.
Home Component: Main component managing the search functionality and weather details display.
WeatherContext: Provides the theme state to the entire application.
### Key Functions and Methods
onChangeInputValue: Updates the input state as the user types.
onSubmitForm: Fetches weather data from OpenWeatherMap API for the entered location.
onClickLocation: Fetches and displays weather data for a saved location.
getWindDirection: Converts wind degree into a readable direction format.
