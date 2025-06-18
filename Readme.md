
# Full Stack MERN (MySQL) App Deployment on AWS (S3 + EC2 + RDS)

This guide walks you through deploying a Full Stack MERN app (React + Node.js + Express + Sequelize + MySQL) on AWS using:
- **Frontend**: React app hosted on **S3 + CloudFront** (with private bucket)
- **Backend**: Node.js API running on **EC2 (Ubuntu 24.04)**
- **Database**: **MySQL** hosted on **Amazon RDS**

---

## 🔧 Prerequisites

- AWS Account
- Custom domain (optional)
- Basic MERN app ready
- Backend converted to use **Sequelize + MySQL**

---

## 1. 🖼 Modify the MERN App

### Backend (Express + Sequelize)

- Use Sequelize for MySQL database connection:
  ```js
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
  });
  ```

- Define model in `models/todo.js`:
  ```js
  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  ```

- Add CORS middleware in `index.js`:
  ```js
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
  });
  ```

---

## 2. 🪣 Deploy Frontend to S3 + CloudFront

### S3 Setup

1. Create S3 bucket (e.g., `my-frontend-bucket`).
2. Turn off “Block all public access” temporarily for testing.
3. Upload React build (`npm run build`).
4. Enable **Static Website Hosting**:
   - Index: `index.html`
   - Error: `index.html`

### CloudFront Setup

1. Create distribution with:
   - Origin: S3 bucket endpoint
   - Viewer protocol policy: Redirect HTTP to HTTPS
2. Optional: Connect domain (e.g., `todo.example.com`) and add SSL cert (via ACM in `us-east-1`)
3. Set CORS on S3:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET"],
       "AllowedOrigins": ["*"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

### React Environment Variable

- Before building, set:
  ```bash
  REACT_APP_API_URL=https://<your-backend-url>
  ```
- Then run:
  ```bash
  npm run build
  ```

---

## 3. 🚀 Backend Deployment on EC2

### EC2 Setup

1. Create custom **VPC** with public/private subnets, IGW, and routing.
2. Launch **Ubuntu EC2** instance in public subnet.
3. Create **EC2 Security Group**:
   - Allow: SSH (22), HTTP (80), Custom TCP 5000 (API)

### Install Node.js, Git

```bash
sudo apt update && sudo apt install nodejs npm git -y
```

### Clone Backend Repo

```bash
git clone <your-repo-url>
cd backend
npm install
```

---

## 4. 🗄️ MySQL Setup on RDS

### RDS Setup

1. Open RDS console → Create database → Standard Create
2. Choose **MySQL**, version 8.0
3. DB instance identifier: `mern-todo`
4. Master username: `admin`, password: `yourpassword`
5. DB instance class: `db.t3.micro` (free tier)
6. Storage: 20 GB (General Purpose)
7. Connect to existing VPC
8. Public access: **No** (Use EC2 within same VPC)
9. Availability zone: same as EC2 (recommended)
10. Create or choose **security group** with inbound access from EC2 SG on port **3306**

### Configure RDS Security Group

- Allow MySQL/Aurora TCP 3306
- Source: **Custom** → Your EC2 security group

### Set `.env` in Backend

```env
DB_NAME=mern_todo
DB_USER=admin
DB_PASS=yourpassword
DB_HOST=<your-rds-endpoint>
PORT=5000
```

### Run Backend

```bash
node index.js
```

You should see:
```
MySQL database synced successfully.
Server running on port 5000
```

Verify from browser: `http://<EC2_PUBLIC_IP>:5000/api/todos`

---

## ✅ Integration: Frontend → Backend

Ensure React app fetches from:
```js
fetch("https://<your-backend-domain-or-ec2-ip>/api/todos")
```

Ensure backend has correct CORS and is accessible from internet.

---

## 🛡️ Optional Enhancements

- ✅ Add Nginx to reverse proxy backend (port 80)
- ✅ Use **Certbot** to add HTTPS (Let's Encrypt)
- ✅ Store DB on **Amazon RDS** (already done)
- ✅ Dockerize with `docker-compose.yml`
- ✅ CI/CD pipeline

---

## 📦 Final Checklist

- [x] Frontend deployed on S3 + CloudFront
- [x] Backend live on EC2
- [x] MySQL working on RDS
- [x] Frontend communicates with backend
- [x] CRUD operations working

---

## 🙌 Credits

Deployed by: **Mahad Munir**  
