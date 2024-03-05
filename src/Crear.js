import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { supabase } from './supabaseClient';

function Crear() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tema, setTema] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("Tema")
        .insert({
          Titulo: name,
          Objetivo: description,
          Actividad: tema
        })
        .single();

      if (error) throw error;

      // Mostrar el mensaje de éxito
      setShowSuccessMessage(true);

      // Limpiar los campos después de crear el tema
      setName("");
      setDescription("");
      setTema("");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6}>
          <Card style={{ backgroundColor: '#f0f0f0', padding: '20px', border: 'none', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Crear Tema</h3>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Tema</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Objetivo</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="button" onClick={() => createProduct()} className="mb-3">
                  Crear
                </Button>

                {/* Mensaje de éxito */}
                {showSuccessMessage && (
                  <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
                    Tema creado correctamente.
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Crear;
