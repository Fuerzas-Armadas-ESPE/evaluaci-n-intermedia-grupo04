import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Productos from '../Productos';
import Crear from '../Crear';
import Inicio from '../Inicio';
import Login from '../Login';

function Navegacion() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark"> {/* Se cambió el color de fondo a "primary" y el texto a "dark" */}
        <Container>
          <Navbar.Brand>Sistema Docente</Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Link to="/productCard" className="nav-link">Actividades</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/crear" className="nav-link">Ingresar tema</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" className="nav-link">Login</Link> {/* Se corrigió el espacio en el enlace */}
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/productCard" element={<Productos />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Navegacion;
