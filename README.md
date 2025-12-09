# Hotel Reviewing System
Sistemos tikslas - sukurti viešbučių rezervacijos platformą, leidžiančią vartotojams peržiūrėti viešbučius, kambarius ir palikti atsiliepimus. Viešbučių savininkai gali valdyti savo viešbučius bei kambarius, o administratorius gali prižiūrėti vartotojų roles ir sistemą. Sistema skirta supaprastinti viešbučių paiešką bei valdymą vienoje centralizuotoje aplinkoje.

## Sistemos paskirtis
* Vartotojams lengvai rasti viešbučius, juos peržiūrėti ir palikti atsiliepimus.
* Viešbučių savininkams valdyti savo viešbučius, kambarius ir juose pateikiamą informaciją.
* Administratoriui kontroliuoti vartotojų roles ir sistemos saugumą.

## Funkciniai reikalavimai

### Vartotojai
* Vartotojas gali registruotis ir prisijungti.
* Vartotojas gali peržiūrėti viešbučių sąrašą ir jų detales.
* Vartotojas gali peržiūrėti kambarių informaciją.
* Vartotojas gali palikti, redaguoti ir ištrinti savo atsiliepimus.
### Viešbučio savininkas
* Viešbučio savininkas gali pridėti naują viešbutį.
* Savininkas gali redaguoti ir trinti viešbučius.
* Savininkas gali pridėti ir redaguoti kambarius.
* Savininkas gali įkelti kambarių nuotraukas.
### Administratorius
* Administratorius gali peržiūrėti visus vartotojus.
* Administratorius gali keisti vartotojų roles).
* Administratorius negali redaguoti viešbučių ar kambarių.
### Sistema
* Sistema turi autentifikuoti vartotojus naudojant JWT.
* Sistema turi saugoti duomenis Azure SQL duomenų bazėje.
* Sistema turi leisti saugiai įkelti nuotraukas į Azure Blob Storage.
* Sistema turi teikti API paslaugas per HTTPS.
## Sistemos architektūra
<img width="628" height="750" alt="image" src="https://github.com/user-attachments/assets/aae8698d-c3dc-4f80-b24a-341f97d1267e" />

## Sistemos sudedamosios dalys
* Kliento pusė (Front-End): Next.js
* Serverio pusė (Back-End): ASP.NET 9.0
* Duomenų bazė: Azure SQL Database ir Storage Account

## Naudotojo sąsajos projektas
### Admin wireframe'as ir realizacija
<img width="897" height="634" alt="image" src="https://github.com/user-attachments/assets/18ab00ba-f329-478c-a806-466c068dc862" />
<img width="1901" height="940" alt="image" src="https://github.com/user-attachments/assets/2b668609-75e6-4143-b6f2-491efb2840bf" />
### Viešbučio peržiūra wireframe'as ir realizacija
<img width="895" height="643" alt="image" src="https://github.com/user-attachments/assets/b980f05c-79e0-4634-b39f-7aefa69ff128" />
<img width="1902" height="944" alt="image" src="https://github.com/user-attachments/assets/bfedd176-3489-4ee5-8486-117caa305ba5" />
### Viešbučio kambario peržiūra ir realizacija
<img width="895" height="639" alt="image" src="https://github.com/user-attachments/assets/74260ca8-9e7e-449a-be2d-7f14773a259a" />
<img width="1919" height="941" alt="image" src="https://github.com/user-attachments/assets/630b6c3c-52cc-4995-9482-f1aa67c69f62" />

## API specifikacija
[YAML failas](https://github.com/Mayakinn/viesbuciu_rezervacija_frontend/blob/main/swagger.yaml)

GET **/api/Hotel/{id}** – Gauti vieną viešbutį
### Responses:
* 200 OK – Grąžina viešbučio informaciją
* 404 NotFound – Viešbutis nerastas
* 500 Internal Server Error – Serverio klaida
### Response Schema (HotelDto):
```json
{
  "id": 10,
  "name": "Amber Hotel",
  "description": "Viešbutis prie miesto centro",
  "phoneNumber": "+37060000000",
  "city": "Klaipėda",
  "street": "Liepų",
  "streetNumber": "12",
  "parking": true,
  "breakfast": false,
  "ownerId": "user-123",
  "type": 2,
  "rooms": [
    {
      "id": 101,
      "numberOfBeds": 2,
      "squareMeters": 25,
      "toileteries": true
    }
  ],
  "createdAt": "2024-03-10T09:00:00Z",
  "updatedAt": "2024-03-10T09:00:00Z"
}

```
GET **/api/Hotel** – Gauti visus viešbučius
### Responses:
* 200 OK – Grąžina viešbučių informaciją
* 404 NotFound – Viešbučiai nerasti
* 500 Internal Server Error – Serverio klaida
### Response Schema (HotelDto):
```json
{
  "id": 10,
  "name": "Amber Hotel",
  "description": "Viešbutis prie miesto centro",
  "phoneNumber": "+37060000000",
  "city": "Klaipėda",
  "street": "Liepų",
  "streetNumber": "12",
  "parking": true,
  "breakfast": false,
  "ownerId": "user-123",
  "type": 2,
  "createdAt": "2024-03-10T09:00:00Z",
  "updatedAt": "2024-03-10T09:00:00Z"
}
```
GET **/api/Admin/users** – Gauti visus vartotojus
### Responses:
* 200 OK – Grąžina vartotojų sąrašą
* 401 Unauthorized – Vartotojas neautentifikuotas
* 403 Forbidden – Neturi administratoriaus teisių
* 500 Internal Server Error – Serverio klaida
### Response Schema (HotelDto):
```json
[
  {
    "id": "f12a3bcd-45e6-7890-ab12-34cd56ef7890",
    "username": "Jonas",
    "email": "jonas@example.com",
    "role": "User",
    "createdAt": "2024-01-20T12:00:00Z",
    "updatedAt": "2024-01-20T12:00:00Z"
  },
  {
    "id": "a56b7cde-12f3-4567-9abc-def123456789",
    "username": "Admin",
    "email": "admin@example.com",
    "role": "Admin",
    "createdAt": "2024-01-10T09:30:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
]

```
## Apibendrinimas
Projektas sėkmingai įgyvendintas sukuriant pilnai veikiančią viešbučių rezervacijų sistemą. Backend dalis sukurta naudojant .NET ir deploy’inta į Azure, kartu su Azure SQL duomenų baze, užtikrinant patikimą ir skalę palaikančią infrastruktūrą. Frontend sukurtas su Next.js ir patogiai deploy’intas į Vercel, todėl aplikacija yra greita, moderni ir lengvai pasiekiama. Integruota autentifikacija, rolės (Admin, HotelOwner, User), viešbučių ir kambarių valdymas, atsiliepimai bei tvarkinga REST API su OpenAPI specifikacija. Sistema paruošta plėtrai ir realiam naudojimui.
