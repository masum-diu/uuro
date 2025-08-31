import { AuthProvider } from '@/authcontext/AuthContext'
import theme from '@/utils/theme'
import '@/styles/globals.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return <AuthProvider >
     <Toaster position="top-center" containerStyle={{marginTop:30}} />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider></AuthProvider>

}
