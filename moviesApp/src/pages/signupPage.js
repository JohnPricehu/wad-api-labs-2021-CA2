import {React,lazy} from 'react'
// import SignUpForm from '../components/signup'
import { Container } from 'react-bootstrap'
// import AuthProvider from '../contexts/authContext'
const AuthProvider = lazy(() => import("../contexts/authContext"));
const SignUpForm = lazy(() => import("../components/signup"));

export default function SignUpPage() {
    return (
        <AuthProvider>
        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <SignUpForm/>
            </div>
        </Container>
        </AuthProvider>
    )
} 