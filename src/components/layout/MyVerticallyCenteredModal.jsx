'use client'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlinePhotoCamera } from 'react-icons/md';


export default function MyVerticallyCenteredModal(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setId] = useState('')
    // const [country, setCountry] = useState('')
    // const [state, setState] = useState('')
    // const [city, setCity] = useState('')
    // const [region, setRegion] = useState('')
    // const [street, setStreet] = useState('')

    const session = useSession()
    const userData = session?.data?.user

    useEffect(() => {
        setFirstName(userData?.name || userData?.firstname)
        setLastName(userData?.name || userData?.lastname)
        setEmail(userData?.email)
        setPhone(userData?.phone)
        setId(userData?.id)
    }, [session])

    const handleEdit = (e) =>{
        axios({
            method: 'put',
            url: `/api/user/`,
            data: {
              id,
              firstName, lastName,  email, phone,
              country, state, city, region, street
            }
          }).then(function (response) {
            toast.success(response)
            signOut()
          })
          .catch(function (error) {
            toast.error(error)
          });

        console.log(e, img)
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

                    <div className='w-1/2 mr-4'>

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
                                type="text" 
                                placeholder="Edit phone" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                    </div>

                    {/* <div className='w-1/2'>

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

                    </div> */}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='bg-primaryColor hover:bg-orange-800 border-0' type='submit' onClick={handleEdit}>Save</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
