
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PreinscripcionNueva = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const escuelaId = searchParams.get("escuela");

  const [alumnos] = useState(() => {
    const guardados = localStorage.getItem("alumnos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [alumnoId, setAlumnoId] = useState("");
  const [vacanteId, setVacanteId] = useState("");

  const [documentos, setDocumentos] = useState({
    dniFrente: null,
    dniDorso: null,
    partidaNacimiento: null,
  });

  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [solicitudGuardada, setSolicitudGuardada] = useState(false);
  const [numeroSolicitud, setNumeroSolicitud] = useState(null);

  const alumnoSeleccionado = alumnos.find(
    (alumno) => alumno.id === Number(alumnoId)
  );

  const manejarDocumento = (e) => {
    const { name, files } = e.target;

    setDocumentos((anteriores) => ({
      ...anteriores,
      [name]: files[0] || null,
    }));
  };

  const validarFormulario = (e) => {
    e.preventDefault();

    if (!alumnoSeleccionado) {
      alert("Seleccioná un alumno.");
      return;
    }

    if (!vacanteId) {
      alert("Seleccioná una vacante.");
      return;
    }

    if (
      !documentos.dniFrente ||
      !documentos.dniDorso ||
      !documentos.partidaNacimiento
    ) {
      alert("Debés adjuntar todos los documentos requeridos.");
      return;
    }

    setMostrarResumen(true);
  };

  const confirmarPreinscripcion = () => {
    const usuarioActivo = JSON.parse(
      localStorage.getItem("usuarioActivo") || "null"
    );

    const preinscripcionesGuardadas = JSON.parse(
      localStorage.getItem("preinscripciones") || "[]"
    );

    const nuevaSolicitud = {
      id: Date.now(),
      numeroSolicitud: `PRE-${Date.now()}`,
      escuelaId: Number(escuelaId),
      alumnoId: alumnoSeleccionado.id,
      alumnoNombre: `${alumnoSeleccionado.nombre} ${alumnoSeleccionado.apellido}`,
      alumnoDni: alumnoSeleccionado.dni,
      nivel: alumnoSeleccionado.nivel,
      gradoAno: alumnoSeleccionado.gradoAno,
      vacanteId: Number(vacanteId),
      cicloLectivo: 2027,
      estado: "PENDIENTE",
      fechaSolicitud: new Date().toLocaleDateString("es-AR"),
      usuarioEmail: usuarioActivo?.email || "",
      documentos: {
        dniFrente: documentos.dniFrente.name,
        dniDorso: documentos.dniDorso.name,
        partidaNacimiento: documentos.partidaNacimiento.name,
      },
    };

    const nuevasSolicitudes = [
      ...preinscripcionesGuardadas,
      nuevaSolicitud,
    ];

    localStorage.setItem(
      "preinscripciones",
      JSON.stringify(nuevasSolicitudes)
    );

    setNumeroSolicitud(nuevaSolicitud.numeroSolicitud);
    setSolicitudGuardada(true);
  };

  if (solicitudGuardada) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm border-0 text-center mx-auto">
          <div className="card-body p-5">
            <div className="text-success mb-3">
              <i className="bi bi-check-circle-fill display-3"></i>
            </div>

            <h2 className="fw-bold mb-3">
              ¡Preinscripción registrada!
            </h2>

            <p className="text-muted">
              La solicitud se registró correctamente y quedó pendiente de
              revisión por parte de la institución.
            </p>

            <div className="alert alert-success mt-4">
              <strong>Número de solicitud:</strong>
              <br />
              {numeroSolicitud}
              <br />
              <strong>Estado:</strong> PENDIENTE
            </div>

            <button
              className="btn btn-primary px-4 mt-3"
              onClick={() => navigate("/familia/solicitudes")}
            >
              Ver mis solicitudes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <button
        type="button"
        className="btn btn-outline-secondary mb-3"
        onClick={() => {
          if (mostrarResumen) {
            setMostrarResumen(false);
          } else {
            navigate(-1);
          }
        }}
      >
        Volver
      </button>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="mb-2">Nueva preinscripción</h2>

          <p className="text-muted">
            Completá los datos para iniciar la solicitud de preinscripción.
          </p>

          <hr />

          {!mostrarResumen ? (
            <form onSubmit={validarFormulario}>
              {/* PASO 1 */}
              <h5 className="fw-bold mb-3">1. Datos de la escuela</h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Escuela seleccionada
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={escuelaId || "No se seleccionó una escuela"}
                  readOnly
                />
              </div>

              <hr className="my-4" />

              {/* PASO 2 */}
              <h5 className="fw-bold mb-3">2. Selección del alumno</h5>

              {alumnos.length === 0 ? (
                <div className="alert alert-warning">
                  <p className="mb-2">
                    No tenés alumnos registrados. Primero debés registrar
                    un alumno.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/familia/alumnos")}
                  >
                    Registrar alumno
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Seleccioná el alumno:
                    </label>

                    <select
                      className="form-select"
                      value={alumnoId}
                      onChange={(e) => {
                        setAlumnoId(e.target.value);
                        setVacanteId("");
                        setDocumentos({
                          dniFrente: null,
                          dniDorso: null,
                          partidaNacimiento: null,
                        });
                      }}
                    >
                      <option value="">Seleccionar alumno...</option>

                      {alumnos.map((alumno) => (
                        <option key={alumno.id} value={alumno.id}>
                          {alumno.nombre} {alumno.apellido} - DNI: {alumno.dni}
                        </option>
                      ))}
                    </select>
                  </div>

                  {alumnoSeleccionado && (
                    <>
                      <div className="alert alert-info mt-3">
                        <h6 className="fw-bold">Alumno seleccionado</h6>

                        <p className="mb-1">
                          <strong>Nombre:</strong>{" "}
                          {alumnoSeleccionado.nombre}{" "}
                          {alumnoSeleccionado.apellido}
                        </p>

                        <p className="mb-1">
                          <strong>DNI:</strong> {alumnoSeleccionado.dni}
                        </p>

                        <p className="mb-1">
                          <strong>Edad:</strong> {alumnoSeleccionado.edad} años
                        </p>

                        <p className="mb-0">
                          <strong>Nivel:</strong> {alumnoSeleccionado.nivel}
                        </p>
                      </div>

                      <hr className="my-4" />

                      {/* PASO 3 */}
                      <h5 className="fw-bold mb-3">3. Datos académicos</h5>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Nivel educativo
                          </label>

                          <input
                            className="form-control"
                            value={alumnoSeleccionado.nivel || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Grado / Año
                          </label>

                          <input
                            className="form-control"
                            value={alumnoSeleccionado.gradoAno || ""}
                            readOnly
                          />
                        </div>
                      </div>

                      <hr className="my-4" />

                      {/* PASO 4 */}
                      <h5 className="fw-bold mb-3">
                        4. Período de inscripción
                      </h5>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Ciclo lectivo
                          </label>

                          <input
                            className="form-control"
                            value="2027"
                            readOnly
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Estado de inscripción
                          </label>

                          <input
                            className="form-control text-success fw-semibold"
                            value="Inscripciones abiertas"
                            readOnly
                          />
                        </div>

                        <div className="col-12">
                          <div className="alert alert-info mb-0">
                            <strong>Período habilitado:</strong>
                            <br />
                            Desde el 01/11/2026 hasta el 28/02/2027.
                            <br />
                            <small>
                              Ciclo lectivo 2027. Datos de demostración.
                            </small>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />

                      {/* PASO 5 */}
                      <h5 className="fw-bold mb-3">
                        5. Selección de vacante
                      </h5>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Nivel educativo
                          </label>

                          <input
                            className="form-control"
                            value={alumnoSeleccionado.nivel || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Grado / Año
                          </label>

                          <input
                            className="form-control"
                            value={alumnoSeleccionado.gradoAno || ""}
                            readOnly
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-semibold">
                            Vacantes disponibles
                          </label>

                          <select
                            className="form-select"
                            value={vacanteId}
                            onChange={(e) => setVacanteId(e.target.value)}
                          >
                            <option value="">Seleccionar vacante...</option>
                            <option value="1">
                              Vacante disponible - Ciclo lectivo 2027
                            </option>
                          </select>

                          <small className="text-muted">
                            Disponibilidad simulada para esta demostración.
                          </small>
                        </div>
                      </div>

                      <div className="alert alert-success mt-3 mb-0">
                        <strong>Vacantes disponibles:</strong> 1 para esta
                        demostración.
                      </div>

                      <hr className="my-4" />

                      {/* PASO 6 */}
                      <h5 className="fw-bold mb-2">
                        6. Documentación requerida
                      </h5>

                      <p className="text-muted">
                        Adjuntá los documentos correspondientes al alumno.
                        Podés seleccionar archivos PDF o imágenes.
                      </p>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            DNI del alumno (frente)
                          </label>

                          <input
                            type="file"
                            name="dniFrente"
                            className="form-control"
                            accept=".pdf,image/*"
                            onChange={manejarDocumento}
                          />

                          {documentos.dniFrente && (
                            <small className="text-success d-block mt-1">
                              Archivo: {documentos.dniFrente.name}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            DNI del alumno (dorso)
                          </label>

                          <input
                            type="file"
                            name="dniDorso"
                            className="form-control"
                            accept=".pdf,image/*"
                            onChange={manejarDocumento}
                          />

                          {documentos.dniDorso && (
                            <small className="text-success d-block mt-1">
                              Archivo: {documentos.dniDorso.name}
                            </small>
                          )}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold">
                            Partida de nacimiento
                          </label>

                          <input
                            type="file"
                            name="partidaNacimiento"
                            className="form-control"
                            accept=".pdf,image/*"
                            onChange={manejarDocumento}
                          />

                          {documentos.partidaNacimiento && (
                            <small className="text-success d-block mt-1">
                              Archivo: {documentos.partidaNacimiento.name}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="alert alert-warning mt-3">
                        <strong>Importante:</strong> Los requisitos son
                        ilustrativos para esta demostración.
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                        >
                          Revisar preinscripción
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </form>
          ) : (
            <>
              {/* PASO 7 */}
              <h5 className="fw-bold mb-3">
                7. Resumen de la preinscripción
              </h5>

              <div className="alert alert-info">
                Revisá que todos los datos sean correctos antes de confirmar.
              </div>

              <div className="card bg-light border-0 mb-3">
                <div className="card-body">
                  <h6 className="fw-bold">Datos de la escuela</h6>
                  <p className="mb-0">Identificador: {escuelaId}</p>
                </div>
              </div>

              <div className="card bg-light border-0 mb-3">
                <div className="card-body">
                  <h6 className="fw-bold">Datos del alumno</h6>
                  <p className="mb-1">
                    <strong>Nombre:</strong> {alumnoSeleccionado.nombre}{" "}
                    {alumnoSeleccionado.apellido}
                  </p>
                  <p className="mb-1">
                    <strong>DNI:</strong> {alumnoSeleccionado.dni}
                  </p>
                  <p className="mb-1">
                    <strong>Nivel:</strong> {alumnoSeleccionado.nivel}
                  </p>
                  <p className="mb-0">
                    <strong>Grado / Año:</strong>{" "}
                    {alumnoSeleccionado.gradoAno}
                  </p>
                </div>
              </div>

              <div className="card bg-light border-0 mb-3">
                <div className="card-body">
                  <h6 className="fw-bold">Datos de inscripción</h6>
                  <p className="mb-1">
                    <strong>Ciclo lectivo:</strong> 2027
                  </p>
                  <p className="mb-0">
                    <strong>Estado inicial:</strong> PENDIENTE
                  </p>
                </div>
              </div>

              <div className="card bg-light border-0 mb-3">
                <div className="card-body">
                  <h6 className="fw-bold">Documentación adjuntada</h6>
                  <p className="mb-1">
                    <strong>DNI frente:</strong> {documentos.dniFrente.name}
                  </p>
                  <p className="mb-1">
                    <strong>DNI dorso:</strong> {documentos.dniDorso.name}
                  </p>
                  <p className="mb-0">
                    <strong>Partida de nacimiento:</strong>{" "}
                    {documentos.partidaNacimiento.name}
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-between flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setMostrarResumen(false)}
                >
                  Modificar datos
                </button>

                <button
                  type="button"
                  className="btn btn-success px-4"
                  onClick={confirmarPreinscripcion}
                >
                  Confirmar preinscripción
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreinscripcionNueva;
