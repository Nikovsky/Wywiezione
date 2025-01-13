---
creation: 2025-01-08
tag: [documentation, pl]
---

# **WYWIEZIONE?**
to aplikacja webowa i mobilna umożliwiająca mieszkańcom śledzenie statusu wywozu odpadów w czasie rzeczywistym, zgłaszanie problemów oraz zarządzanie harmonogramami. Projekt wspiera także pracowników i administratorów w efektywnym zarządzaniu zadaniami oraz zespołami.

## TECHNOLOGIE
Projekt wykorzystuje nowoczesne technologie zapewniające skalowalność, wydajność oraz łatwą rozbudowę:

| **Komponent**   | **Technologia**                | **Opis**                                                                |
| --------------- | ------------------------------ | ----------------------------------------------------------------------- |
| **Backend**     | Nest.js + Node.js + Express.js | Obsługa API, logika biznesowa i uwierzytelnianie (JWT).                 |
| **Frontend**    | Next.js                        | Dynamiczny, przyjazny użytkownikowi i responsywny interfejs webowy.     |
| **Mobile**      | React Native                   | Aplikacja mobilna na Android i iOS, obsługa map i zgłaszanie problemów. |
| **Baza danych** | MySQL (XAMPP)                  | Początkowo hostowana lokalnie z XAMPP, skalowalna na większą bazę.      |

## Planowane funkcje

### Dla mieszkańców:
- Śledzenie statusu wywozu odpadów w czasie rzeczywistym.
- Zarządzanie harmonogramami.
- Zgłaszanie problemów związanych z wywozem.

### Dla pracowników:
- Panel zarządzania zadaniami.
- Podgląd harmonogramów i zgłoszeń.

### Dla administratorów:
- Zarządzanie zespołami i harmonogramami.
- Tworzenie raportów i podsumowań.


## SERVER

```powershell
npm init -y
npm install express body-parser cors mysql2 dotenv nodemon
```

## CLIENT
Would you like to use TypeScript? ... **No** / Yes
Would you like to use ESLint? ... No / **Yes**
Would you like to use Tailwind CSS? ... **No** / Yes
Would you like your code inside a `src/` directory? ... No / **Yes**
Would you like to use App Router? (recommended) ... No / **Yes**
Would you like to use Turbopack for `next dev`? ... No / **Yes**
Would you like to customize the import alias (`@/*` by default)? ... **No** / Yes

```powershell
npx create-next-app .
npm install bootstrap axios
```