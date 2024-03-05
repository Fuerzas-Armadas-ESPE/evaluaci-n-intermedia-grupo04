import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { supabase } from './supabaseClient';
import ProductRow from './productCard';

function Productos() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const { data, error } = await supabase
                .from("Tema")
                .select("*")
                .limit(10);
            if (error) throw error;
            if (data != null) {
                setProducts(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function printProductData() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Informe de Tareas</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
        printWindow.document.write('</head><body>');

        printWindow.document.write('<div class="container">');
        printWindow.document.write('<h2 class="mt-3">Informe de Tareas</h2>');

        printWindow.document.write('<table class="table mt-3">');
        printWindow.document.write('<thead class="thead-dark"><tr><th>Nombre de la Tarea</th><th>Descripción</th><th>Objetivo</th><th>Calificacion</th></tr></thead><tbody>');

        products.forEach((product) => {
            printWindow.document.write(`<tr><td>${product.Titulo}</td><td>${product.Actividad}</td><td>${product.Objetivo}</td></td><td>${product.Calificacion}</td></tr>`);
        });

        let totalCalificacion = 0;
        products.forEach((product) => {
            totalCalificacion += product.Calificacion;
        });

        const averageCalificacion = totalCalificacion / products.length;

        printWindow.document.write('</tbody></table>');

        // Adding a section for details with a table
        printWindow.document.write('<table class="table mt-3">');
        printWindow.document.write(`<thead class="thead-dark"><tr><th colspan="4" class="text-center">Detalles</th></tr></thead><tbody>`);
        if (averageCalificacion > 14) {
            printWindow.document.write(`<tr><td colspan="4" class="text-center">Felicitaciones, Aprobado!</td></tr>`);
        } else {
            printWindow.document.write(`<tr><td colspan="4" class="text-center">Reprobado!</td></tr>`);
        };
        printWindow.document.write(`<tr><td colspan="4" class="text-center"> </td></tr>`);
        printWindow.document.write(`<tr><td colspan="4" class="text-center">Total de Tareas: ${products.length}</td></tr>`);  
        printWindow.document.write(`<tr><td colspan="4" class="text-center"> </td></tr>`);  
        printWindow.document.write(`<tr><td colspan="4" class="text-center"> </td></tr>`); 
        printWindow.document.write(`<tr><td colspan="4" class="text-center">Promedio de Calificaciones: ${averageCalificacion}</td></tr>`);

        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</div>');

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('es-ES');
        printWindow.document.write(`<footer class="fixed-bottom bg-light p-2 text-center">Fecha del Informe: ${formattedDate}</footer>`);

        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Button variant="info" onClick={() => printProductData()}>Reporte</Button>
                </Container>
            </Navbar>
            <h4 className='text-center'></h4>
            <Container>
                <table className="table text-center">
                    <thead className="table-primary">
                        <tr>
                            <th>Tema</th>
                            <th></th>
                            <th></th>
                            <th>Objetivo</th>
                            <th></th>
                            <th>Actividad</th>
                            <th>Calificacion/Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                </table>
                <table className="table">
                    {products.map((product) => (
                        <tbody key={product.id}>
                            <ProductRow product={product} getProducts={getProducts} />
                        </tbody>
                    ))}
                </table>
            </Container>
        </div>
    )
}

export default Productos;
