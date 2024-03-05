import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';

// Importa tu imagen
import imagenLogo from '../src/img/logo.png';

function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Correo registrado correctamente.");
    setTimeout(() => {
      navigate('/productCard');
    }, 2000); // Redirige después de 2 segundos
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "" }}> {/* Cambia el color de fondo */}
      <Card style={{ width: "30rem", backgroundColor: "#e0e0e0", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}> {/* Ajusta la dimensión del formulario */}
        <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Agrega la imagen */}
          <img src={imagenLogo} alt="Logo" style={{ width: "70%", marginBottom: "20px" }} />
          <Card.Title style={{ textAlign: "center", color: "#333" }}>Iniciar Sesión</Card.Title> {/* Corrige la ortografía */}
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label> {/* Corrige la ortografía */}
              <Form.Control
                type="email"
                name="email"
                placeholder="ejemplo@hotmail.com"
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "1px solid #ccc", borderRadius: "5px", width: "100%" }}
              />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button variant="contained" type="submit" style={{ backgroundColor: "#4caf50", borderColor: "#4caf50" }}> {/* Cambia el color del botón */}
                Ingresar
              </Button>
            </div>
          </Form>
          {message && (
            <Alert variant="success" style={{ marginTop: "20px" }}>
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
