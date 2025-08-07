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
### ⚙️ 6. CI/CD via Tekton Pipelines

- **Pipeline Definition:**  
  `.tekton/pipeline.yaml` – Contains the Tekton tasks and steps:
  - Build frontend and backend containers using **Buildah**
  - Tag and push images to the container registry
  - Apply OpenShift deployment (`deployment.yaml`)

- **Trigger Config (Pipelines-as-Code):**  
  `.tekton/push.yaml` – Triggers the pipeline automatically on Git push (e.g., to `main` or a PR)

- **Security:**  
  Uses **Buildah** for non-root, secure image builds inside OpenShift

---

## 🌍 Environment Variables (in OpenShift)

| Container   | Variable             		 	     | Description                      |
|-----------|------------------------------ |----------------------------------|
| Backend-Quarkus| `QUARKUS_DATASOURCE_JDBC_URL`               | JDBC URL to connect to PostgreSQL             |
| Backend-Quarkus| `QUARKUS_DATASOURCE_USERNAME`               | DB username                                   |
| Backend-Quarkus| `QUARKUS_DATASOURCE_PASSWORD`               | DB password                                   |
| Backend-Quarkus| `QUARKUS_DATASOURCE_DB_KIND`                | Database type (`postgresql`)                  |
| Backend-Quarkus| `QUARKUS_HIBERNATE_ORM_DATABASE_GENERATION` | Schema gen strategy (e.g., `drop-and-create`) |
| Backend-Quarkus| `QUARKUS_HTTP_CORS_ORIGINS`                 | Allowed CORS origins                          |
| Keycloak| Frontend-React+Vite| `VITE_API_URL` | Backend API base URL |
| Keycloak| `KC_DB`                   | Database type (e.g., `postgres`)  |
| Keycloak| `KC_DB_URL`               | JDBC connection string            |
| Keycloak| `KC_DB_USERNAME`          | PostgreSQL username               |
| Keycloak| `KC_DB_PASSWORD`          | PostgreSQL password               |
| Keycloak| `KEYCLOAK_ADMIN`          | Initial admin username            |
| Keycloak| `KEYCLOAK_ADMIN_PASSWORD` | Initial admin password            |
| Keycloak| `KC_PROXY`                | Proxy setting (e.g., `edge`)      |
| Keycloak| `KC_HOSTNAME`             | External hostname (used for URLs) |

---
## 🙌 Acknowledgements

Developed during internship at Sri Lanka Telecom PLC, under the guidance of Eng.Sarin Sirimalwatta, Eng.Janagan Balasubramaniam and the Cloud Services Development team.

---

## 📬 Contact

**Sithumini Hansika**  
Email: kamalasirisithumini@gmail.com
GitHub: [github.com/sithuminihk](https://github.com/sithuminihk)
