# 🌐 Resource Portal App

This full-stack web application provides a centralized platform to **view, manage, and update resource utilization data** across multiple cloud platforms. Access and functionality are controlled based on **user roles**, integrated via **Keycloak authentication**.

## 📌 Features

- **Role-Based Dashboards**
  - 👁️ Viewer: View platform utilization data
  - 🛠️ Operator: Edit platform resource details
  - 🧑‍💼 Super Admin: Full CRUD access to platforms and resource attributes

- **Resource Tracking**:
  - Platform Name
  - Cloud Type
  - Location
  - Resource Pool
  - Memory, vCPU, and Storage usage

- **Authentication & Authorization**
  - Integrated with **Keycloak** (JWT-based)
  - Role mapping via custom token mappers
  - Secure access to protected routes

- **CI/CD**
  - Automated pipelines using **Tekton Pipelines-as-Code**
  - Container builds with **Buildah**
  - Deployed on **OpenShift** as a multi-container pod (frontend + backend)

---

## 🛠️ Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | React + Vite                    |
| Backend     | Java + Quarkus                  |
| Auth        | Keycloak                        |
| Database    | PostgreSQL                      |
| CI/CD       | Tekton Pipelines, Buildah       |
| Deployment  | OpenShift (multi-container pod) |

---

## 📂 Project Structure

```
root/
├── client/           # React frontend (port 5173)
│   └── Dockerfile
├── server/           # Quarkus backend (port 8080)
│   └── Dockerfile
├── .tekton/          # CI/CD pipeline config (push.yaml)
├── deployment.yaml   # OpenShift deployment (multi-container pod)
└── README.md
```

---

## 🚀 Setup & Deployment

### 🧑‍💻 1. Clone the Repository

```bash
git clone https://github.com/SithuminiHK/Resource_allocation_Portal_on_OpenShift.git
cd resource-portal-app
```

---

### ⚙️ 2. Run Locally (Dev Mode)

#### Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

#### Backend (Quarkus)

```bash
cd server
./mvnw quarkus:dev
```

---

### 🔐 3. Keycloak Setup (Optional for Local Dev)

- Roles:
  - `viewer`
  - `operator`
  - `super-admin`

- Custom token mapper configured to map `realm_access.roles` → `groups` claim in the JWT.

---

### 📦 4. Docker Build (Prod)

#### Frontend

```bash
cd client
docker build -t sithuminihk/client-app:v18 .
```

#### Backend

```bash
cd server
docker build -t sithuminihk/server-app:vx .
```

---

### 🚢 5. Deploy to OpenShift

- Apply `deployment.yaml` via OpenShift Console or CLI (`oc apply -f deployment.yaml`)
- It contains:
  - Two containers in one pod (client + server)
  - Service and Route for each
- Secrets for DB and Keycloak should be configured in OpenShift in advance

---

### ⚙️ 6. CI/CD via Tekton

- File: `.tekton/push.yaml`
- Automatically builds and deploys on push
- Uses `Buildah` to build images securely in OpenShift

---

## 🌍 Environment Variables (in OpenShift)

| Container   | Variable             		 	     | Description                      |
|-----------|------------------------------ |----------------------------------|
| Server        | `QUARKUS_DATASOURCE_JDBC_URL`               | JDBC URL to connect to PostgreSQL             |
| Server        | `QUARKUS_DATASOURCE_USERNAME`               | DB username                                   |
| Server        | `QUARKUS_DATASOURCE_PASSWORD`               | DB password                                   |
| Server        | `QUARKUS_DATASOURCE_DB_KIND`                | Database type (`postgresql`)                  |
| Server        | `QUARKUS_HIBERNATE_ORM_DATABASE_GENERATION` | Schema gen strategy (e.g., `drop-and-create`) |
| Server        | `QUARKUS_HTTP_CORS_ORIGINS`                 | Allowed CORS origins                          |


| Backend   | `QUARKUS_DATASOURCE_URL`     | PostgreSQL DB URL             |
| Backend   | `KEYCLOAK_URL`                           | Keycloak auth server URL         |
| Backend   | `KEYCLOAK_REALM`                      | Realm name                       |
| Backend   | `KEYCLOAK_CLIENT_ID`                 | Client ID for Quarkus            |
| Frontend  | `VITE_APP_URL`                             | Client ID for Quarkus            |
| Frontend  | `VITE_KEYCLOAK_URL`                   | Keycloak auth server URL         |
| Frontend  | `VITE_CLIENT_ID`                            | Client ID                        |
| Frontend  | `VITE_REALM`                                 | Realm                            |

---

## 📝 Known Issues / To-Do

- [ ] Improve error handling on unauthorized routes
- [ ] Implement platform delete confirmation modal
- [ ] Add loading state indicators
- [ ] Refactor repetitive form components

---

## 🙌 Acknowledgements

Developed during internship at **[Organization Name]**, under the guidance of [Supervisor Name] and the [DevOps / Cloud] team.

---

## 📬 Contact

**Sithumini Hansika**  
Email: [your-email@example.com]  
GitHub: [github.com/sithuminihk](https://github.com/sithuminihk)
