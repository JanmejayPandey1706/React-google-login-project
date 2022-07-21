import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Alert } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useUserAuth } from '../context/UserAuthContext'

const PhoneSignUp = () => {
  const [error, setError] = useState('')
  const [number, setNumber] = useState('')
  const [flag, setFlag] = useState(false)
  const [otp, setOtp] = useState('')
  const [result, setResult] = useState('')
  const [recaptcha, setRecaptcha] = useState(false)
  const { setUpRecaptcha } = useUserAuth()
  const navigate = useNavigate()

  const handleReRecaptcha = () => {
    console.log(recaptcha)
  }
 console.log(result)
  // handle get otp
  const getOtp = async (e) => {
    e.preventDefault()
    console.log(number)
    setError('')
    if (number === '' || number === undefined)
      return setError('Please enter a valid phone number!')
    try {
      const response = await setUpRecaptcha(number)
      setResult(response)
      setFlag(true)
      setRecaptcha(!recaptcha)
      console.log(!recaptcha)
    } catch (err) {
      setError(err.message)
      alert("Enter the valid number")
    }
  }
 
  

  // handle verify otp
  const verifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (otp === '' || otp === null) return
    try {
      await result.confirm(otp)
      navigate('/home')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? 'block' : 'none' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary" onClick={handleReRecaptcha}>
              Send Otp
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? 'block' : 'none' }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Verify
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default PhoneSignUp
