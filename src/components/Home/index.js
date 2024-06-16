import {Component} from 'react' // Importing the React Component
import weathercontext from '../../weatherContext/weathercontext'; // Importing the weather context for theming
import './index.css'; // Importing CSS styles



class Home extends Component {

    // Initial state of the component
    state = {location:"Hyderabad",weatherReport:[],errorMsg:"",locationList:[]}

    
    // Function to handle input value change
    onChangeInputValue = event => {
        console.log(event.target.value)
        this.setState({location:event.target.value})
    }

    // Function to handle form submission
    onSubmitForm = async event => {
        event.preventDefault()
        
        const {location,locationList} = this.state
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=27b56c5ae76d8df5e65708e728629f94`;
        const options = {
            method: "GET"
            };
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            if(response.ok === true) {
                // Converting temperatures from Kelvin to Celsius
                const temperatureInCelsius = (data.main.temp - 273.15).toFixed(2);
                const temperatureFeelLike = (data.main.feels_like - 273.15).toFixed(2);
                const temperatureMinimun = (data.main.temp_min - 273.15).toFixed(2);
                const temperatureMaximum = (data.main.temp_max - 273.15).toFixed(2);
                
                // Formatting date and time
                const dataDate = new Date(data.dt*1000).toLocaleDateString()
                const dataTime = new Date(data.dt*1000).toLocaleTimeString()
                const humidity = data.main.humidity
                const pressure = data.main.pressure
                
                // Creating an object for weather report
                const updateWeatherReport = {
                    coordinate: data.coord,
                    weather: data.weather[0],
                    main : {temp:temperatureInCelsius, feelsLike: temperatureFeelLike, tempMin: temperatureMinimun,
                         tempMax:temperatureMaximum,humidity:humidity,pressure:pressure},
                    visibility: data.visibility,
                    wind: data.wind,
                    date:dataDate,
                    time:dataTime ,
                    countySun: data.sys,
                    timeZone: data.timeZone,
                    name: data.name
    
                };
                
                // Updating the state with the new weather report and location list
                const updatedLocationList = [...locationList, { location, weatherReport: updateWeatherReport }];
                this.setState({weatherReport:updateWeatherReport,errorMsg:"",locationList:updatedLocationList,location:""})

                
            } else {
                this.setState({errorMsg:"Please Enter Valid Name"});
            }
    
    }

    
    // Function to handle click on a saved location
    onClickLocation = async (location) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=27b56c5ae76d8df5e65708e728629f94`;
        const options = { method: "GET" };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok === true) {
            const temperatureInCelsius = (data.main.temp - 273.15).toFixed(2);
            const temperatureFeelLike = (data.main.feels_like - 273.15).toFixed(2);
            const temperatureMinimun = (data.main.temp_min - 273.15).toFixed(2);
            const temperatureMaximum = (data.main.temp_max - 273.15).toFixed(2);
            const dataDate = new Date(data.dt * 1000).toLocaleDateString();
            const dataTime = new Date(data.dt * 1000).toLocaleTimeString();
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const updateWeatherReport = {
                coordinate: data.coord,
                weather: data.weather[0],
                main: {
                    temp: temperatureInCelsius,
                    feelsLike: temperatureFeelLike,
                    tempMin: temperatureMinimun,
                    tempMax: temperatureMaximum,
                    humidity: humidity,
                    pressure: pressure,
                },
                visibility: data.visibility,
                wind: data.wind,
                date: dataDate,
                time: dataTime,
                countySun: data.sys,
                timeZone: data.timeZone,
                name: data.name,
            };

            this.setState({
                weatherReport: updateWeatherReport,
                errorMsg: "",
            });
        } else {
            this.setState({ errorMsg: "Please Enter Valid Name" });
        }
    };
    
    // Function to get wind direction based on degree
    getWindDirection = (degree) => {
    if (degree >= 0 && degree <= 22.5) {
        return 'NORTH';
    } else if (degree > 22.5 && degree <= 67.5) {
        return 'NORTH EAST';
    } else if (degree > 67.5 && degree <= 112.5) {
        return 'EAST';
    } else if (degree > 112.5 && degree <= 157.5) {
        return 'SOUTH EAST';
    } else if (degree > 157.5 && degree <= 202.5) {
        return 'SOUTH';
    } else if (degree > 202.5 && degree <= 247.5) {
        return 'SOUTH WEST';
    } else if (degree > 247.5 && degree <= 292.5) {
        return 'WEST';
    } else if (degree > 292.5 && degree <= 337.5) {
        return 'NORTH WEST';
    } else {
        return 'NORTH';
    }
};


    render() {

        const {weatherReport,location,errorMsg,locationList} = this.state
        
        return (
        <>
            
            <weathercontext.Consumer>
                {
                    value => {
                        const {mode} = value
                        
                        const bgColor = mode ? "white-bgColor": "black-bgColor" 
                        
                        return (
                            <article className={ `weather-container ${bgColor}`} >
                                <form onSubmit={this.onSubmitForm} >
                                <input type="search" className='input-search'  value={location} onChange={this.onChangeInputValue} placeholder='Enter Location Name' />
                                <button className='add-button' type="submit" >ADD</button>
                                </form>
                                
                                <div>
                                    <h2>Locations:</h2>
                                    {locationList.map(({ location }, index) => (
                                        <button className='button' key={index} onClick={() => this.onClickLocation(location)}>
                                            {location}
                                        </button>
                                    ))}
                                </div>

                                { errorMsg !== "" ? <p>{errorMsg}</p> : 
                                    weatherReport.main && (

                                    <article className='weather-conditions-container' >
                                        
                                        <section className='weather-temperature-container'>
                                            <h1 className='heading'>{weatherReport.name.toUpperCase()} TEMPERATURE</h1>
                                            
                                                <p className='paragraph'>
                                                    Present: <span className='span-word'>{weatherReport.main.temp}&#176;C</span>
                                                </p>

                                                <div className='low-hight-container' >
                                                    <p className='paragraph'>L: <span className='span-word'>{weatherReport.main.tempMin}&#176;C</span></p>
                                                    <p className='paragraph'>H: <span className='span-word'>{weatherReport.main.tempMax}&#176;C</span></p>
                                                </div>
                                                <p className='paragraph'>{weatherReport.weather.description}</p>
                                                <img className='weather-icon' src={`https://openweathermap.org/img/wn/${weatherReport.weather.icon}@2x.png`} alt="weather Icon" />
                                                
                                            
                                        </section>
                                        <section className='weather-temperature-container'>
                                            <h1 className='heading'>DATE AND TIME </h1>
                                            <p className='paragraph'>Date: <span className='span-word'>{weatherReport.date}</span></p>
                                            <p className='paragraph'>Time: <span className='span-word'>{weatherReport.time}</span></p>
                                        </section>
                                        
                                        <section className='weather-temperature-container'>
                                            <h1 className='heading'>FEELSLIKE</h1>
                                            <p className='paragraph'>feels-like: <span className='span-word'>{weatherReport.main.feelsLike}&#176;C</span></p>
                                            <h2 className='heading'>PRESSURE</h2>
                                            <p className='paragraph'><span className='span-word'>{weatherReport.main.pressure} mbar</span></p>
                                        </section>
                                        
                                        <section className='weather-temperature-container'>
                                            <h1 className='heading'>HUMIDITY</h1>
                                            <p className='paragraph'>humidity: <span className='span-word'>{weatherReport.main.humidity}%</span></p>
                                        </section>
                                        
                                        <section className='weather-temperature-container'>
                                            <h1 className='heading'>VISIBILITY</h1>
                                            <p className='paragraph'>visibility: <span className='span-word'>{weatherReport.visibility} meter</span></p>
                                        </section>
                                        <section className='weather-temperature-container'>
                                            <h1 className='heading'>WIND SPEED</h1>
                                            <p className='paragraph'>Wind Speed: <span className='span-word'>{weatherReport.wind.speed} m/s</span></p>
                                            <p className='paragraph'>Wind Direction: <span className='span-word'>{this.getWindDirection(weatherReport.wind.deg)}</span></p>
                                        </section>
                                    </article>
                                    )
                                }
                                
                            </article>
                        )
                    }
                }
            </weathercontext.Consumer>
        </>
        )
    }

}

export default Home