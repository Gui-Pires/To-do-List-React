import { Container } from 'react-bootstrap'
// import { useState, useEffect } from 'react'
import './App.css'
import './Colors.css'
import NavbarComp from './Components/Navbar'
import TabsComp from './Components/Tabs'

export default function App() {
    
    return (
        <main>
            <NavbarComp />
            <Container>
                <div className='meteoro' data-style="1"></div>
                <div className='meteoro' data-style="2"></div>
                <div className='meteoro' data-style="3"></div>
                <TabsComp />
            </Container>
        </main>
    )
}
