import { Container, Button } from "react-bootstrap";
import escuelaImg from "../../../img/escuela.webp";

const Banner = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "500px",
        overflow: "hidden",
      }}
    >
      <img
        src={escuelaImg}
        alt="Institución educativa"
        loading="lazy"
        fetchPriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.7)",
        }}
      />

      <Container
        className="position-relative d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: "500px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            width: "100%",
            padding: "2rem",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <h1
            className="fw-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "white",
              textShadow: "2px 2px 4px rgb(0, 0, 0)",
            }}
          >
            Bienvenidos a <b style={{ color: "var(--pi-blue)" }}>Preinscribe</b>
          </h1>

          <p
            className="lead"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "white",
              fontStyle: "italic",
            }}
          >
            <b>
               Encontrá la institución que buscás.
            </b>
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-stretch align-items-sm-center gap-3 mt-4">
            <Button
              size="lg"
              style={{
                background: "var(--pi-amber)",
                borderColor: "var(--pi-amber)",
                color: "white",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--pi-amber-hover)";
                e.currentTarget.style.borderColor = "var(--pi-amber-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--pi-amber)";
                e.currentTarget.style.borderColor = "var(--pi-amber)";
              }}
            >
              Comenzar inscripción
            </Button>

            <Button variant="outline-light" size="lg">
              Explorar institución
            </Button>
          </div>
        </div>
      </Container>
      <div
        style={{
          position: "absolute",
          bottom: "-1px",
          left: 0,
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100px",
            display: "block",
          }}
        >
          <path
            d="
        M0,70
        C240,120 480,120 720,65
        C960,10 1200,10 1440,65
        L1440,120
        L0,120
        Z
      "
            fill="rgba(91, 192, 235, 0.25)"
          />

          <path
            d="
        M0,85
        C240,35 480,35 720,80
        C960,125 1200,125 1440,80
        L1440,120
        L0,120
        Z
      "
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
