import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from '../components/Header'
import Home from './Home'
import Add from './Extra/Add'
import Read from './Extra/Read'
import User from './Extra/User'
import Login from './Login'
import Register from './Register'
import Footer from '../components/Footer'

import NoPage from '../components/NoPage'

export default function Index() {
  return (
    <BrowserRouter>

<Header />
    <main>
    <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path='/read' element={<Read />} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='*' element={<NoPage />} />
        
    </Routes>
    </main>
    <Footer />

    </BrowserRouter>
  )
}
