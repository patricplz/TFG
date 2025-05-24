import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../css/Welcome.module.css'; // Importa los estilos del módulo
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`${styles['welcome-container']} ${isVisible ? styles['fade-in'] : ''}`}>
            <>
                <Head title="Tu Plataforma de Prácticas Profesionales">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet" />
                </Head>

                {/* HEADER */}
                <Row >
                    <Col xs={12}>   
                        <header className="d-flex justify-between h-20 align-items-center px-10 text-end justify-items-center items-center" style={{  backgroundColor: 'rgba(28, 23, 44, 0.62)' }}>
                            <div className="d-flex flex-row align-items-center">
                                <a href='/' className='d-flex flex-row align-items-center' style={{ textDecoration: 'none' }}>
                                    <Image src='/storage/images/logo.png' className={styles.logo} />
                                    <span className='no-underline' style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: '#012c45' ,
                                        marginTop: '0.5rem',
                                        marginLeft: '0.3rem',
                                        textDecoration: 'None'
                                    }}>
                                        ConectaPro
                                    </span>
                                </a>
                            </div>

                            {auth?.user ? (
                                <button
                                    onClick={() =>
                                        router.visit(route('dashboard'), {
                                            onSuccess: () => window.location.reload()
                                        })
                                    }
                                    className="btn btn-outline-primary me-2"
                                >
                                    Dashboard
                                </button>
                            ) : (
                                <>
                                    <div className='d-flex align-items-center'>
                                    <Link href={route('login')} className="btn btn-outline-primary me-2" style={{ minWidth: '8em' }}>
                                        Iniciar Sesión
                                    </Link>
                                        <Link href={route('register')} className="btn btn-primary">
                                            Registrarse
                                        </Link>
                                    </div>
                                </>
                            )}
                        </header>
                    </Col>
                </Row>
                

                {/* HERO SECTION */}
                <Container className="bg-transparent">
                    <Row className="align-items-center">
                        <Col md={6} className="d-flex flex-column justify-content-center p-5">
                            <h1 className="display-4 fw-bold text-primary">Conecta tu Futuro Profesional con Oportunidades Reales</h1>
                            <p className="lead mt-3 text-secondary">
                                Encuentra prácticas que impulsen tu carrera o descubre talento joven para tu empresa. ¡La plataforma ideal para el encuentro entre estudiantes y el mundo laboral!
                            </p>
                            <div className="mt-4">
                                <Link href={route('register')} className="btn btn-primary btn-lg me-3">
                                    ¡Únete ahora!
                                </Link>
                                <Button variant="outline-secondary" size="lg">
                                    Conoce más
                                </Button>
                            </div>
                        </Col>
                        <Col md={6} className="p-5 w-full h-full text-center">
                            <div className={styles['image-container']}>
                                <Image src='/storage/images/landing-general.jpg' alt="Conexión de talento y oportunidades" className="full-width-height w-full h-full rounded shadow-sm" />
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* SECTION FOR STUDENTS */}
                <Container className="py-5 bg-transparent">
                    <Row className="align-items-center">
                        <Col md={6} className="p-5 text-center">
                            <div className={styles['image-container']}>
                                <Image src='/storage/images/student.jpeg' alt="Estudiantes buscando prácticas" className="full-width-height rounded shadow-sm" />
                            </div>
                        </Col>
                        <Col md={6} className="d-flex flex-column justify-content-center p-5">
                            <h2 className="h4 mb-3 text-info">¿Eres estudiante?</h2>
                            <p className="text-muted">Explora una amplia variedad de ofertas de prácticas en los sectores que te interesan. ¡Comienza a construir tu experiencia profesional hoy mismo!</p>
                            <Link href={route('register')} className="btn btn-info btn-lg mt-3">
                                Regístrate como estudiante
                            </Link>
                            <Link href="#" className="mt-2 text-info">Ver ofertas destacadas</Link> {/* Enlace opcional */}
                        </Col>
                    </Row>
                </Container>

                {/* SECTION FOR COMPANIES */}
                <Container className="py-5 bg-transparent">
                    <Row className="align-items-center">
                        <Col md={6} className="d-flex flex-column justify-content-center p-5">
                            <h2 className="h4 mb-3 text-success">¿Eres una empresa?</h2>
                            <p className="text-muted">Descubre talento joven y proactivo para tus proyectos. Publica tus ofertas de prácticas de forma sencilla y encuentra a los futuros profesionales de tu sector.</p>
                            <Link href={route('register')} className="btn btn-success btn-lg mt-3">
                                Regístrate como empresa
                            </Link>
                            <Link href="#" className="mt-2 text-success">Publicar una oferta</Link> {/* Enlace opcional */}
                        </Col>
                        <Col md={6} className="p-5 text-center">
                            <div className={styles['image-container']}>
                                <Image src='/storage/images/company.jpg' alt="Empresas ofreciendo prácticas" className="full-width-height rounded shadow-sm" />
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* FOOTER */}
                <footer className="bg-dark text-light text-center py-3">
                    <p>&copy; {new Date().getFullYear()} Tu Plataforma de Prácticas Profesionales</p>
                </footer>
            </>
        </div>
    );
}