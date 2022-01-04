import {React,lazy} from 'react'
import { Container } from 'react-bootstrap'
// import AuthProvider from '../../src/contexts/authContext'
// import LogInForm from '../../src/components/login'
const AuthProvider = lazy(() => import("../../src/contexts/authContext"));
const LogInForm = lazy(() => import("../../src/components/login"));

export default function LogInPage() {
    return (
        <AuthProvider>
        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <LogInForm/>
            </div>
        </Container>
        </AuthProvider>
    )
} 