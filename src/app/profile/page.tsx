'use client'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../../components/layout/LoadingSpinner';
import { redirect } from 'next/navigation';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import PersonalInfo from '../../components/layout/profile/PersonalInfo'

export default function ProfilePage() {

  const session = useSession();

  useEffect(() => {

    console.log(session)   

  }, [session])

  if(session.status === 'loading') return <LoadingSpinner/>

  if(session.status === 'unauthenticated') return redirect('/login')

  return (
    <section className='container h-screen py-8 bg-white'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column xl:pr-4 xl:border-r xl:border-solid">
              <Nav.Item>
                <Nav.Link eventKey="personalInfo">Personal Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="acctInfo">Account Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="addressInfo">Address Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="billing">Billing</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="personalInfo">
                <PersonalInfo/>
              </Tab.Pane>
              <Tab.Pane eventKey="acctInfo">account information</Tab.Pane>
              <Tab.Pane eventKey="addressInfo">This is address information</Tab.Pane>
              <Tab.Pane eventKey="billing">Billing information</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </section>
  )
}
