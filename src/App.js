import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { UserAuthContextProvider } from './context/UserAuthContext'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Reset from './components/Reset'
import PhoneSignUp from './components/PhoneSignUp'

const App = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <UserAuthContextProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/phonesignup" element={<PhoneSignUp/>} />
                <Route path="/reset" element={<Reset />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
