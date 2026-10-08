import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export const AlumnoModal = ({ mostrar, ocultar, guardarAlumno, alumnoAEditar }) => {
  // Estado local para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [edad, setEdad] = useState('');
  const [nivel, setNivel] = useState('Primario');

  // Estados locales para los mensajes de error de cada campo
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorDni, setErrorDni] = useState('');
  const [errorEdad, setErrorEdad] = useState('');

  // Estados para saber si el usuario ya interactuó (tocó/perdió el foco) con los campos
  const [tocoNombre, setTocoNombre] = useState(false);
  const [tocoApellido, setTocoApellido] = useState(false);
  const [tocoDni, setTocoDni] = useState(false);
  const [tocoEdad, setTocoEdad] = useState(false);

  // Cada vez que se abre el modal o cambia el alumno a editar, cargamos los datos y reseteamos errores/interacciones
  useEffect(() => {
    if (alumnoAEditar) {
      setNombre(alumnoAEditar.nombre);
      setApellido(alumnoAEditar.apellido);
      setDni(alumnoAEditar.dni);
      setEdad(String(alumnoAEditar.edad));
      setNivel(alumnoAEditar.nivel);
    } else {
      setNombre('');
      setApellido('');
      setDni('');
      setEdad('');
      setNivel('Primario');
    }
    setErrorNombre('');
    setErrorApellido('');
    setErrorDni('');
    setErrorEdad('');
    setTocoNombre(false);
    setTocoApellido(false);
    setTocoDni(false);
    setTocoEdad(false);
  }, [alumnoAEditar, mostrar]);

  // ----------------------------------------------------
  // FUNCIÓN AUXILIAR PARA FORMATEAR MAYÚSCULAS Y MINÚSCULAS
  // ----------------------------------------------------
  const formatearTextoCapitalizado = (texto) => {
    const palabras = texto.trim().toLowerCase().split(/\s+/);
    let textoFormateado = '';

    for (let indice = 0; indice < palabras.length; indice++) {
      const palabraActual = palabras[indice];
      if (palabraActual.length > 0) {
        const palabraCapitalizada = palabraActual.charAt(0).toUpperCase() + palabraActual.slice(1);
        if (textoFormateado === '') {
          textoFormateado = palabraCapitalizada;
        } else {
          textoFormateado = textoFormateado + ' ' + palabraCapitalizada;
        }
      }
    }

    return textoFormateado;
  };

  // ----------------------------------------------------
  // FUNCIONES DE VALIDACIÓN INDIVIDUALES
  // ----------------------------------------------------

  const validarNombre = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valorLimpio === '') {
      return 'El nombre es obligatorio';
    } else {
      if (letrasRegex.test(valorLimpio) === false) {
        return 'El nombre solo puede contener letras y espacios';
      } else {
        return '';
      }
    }
  };

  const validarApellido = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valorLimpio === '') {
      return 'El apellido es obligatorio';
    } else {
      if (letrasRegex.test(valorLimpio) === false) {
        return 'El apellido solo puede contener letras y espacios';
      } else {
        return '';
      }
    }
  };

  const validarDni = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const numerosRegex = /^\d+$/;

    if (valorLimpio === '') {
      return 'El DNI es obligatorio';
    } else {
      if (numerosRegex.test(valorLimpio) === false) {
        return 'El DNI solo puede contener números';
      } else {
        if (valorLimpio.length < 8) {
          return 'El DNI debe contener exactamente 8 dígitos';
        } else {
          if (valorLimpio.length > 8) {
            return 'No se permiten más de 8 dígitos';
          } else {
            return '';
          }
        }
      }
    }
  };

  const validarEdad = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const numerosRegex = /^\d+$/;

    if (valorLimpio === '') {
      return 'La edad es obligatoria';
    } else {
      if (numerosRegex.test(valorLimpio) === false) {
        return 'La edad solo puede contener números';
      } else {
        const edadNumerica = Number(valorLimpio);
        if (edadNumerica < 3 || edadNumerica > 20) {
          return 'La edad debe ser entre 3 y 20 años';
        } else {
          return '';
        }
      }
    }
  };

  // ----------------------------------------------------
  // MANEJADORES DE CAMBIO (onChange) y FOCO (onBlur)
  // ----------------------------------------------------

  const cambiarNombre = (evento) => {
    const nuevoValor = evento.target.value;
    setNombre(nuevoValor);
    if (tocoNombre) {
      setErrorNombre(validarNombre(nuevoValor));
    }
  };

  const perderFocoNombre = () => {
    setTocoNombre(true);
    setErrorNombre(validarNombre(nombre));
  };

  const cambiarApellido = (evento) => {
    const nuevoValor = evento.target.value;
    setApellido(nuevoValor);
    if (tocoApellido) {
      setErrorApellido(validarApellido(nuevoValor));
    }
  };

  const perderFocoApellido = () => {
    setTocoApellido(true);
    setErrorApellido(validarApellido(apellido));
  };

  const cambiarDni = (evento) => {
    const nuevoValor = evento.target.value;
    if (nuevoValor.length <= 8) {
      setDni(nuevoValor);
      if (tocoDni) {
        setErrorDni(validarDni(nuevoValor));
      }
    }
  };

  const perderFocoDni = () => {
    setTocoDni(true);
    setErrorDni(validarDni(dni));
  };

  const cambiarEdad = (evento) => {
    const nuevoValor = evento.target.value;
    setEdad(nuevoValor);
    if (tocoEdad) {
      setErrorEdad(validarEdad(nuevoValor));
    }
  };

  const perderFocoEdad = () => {
    setTocoEdad(true);
    setErrorEdad(validarEdad(edad));
  };

  // ----------------------------------------------------
  // MANEJO DE ENVÍO Y VALIDACIÓN FINAL
  // ----------------------------------------------------

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    setTocoNombre(true);
    setTocoApellido(true);
    setTocoDni(true);
    setTocoEdad(true);

    const errorNombreActual = validarNombre(nombre);
    const errorApellidoActual = validarApellido(apellido);
    const errorDniActual = validarDni(dni);
    const errorEdadActual = validarEdad(edad);

    setErrorNombre(errorNombreActual);
    setErrorApellido(errorApellidoActual);
    setErrorDni(errorDniActual);
    setErrorEdad(errorEdadActual);

    if (errorNombreActual || errorApellidoActual || errorDniActual || errorEdadActual) {
      return;
    }

    let identificador;
    if (alumnoAEditar) {
      identificador = alumnoAEditar.id;
    } else {
      identificador = Date.now();
    }

    // Aplicamos el formateo para que el nombre y apellido queden con la primera letra en mayúscula
    const nombreFormateado = formatearTextoCapitalizado(nombre);
    const apellidoFormateado = formatearTextoCapitalizado(apellido);

    const datosAlumno = {
      id: identificador,
      nombre: nombreFormateado,
      apellido: apellidoFormateado,
      dni: dni.trim(),
      edad: Number(edad),
      nivel: nivel
    };

    guardarAlumno(datosAlumno);
    ocultar();
  };

  // Textos dinámicos para el título y botón
  let tituloDelModal;
  let botonGuardar;

  if (alumnoAEditar) {
    tituloDelModal = '✏️ Editar Alumno';
    botonGuardar = 'Guardar Cambios';
  } else {
    tituloDelModal = '➕ Registrar Nuevo Alumno';
    botonGuardar = 'Registrar Alumno';
  }

  return (
    <Modal show={mostrar} onHide={ocultar} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-primary">
          {tituloDelModal}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={manejarEnvio} noValidate>
        <Modal.Body>
          {/* Campo Nombre */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan Carlos"
              value={nombre}
              onChange={cambiarNombre}
              onBlur={perderFocoNombre}
              isInvalid={Boolean(tocoNombre && errorNombre)}
            />
            <Form.Control.Feedback type="invalid">
              {errorNombre}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Campo Apellido */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Gómez"
              value={apellido}
              onChange={cambiarApellido}
              onBlur={perderFocoApellido}
              isInvalid={Boolean(tocoApellido && errorApellido)}
            />
            <Form.Control.Feedback type="invalid">
              {errorApellido}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Campo DNI */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 45123456"
              value={dni}
              onChange={cambiarDni}
              onBlur={perderFocoDni}
              maxLength={8}
              isInvalid={Boolean(tocoDni && errorDni)}
            />
            <Form.Control.Feedback type="invalid">
              {errorDni}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Campo Edad */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 14"
              value={edad}
              onChange={cambiarEdad}
              onBlur={perderFocoEdad}
              min={3}
              max={20}
              isInvalid={Boolean(tocoEdad && errorEdad)}
            />
            <Form.Control.Feedback type="invalid">
              {errorEdad}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Campo Nivel Educativo */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Nivel Educativo</Form.Label>
            <Form.Select
              value={nivel}
              onChange={(evento) => setNivel(evento.target.value)}
            >
              <option value="Inicial">Inicial</option>
              <option value="Primario">Primario</option>
              <option value="Secundario">Secundario</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ocultar}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {botonGuardar}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};