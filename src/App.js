import {Component} from 'react'
import Home from './components/Home'
import Header from './components/Header'
import weathercontext from './weatherContext/weathercontext'

class App extends Component {

  state = {mode:true}

  changeMode = () => {
    const {mode} = this.state
    this.setState({mode:!mode})
  }

  render() {

    const {mode} = this.state

    return (
      <weathercontext.Provider
        value={{mode,changeMode:this.changeMode}}
      >
        <Header />
        <Home />
      </weathercontext.Provider>
    )
  }

}

export default App