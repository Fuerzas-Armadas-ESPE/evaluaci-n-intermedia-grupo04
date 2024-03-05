import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import { supabase } from './supabaseClient';

function ProductRow({ product, getProducts }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(product.Titulo);
    const [description, setDescription] = useState(product.Objetivo);
    const [tema, setTema] = useState(product.Actividad);
    const [calificacion, setCalificacion] = useState(product.Calificacion);
    const [completed, setCompleted] = useState(product.Completado);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function updateProduct() {
        try {
            const { data, error } = await supabase
                .from("Tema")
                .update({
                    Titulo: name,
                    Objetivo: description,
                    Actividad: tema,
                    Calificacion: calificacion
                })
                .eq("id", product.id);

            if (error) {
                throw new Error(error.message);
            }

            setEditing(false);
            setMessage('Elemento actualizado.');

            // Actualiza los estados locales
            getProducts(); // Actualiza la lista de productos
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
                .from("Tema")
                .delete()
                .eq("id", product.id);

            if (error) {
                throw new Error(error.message);
            }

            setMessage('Elemento borrado.');

            // Actualiza la lista de productos después de la eliminación
            getProducts();
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <tr className='text-center'>
            <td>{product.Titulo}</td>
            <td>{product.Objetivo}</td>
            <td>{product.Actividad}</td>
            <td>{calificacion}</td>
            <td>
                <Form.Check
                    type="checkbox"
                    label={completed ? 'Completado' : 'Pendiente'}
                    checked={completed}
                    onChange={() => setCompleted(!completed)}
                />
            </td>
            <td>
                {editing === false ? (
                    <>
                        <Button variant="primary" onClick={() => setEditing(true)}>
                            Editar
                        </Button>
                        <Button variant="primary" onClick={() => deleteProduct()}>
                            Borrar
                        </Button>
                    </>
                ) : (
                    <Card style={{ width: '18rem', backgroundColor: '#f0f0f0' }}>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Tema</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Objetivo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Actividad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tema}
                                        onChange={(e) => setTema(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Calificación</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={calificacion}
                                        onChange={(e) => setCalificacion(parseInt(e.target.value))}
                                    />
                                </Form.Group>
                            
                                <Button variant="primary" onClick={() => updateProduct()}>Actualizar</Button>
                            </Form>
                            {message && (
                                <Alert variant="info" onClose={() => setMessage('')} dismissible>
                                    {message}
                                </Alert>
                            )}
                            {errorMessage && (
                                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                                    {errorMessage}
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </td>
        </tr>
    );
}

export default ProductRow;
