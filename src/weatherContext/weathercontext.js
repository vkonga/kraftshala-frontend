import React from 'react'

const weathercontext = React.createContext({
    mode:true,
    changeMode: () => {}
})

export default weathercontext