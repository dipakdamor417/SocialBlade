import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from './Home Page/loginPage';
import ProfilePage from './Components/ProfilePage'
import { useMemo } from "react"
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from './theme';
import MainPage from './Home Page/MainPage';
import HomeRoutes from './Home Page/HomeRoute/HomeRoutes';
import ForNot from './Components/ForNot';

function App() {
  const mode = useSelector((state => state.mode));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth=Boolean(useSelector((state)=>state.token))
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<LoginPage />} />
            <Route path='/home/*' element={ isAuth ? <HomeRoutes/> :<Navigate to="/" />} />
            <Route path='/profile/:userId' element={ isAuth ? <ProfilePage />:<Navigate to="/" />} />
            <Route path="*" element={<ForNot />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter >
    </>
  );
}

export default App;
