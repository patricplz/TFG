import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* HEADER */}
            <header className="text-end p-4">
                {auth?.user ? (
                    <Link href={route('dashboard')} className="btn btn-outline-dark me-2">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href={route('login')} className="btn btn-outline-dark me-2">
                            Log in
                        </Link>
                        <Link href={route('register')} className="btn btn-dark">
                            Register
                        </Link>
                    </>
                )}
            </header>

            {/* LANDING CONTENT */}
            <Container fluid className="py-5">
                <Row>
                    <Col md={3} className="d-flex flex-column bg-light text-center justify-content-center p-4">
                        <h1>WebbyFrames</h1>
                    </Col>
                    <Col md={9} className="d-flex flex-column justify-content-center p-5">
                        <h1>Drive Business Growth</h1>
                        <p className="lead">Pellentesque convallis accumsan suscipit aliquet eu diam quis nulla turpis.</p>
                        <Button variant="outline-dark" className="mt-3 w-50">Explorar ofertas</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
