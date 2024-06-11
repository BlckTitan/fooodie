import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
        <div className="container">
            <a className="navbar-brand pageTitle" href="#">
              <span className='pageTitle'>FOOODIE</span>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
          <div className="collapse navbar-collapse visible justify-content-xl-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
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
              <li className="nav-item">
                <a className="nav-link navbarLink" type="button" href="#">Login</a>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
  )
}
