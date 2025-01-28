'use client'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { AlertError, AlertSuccess } from './Alerts';

export default function MyVerticallyCenteredModal(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setId] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [street, setStreet] = useState('')

    const { push } = useRouter();
    const session = useSession()
    const userData = session?.data?.user

    useEffect(() => {
        
        setFirstName(props.editName || props.editFirstname)
        setLastName(props.editName || props.editLastname)
        setUsername(props.editUsername)
        setEmail(props.editEmail)
        setPhone(props.editPhone)
        setCountry(props.editCountry)
        setState(props.editState)
        setCity(props.editCity)
        setRegion(props.editRegion)
        setStreet(props.editStreet)
        setId(userData?.id)

    }, [session])

    const handleEdit = (e) =>{
        axios({
            method: 'put',
            url: `/api/user/`,
            data: {
              id,
              firstName, lastName,  username, email, phone,
              country, state, city, region, street
            }
          }).then(function (response) {
            if(response.status === 200){
                AlertSuccess('Success')
            }
            // signOut()
          })
          .catch(function (error) {
            AlertError(error)
          })
          .finally(function () {
            // always executed
            push('/dashboard')
          });
    }

  return (
    <div>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Update Information
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='flex justify-between'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="personal" className='w-full'>
                        <Row className='w-full'>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">

                                    <Nav.Item>
                                        <Nav.Link eventKey="personal">Personal Info</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="account">Account Info</Nav.Link>

                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="address">Address Info</Nav.Link>
                                    </Nav.Item>

                                </Nav>
                            </Col>

                            <Col sm={9} className=''>
                                <Tab.Content>
                                    <Tab.Pane eventKey="personal">
                                        {/* pane for account information */}
                                        <div className='w-3/4'>

                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit first name" 
                                                    value={firstName} 
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit last name" 
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    placeholder="Edit email" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control 
                                                    type="tel" 
                                                    placeholder="Edit phone" 
                                                    value={phone} 
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </Form.Group>

                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="account">
                                        {/* pane for account information */}
                                            <div className='w-3/4'>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control 
                                                        type="email" 
                                                        placeholder="Edit email" 
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicText">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Edit username" 
                                                        value={username} 
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </Form.Group>

                                            </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="address">
                                        {/* pane for address information */}
                                        <div className='w-1/2'>

                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit country" 
                                                    value={country} 
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit state" 
                                                    value={state} 
                                                    onChange={(e) => setState(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicText">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit city" 
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Region</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit region" 
                                                    value={region}
                                                    onChange={(e) => setRegion(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Street</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Edit street" 
                                                    value={street}
                                                    onChange={(e) => setStreet(e.target.value)}
                                                />
                                            </Form.Group>

                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='bg-primaryColor hover:bg-orange-800 border-0' type='submit' onClick={handleEdit}>Save</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}