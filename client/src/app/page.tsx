export default function Home() {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Wywiezione?</h1>
          <p className="col-md-12 fs-4"> To aplikacja mobilna i webowa, która umożliwia mieszkańcom śledzenie statusu wywozu odpadów w czasie rzeczywistym, zgłaszanie problemów i zarządzanie harmonogramami. Pracownicy mają dostęp do panelu zadaniowego, a administratorzy mogą efektywnie zarządzać zespołami i harmonogramami.</p>
        </div>
      </div>
      <div className="row align-items-md-stretch mt-5">
        <div className="col-md-6 mb-3">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>FRONTEND</h2>
            <p>Nasz frontend wykorzystuje <strong>Next.js</strong>, nowoczesny framework Reacta, który oferuje renderowanie po stronie serwera, generowanie statycznych stron oraz hydratację po stronie klienta. Zapewnia doskonałą wydajność, wsparcie dla SEO i wygodę pracy dla programistów.</p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>BACKEND</h2>
            <p>Backend został stworzony przy użyciu <strong>Nest.js</strong>, progresywnego frameworka Node.js zaprojektowanego do budowy wydajnych i skalowalnych aplikacji serwerowych. Wykorzystuje TypeScript, wspiera modułową architekturę oraz integrację z bazami danych przy użyciu TypeORM.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
//EOF