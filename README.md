# 🎓 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** for managing school data with proximity-based sorting.

---

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── config/
│   │   ├── db.js           # MySQL connection pool
│   │   └── setupDb.js      # Database & table creation script
│   ├── controllers/
│   │   └── school.controller.js  # Business logic for school APIs
│   ├── middleware/
│   │   └── validation.js   # Input validation using express-validator
│   ├── routes/
│   │   └── school.routes.js      # Route definitions
│   └── server.js           # Express app entry point
├── .env.example            # Environment variable template
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd school-management-api
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```
Edit `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
PORT=3000
```

### 3. Set Up the Database
```bash
npm run db:setup
```
This automatically creates the `school_management` database and `schools` table.

### 4. Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:3000**

---

## 📡 API Endpoints

### `POST /addSchool`
Adds a new school to the database.

**Request Body (JSON):**
```json
{
  "name": "Springfield Elementary",
  "address": "123 Main St, Springfield",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Springfield Elementary",
    "address": "123 Main St, Springfield",
    "latitude": 28.6139,
    "longitude": 77.209
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "School name is required" }
  ]
}
```

---

### `GET /listSchools`
Returns all schools sorted by proximity to the given coordinates.

**Query Parameters:**
| Parameter | Type  | Required | Description          |
|-----------|-------|----------|----------------------|
| latitude  | Float | ✅       | User's latitude      |
| longitude | Float | ✅       | User's longitude     |

**Example Request:**
```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Schools retrieved and sorted by proximity",
  "user_location": { "latitude": 28.6139, "longitude": 77.209 },
  "total": 2,
  "data": [
    {
      "id": 1,
      "name": "Nearest School",
      "address": "Near Location",
      "latitude": 28.615,
      "longitude": 77.21,
      "distance_km": 0.1542
    },
    {
      "id": 2,
      "name": "Farther School",
      "address": "Far Location",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "distance_km": 12.3456
    }
  ]
}
```

---

## 🗃️ Database Schema

```sql
CREATE TABLE schools (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT         NOT NULL,
  longitude   FLOAT         NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

---

## 📐 Distance Calculation

Uses the **Haversine Formula** to calculate the great-circle distance between two points on a sphere (Earth), providing accurate geographic distances in kilometres.

---

## ✅ Validation Rules

| Field     | Rules                                          |
|-----------|------------------------------------------------|
| name      | Non-empty string, max 255 chars                |
| address   | Non-empty string, max 500 chars                |
| latitude  | Float, range: -90 to 90                        |
| longitude | Float, range: -180 to 180                      |

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (via `mysql2`)
- **Validation**: express-validator
