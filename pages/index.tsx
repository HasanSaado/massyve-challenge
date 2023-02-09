// Libraries
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { NextPage } from 'next';

// Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Home: NextPage = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     history('/library');
  //   }
  // }, [])

  /**
   *
   */
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event: any) {
    event.preventDefault()

    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href = '/dashboard'
    } else {
      alert('Please check your username and password')
    }
  }

  /**
   *
   */
  return (
    <div className="app container login-form d-flex align-items-center">
      <Form
        onSubmit={handleSubmit}
        className="w-50 m-auto"
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="danger"
          type="submit"
          disabled={!validateForm()}
        >
          Submit
        </Button>
        <p className="mt-3">Don't have an account? <Link href="/register">Sign Up</Link></p>
      </Form>
    </div>
  );
}

export default Home;
