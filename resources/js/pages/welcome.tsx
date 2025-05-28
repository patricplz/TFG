import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../css/Welcome.module.css';
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
                <Head title="ConectaPro - Plataforma de Prácticas Profesionales">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet" />
                </Head>

                {/* HEADER */}
                <Row>
                    <Col xs={12}>   
                        <header className="d-flex justify-between h-20 align-items-center px-10 text-end justify-items-center items-center" style={{ backgroundColor: 'rgba(28, 23, 44, 0.62)' }}>
                            <div className="d-flex flex-row align-items-center">
                                <a href='/' className='d-flex flex-row align-items-center' style={{ textDecoration: 'none' }}>
                                    <Image src='/storage/images/logo.png' className={styles.logo} />
                                    <span className='no-underline' style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: '#012c45',
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

    
                <Container className="bg-transparent py-5">
                    <Row className="align-items-center">
                        <Col md={6} className="d-flex flex-column justify-content-center p-5">
                            <h1 className="display-4 fw-bold text-primary mb-4">
                                La plataforma que conecta estudiantes con las mejores oportunidades
                            </h1>
                            <p className="lead text-secondary mb-4">
                                ConectaPro usa inteligencia artificial para ayudar a estudiantes y empresas a encontrarse de manera más eficiente. Encuentra la práctica perfecta o el candidato ideal con nuestra tecnologia avanzada.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <button 
                                    onClick={() =>
                                        router.visit(route('register'), {
                                            onSuccess: () => window.location.reload()
                                        })
                                    } 
                                    className="btn btn-primary btn-lg px-4 py-3"
                                >
                                    <strong>Empezar ahora</strong>
                                </button>
                                <Button href="#moreInfo" variant="outline-secondary" size="lg" className="px-4 py-3">
                                    Ver más
                                </Button>
                            </div>
                        </Col>
                        <Col md={6} className="p-5 text-center">
                            <div className={styles['image-container']}>
                                <Image src='/storage/images/landing-general.jpg' alt="Estudiantes y empresas conectados" className="w-100 rounded shadow-lg" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* FEATURES SECTION */}
                <Container className="py-5 bg-light rounded my-5" id='moreInfo'>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="display-5 fw-bold text-dark mb-3">¿Que hace especial a ConectaPro?</h2>
                            <p className="lead text-muted">Una plataforma pensada para facilitar el proceso de prácticas</p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={4} className="text-center">
                            <div className="p-4">
                                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
                                    <span className="text-white fs-3">AI</span>
                                </div>
                                <h4 className="fw-bold text-primary">Filtrado Inteligente</h4>
                                <p className="text-muted">Nuestro sistema de IA analiza los perfiles y ordena automaticamente a los estudiantes que mejor encajan con cada oferta de práctica, ahorrando tiempo valioso a las empresas.</p>
                            </div>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="p-4">
                                <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
                                    <span className="text-white fs-4">💬</span>
                                </div>
                                <h4 className="fw-bold text-success">Chat Directo</h4>
                                <p className="text-muted">Comunicate directamente con empresas o estudiantes atraves de nuestro sistema de chat integrado. Pregunta dudas, programa entrevistas y mantén contacto fácilmente.</p>
                            </div>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="p-4">
                                <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
                                    <span className="text-white fs-4">⚡</span>
                                </div>
                                <h4 className="fw-bold text-info">Fácil de usar</h4>
                                <p className="text-muted">Interface simple que hace sencillo publicar ofertas para empresas y buscar prácticas para estudiantes. Todo funciona de manera intuitiva sin complicaciones.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container className="py-5">
                    <Row className="align-items-center">
                        <Col md={6} className="p-4 text-center">
                            <div className={styles['image-container']}>
                                <Image src='/storage/images/student.jpeg' alt="Estudiantes buscando prácticas" className="w-100 rounded shadow-lg" style={{ maxHeight: '350px', objectFit: 'cover' }} />
                            </div>
                        </Col>
                        <Col md={6} className="p-4">
                            <h2 className="h3 mb-3 text-info fw-bold">Para Estudiantes</h2>
                            <h3 className="h4 mb-3 text-dark">Encuentra tu práctica perfecta</h3>
                            <div className="mb-4">
                                <div className="d-flex align-items-start mb-3">
                                    <span className="text-info me-2">✓</span>
                                    <div>
                                        <strong>Búsqueda personalizada:</strong> La IA te muestra las ofertas más relevantes segun tu perfil y estudios, para que no pierdas tiempo revisando cosas que no te interesan.
                                    </div>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <span className="text-info me-2">✓</span>
                                    <div>
                                        <strong>Inscripción rápida:</strong> Apuntate a varias ofertas con solo un click y gestiona todas tus aplicaciones desde un solo sitio.
                                    </div>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <span className="text-info me-2">✓</span>
                                    <div>
                                        <strong>Habla con las empresas:</strong> Usa el chat para resolver dudas directamente con los reclutadores y destacar entre otros candidatos.
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container className="py-5 bg-light rounded my-5">
                    <Row className="align-items-center">
                        <Col md={6} className="p-4">
                            <h2 className="h3 mb-3 text-success fw-bold">Para Empresas</h2>
                            <h3 className="h4 mb-3 text-dark">Encuentra el talento que necesitas</h3>
                            <div className="mb-4">
                                <div className="d-flex align-items-start mb-3">
                                    <span className="text-success me-2">✓</span>
                                    <div>
                                        <strong>Publica ofertas fácil:</strong> Crea ofertas de prácticas en pocos minutos con nuestro formulario sencillo que te guía paso a paso.
                                    </div>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <span className="text-success me-2">✓</span>
                                    <div>
                                        <strong>Candidatos ordenados por IA:</strong> El sistema ordena automaticamente a los postulantes según que tan bien encajan con tu oferta, viendo primero a los mejores.
                                    </div>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <span className="text-success me-2">✓</span>
                                    <div>
                                        <strong>Gestiona todo desde aquí:</strong> Panel completo para revisar aplicaciones, chatear con estudiantes y llevar el control de todo el proceso de selección.
                                    </div>
                                </div>
                            </div>  
                        </Col>
                        <Col md={6} className="p-4 text-center">
                            <div className={styles['image-container']}>
                                <Image src='/storage/images/company.jpg' alt="Empresas buscando estudiantes" className="w-100 rounded shadow-lg" style={{ maxHeight: '350px', objectFit: 'cover' }} />
                            </div>
                        </Col>
                    </Row>
                </Container>


                <Container className="py-5 text-center">
                    <Row>
                        <Col>
                            <div className="bg-primary text-white rounded p-5 text-center">
                                <h2 className="display-6 fw-bold mb-3">¿Listo para dar el siguiente paso?</h2>
                                <p className="lead mb-4">
                                    Únete a los estudiantes y empresas que ya están utilizando ConectaPro para encontrar las mejores oportunidades.
                                </p>
                                <button 
                                    onClick={() =>
                                        router.visit(route('register'), {
                                            onSuccess: () => window.location.reload()
                                        })
                                    } 
                                    className="btn btn-light btn-lg px-5 py-3"
                                >
                                    <strong>Registrarse Gratis</strong>
                                </button>
                            </div>
                        </Col>

                    </Row>
                </Container>
                <footer className="bg-dark text-light py-4">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <Image src='/storage/images/logo.png' width="40" height="40" className="me-2" />
                                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1.2rem' }}>
                                        ConectaPro
                                    </span>
                                </div>
                                <p className="text-muted">La plataforma que conecta estudiantes con oportunidades profesionales.</p>
                            </Col>
                            <Col md={6} className="text-md-end">
                                <p className="mb-0">&copy; 2025 ConectaPro. Todos los derechos reservados.</p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        </div>
    );
}