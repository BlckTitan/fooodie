'use client'
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSession } from 'next-auth/react';
import axios from 'axios';


export default function MyVerticallyCenteredModal(props) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const session = useSession()
    const userData = session?.data?.user

    useEffect(() => {
        setFirstName(userData?.name || userData?.firstname)
        setLastName(userData?.name || userData?.lastname)
        setEmail(userData?.email)
        setPhone(userData?.phone )
    }, [session])

    const handleEdit = () =>{
        axios({
            method: 'put',
            url: `/api/user/`,
            data: {
              firstName,
              lastName,
              email, 
              phone
            }
          }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
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
                Edit Personal Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

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

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='bg-primaryColor hover:bg-orange-800 border-0' type='submit' onClick={handleEdit}>Save</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
