import { Card, Placeholder } from "react-bootstrap";

export default function TarjetaEscuelaSkeleton() {
  return (
    <Card className="h-100 overflow-hidden" aria-hidden="true">
      <Placeholder as="div" animation="glow">
        <Placeholder className="d-block w-100" style={{ height: 140 }} />
      </Placeholder>

      <Card.Body className="pt-4">
        <Placeholder as="div" animation="glow">
          <Placeholder xs={9} size="lg" className="d-block mb-2 rounded" />
          <Placeholder xs={6} className="d-block mb-4 rounded" />
          <Placeholder xs={3} className="me-2 rounded-pill" />
          <Placeholder xs={3} className="rounded-pill" />
        </Placeholder>
      </Card.Body>

      <Card.Footer className="bg-light">
        <Placeholder as="div" animation="glow">
          <Placeholder xs={5} className="rounded" />
        </Placeholder>
      </Card.Footer>
    </Card>
  );
}