import * as React from 'react'
import { ChakraProvider, extendTheme} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App'

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ChakraProvider theme={theme}> */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)