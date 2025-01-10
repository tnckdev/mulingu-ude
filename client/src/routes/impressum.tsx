const Impressum = () => {
  return (
    <div className="flex flex-col items-start h-full gap-5 w-1/2">
      <p className="text-3xl font-bold">Impressum</p>
      <p>Verantwortliche Person: Mats Paul Tončik</p>
      <div className="flex flex-col items-start">
        <p>Universität Duisburg-Essen</p>
        <p className="italic">Networked Embedded Systems</p>
        <p>Schützenbahn 70</p>
        <p>45127 Essen</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="font-semibold">Kontakt</p>
        <p>
          Email: <a href="mailto:contact@mulingu.com">contact@mulingu.com</a>
        </p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-start">Diese Anwendung ist im Rahmen der Veranstaltung Web Technologies im Wintersemester 2024/2025 entstanden. Sie verfolgt keinen komerziellen Zweck und dient ausschließlich der Bildung.</p>
        <p className="font-semibold text-start">Sie steht in keiner sonstigen Verbindung zur Universität Duisburg-Essen oder dem Networked Embedded Systems Lehrstuhl!</p>
      </div>
    </div>
  );
};

export default Impressum;
