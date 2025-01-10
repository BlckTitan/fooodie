import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function Modals(props) {

  const handleSave = async () => {

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>

        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="New Category" />

          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />

          </Form.Group>
          
        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button variant='primary' onClick={handleSave}>Save</Button>
        <Button variant='secondary' onClick={props.onHide}>Close</Button>

      </Modal.Footer>

    </Modal>
  )
}
