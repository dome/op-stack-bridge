import React from 'react';
import "../../assets/style/common/header.scss"
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { disconnect } from '@wagmi/core'
const HeaderNew = () => {
    const { address } = useAccount()
    const { connect } = useConnect({connector: new InjectedConnector()})
    const handleDisconnect = async () => {
        await disconnect()
    }
    return (
        <>
            <header className='app_header'>
                <Navbar expand="lg" variant="dark">
                    <Container fluid>
                        {/* <Navbar.Brand href="#"> */}
                        <Link to="/" className='app_logo'>
                            <Image src={logo} alt="logo" fluid />
                        </Link>
                        {/* </Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="#">Superchain</Nav.Link>
                                <Nav.Link href="#">Governance</Nav.Link>
                                <Nav.Link href="#">Ecosystem</Nav.Link>
                                <Nav.Link href="#">Bridge</Nav.Link>
                                <Nav.Link href="#">Developers</Nav.Link>
                                <Link to="/account">Account</Link>
                            </Nav>
                            <div className='header_btn_wrap'>
                                {address ? <button className='btn disconnect_btn header_btn' onClick={handleDisconnect}>Disconnect {address.slice(0, 5)}...{address.slice(-5)}</button> : <button onClick={() => connect()} className='btn disconnect_btn header_btn'>Connect Wallet</button>}
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}
export default HeaderNew