import weathercontext from '../../weatherContext/weathercontext'
import { BiSun} from "react-icons/bi";
import { BsMoon} from "react-icons/bs";
import './index.css'

const Header = () => <weathercontext.Consumer>
{
    value => {
        const {mode,changeMode} = value
        const onClickChangeMode = () => {
            changeMode()
        }
        const backgroundColor = mode ? "white-background": "black-background" 
        
        return (
            <div className={backgroundColor}>
                <h1 className='weather-forecast-heading' >WEATHER FORECAST</h1>
                {
                    mode ? <BsMoon size={30} style={{cursor:'pointer'}} onClick={onClickChangeMode} /> : <BiSun style={{cursor:'pointer'}} color='white' size={30} onClick={onClickChangeMode} />
                }
            </div>
        )
    }
}


</weathercontext.Consumer>

export default Header