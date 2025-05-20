# Moment 1 i kursen DT207G, Backend-baserad webbutveckling

## Uppgift 1
Detta är en API som är byggt med Express och används för att hantera mina joberfarenheter. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

### Installation, databas
Detta API använder en MySQL-databas. Installera nödvändiga npm paket såsom (express, mysql, cors, nodemon). Kör intallation fil install.js för att skapa tabellen workexperience enligt nedanstående:

| Tabellnamn | Fält |
|------------|------|
| workexperience | id INT PRIMARY KEY AUTO_INCREMENT, companyname VARCHAR(200), jobtitle VARCHAR(200), location VARCHAR(200), startdate DATE, enddate DATE, description TEXT |

### Användning
Nedan finns hur man använder APIet på olika sätt:
| Metod | Ändpunkt | Beskrivning |
|-------| ---------|-------------|
| GET | /api/workexperience | Hämtar alla tillgängliga erfarenheter |
| GET | /api/workexperience:ID | Hämtar en specifik erfarenhet med angivit ID|
| POST | /api/workexperience | Lagrar en ny erfarenhet |
| PUT | /api/workexperience:ID | Uppdaterar en befintlig erfarenhet med angivit ID |
| DELETE | /api/workexperience:ID | Raderar en befintlig erfarenhet med angivit ID |
### Tommy Issa, tois2401