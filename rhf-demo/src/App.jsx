import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import YoutubeForm from './components/YoutubeForm'
import Yup_YoutubeForm from './components/Yup_YoutubeForm'
import Zod_YoutubeForm from './components/Zod_YoutubeForm'
import { MuiLoginForm } from './components/MuiLoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <YoutubeForm/> */}
      {/* <Yup_YoutubeForm/> */}
      {/* <Zod_YoutubeForm/> */}

      <MuiLoginForm/>
    </>
  )
}

export default App
