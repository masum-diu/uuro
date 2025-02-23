import theme from '@/components/theme'
import '@/styles/globals.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>

}
