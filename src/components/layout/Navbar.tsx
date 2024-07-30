'use client'

import React from 'react';
import Logo from './Logo';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  
  const session = useSession()

  let userData: any  = '';
  let userName: any  = '';

  userData = session?.data;
  
  if(session.status === 'authenticated' && session?.data?.user?.firstname){

    userName = session?.data?.user?.firstname

  }
  else{
    if(session.status === 'authenticated' && session?.data?.user?.name){
       userName = session?.data?.user?.name
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
        <div className="container">
          
            <Logo/>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
          <div className="collapse navbar-collapse visible justify-content-xl-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
              {
                (session.status === 'authenticated') && 
                <li className="nav-item">
                  <a className="nav-link font-bold" href="/profile">Hello {(userName !== undefined ) && userName.toUpperCase()}</a>
                </li>
              }
              <li className="nav-item flex flex-col xl:flex-row">
                { (session.status === 'loading' || session.status === 'unauthenticated') && <a className="nav-link navbarLink mr-2" type="button" href="/login">Login</a> }
                { (session.status === 'authenticated') && <button className="nav-link navbarLink logout mr-2" type="button" onClick={() => signOut()}>Logout</button> }
                { (session.status === 'loading' || session.status === 'unauthenticated') && <a className="nav-link navbarLink__register" type="button" href="/register">Register</a> }
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
  )
}
