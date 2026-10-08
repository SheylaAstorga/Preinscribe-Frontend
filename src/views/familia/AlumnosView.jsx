import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { AlumnoModal } from '../../components/familia/AlumnoModal';

export const AlumnosView = () => {
  // Estado local con la lista inicial de alumnos
  const [listaAlumnos, setListaAlumnos] = useState([
    { id: 1, nombre: 'Mateo', apellido: 'Gómez', dni: '45123456', edad: 14, nivel: 'Secundario' },
    { id: 2, nombre: 'Sofía', apellido: 'Gómez', dni: '48765432', edad: 11, nivel: 'Primario' }
  ]);

  // Estados para controlar la visibilidad del modal y el alumno seleccionado para editar
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alumnoAEditar, setAlumnoAEditar] = useState(null);

  const abrirModalParaCrear = () => {
    setAlumnoAEditar(null); // null indica que es un alta nueva
    setMostrarModal(true);
  };

  const abrirModalParaEditar = (alumno) => {
    setAlumnoAEditar(alumno);
    setMostrarModal(true);
  };

  const ocultarModal = () => {
    setMostrarModal(false);
    setAlumnoAEditar(null);
  };

  // Función para guardar el alumno (crea uno nuevo o actualiza uno existente)
  const guardarAlumno = (alumnoFormulario) => {
    if (alumnoAEditar) {
      // Si estamos editando, reemplazamos el alumno que coincide con el identificador
      const alumnosActualizados = listaAlumnos.map((alumnoActual) => {
        if (alumnoActual.id === alumnoFormulario.id) {
          return alumnoFormulario;
        } else {
          return alumnoActual;
        }
      });
      setListaAlumnos(alumnosActualizados);
    } else {
      // Si es un alta nueva, lo agregamos al final del arreglo
      setListaAlumnos([...listaAlumnos, alumnoFormulario]);
    }
  };

  // Función para eliminar un alumno de la lista con confirmación previa
  const eliminarAlumno = (idAlumno) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este alumno?');
    
    if (confirmacion) {
      const alumnosFiltrados = listaAlumnos.filter((alumnoActual) => {
        return alumnoActual.id !== idAlumno;
      });
      setListaAlumnos(alumnosFiltrados);
    }
  };

  return (
    <Container className="py-4">
      {/* Cabecera de la sección */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Mis Hijos / Alumnos</h2>
          <p className="text-muted mb-0">Gestioná la información escolar de los menores a tu cargo para las preinscripciones.</p>
        </div>
        <Button variant="primary" onClick={abrirModalParaCrear} className="d-flex align-items-center gap-2">
          ➕ Registrar Nuevo Alumno
        </Button>
      </div>

      {/* Listado en Tarjetas utilizando la grilla de Bootstrap */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {listaAlumnos.map((alumno) => (
          <Col key={alumno.id}>
            <Card className="shadow-sm h-100 border-0">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fw-bold text-primary mb-0">
                    {alumno.nombre} {alumno.apellido}
                  </Card.Title>
                  <Badge bg="info" text="dark">
                    {alumno.nivel}
                  </Badge>
                </div>
                
                <Card.Text className="text-secondary mt-2 mb-4">
                  <strong>DNI:</strong> {alumno.dni} <br />
                  <strong>Edad:</strong> {alumno.edad} años
                </Card.Text>

                {/* Acciones de la tarjeta */}
                <div className="mt-auto d-flex gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="w-100"
                    onClick={() => abrirModalParaEditar(alumno)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="w-100"
                    onClick={() => eliminarAlumno(alumno.id)}
                  >
                    🗑️ Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Componente del Modal de Alta y Edición */}
      <AlumnoModal 
        mostrar={mostrarModal} 
        ocultar={ocultarModal} 
        guardarAlumno={guardarAlumno} 
        alumnoAEditar={alumnoAEditar} 
      />
    </Container>
  );
};