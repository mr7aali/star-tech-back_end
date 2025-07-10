# 🐘 PostgreSQL Setup Guide for This Project

This guide includes all PostgreSQL commands required to install, configure, and run the `start_tech` database.

---

## 📦 1. Install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

---

## 🚀 2. Start PostgreSQL Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## 👤 3. Switch to PostgreSQL User

```bash
sudo -i -u postgres
```

---

## 🔐 4. Create a User and Set Password

```bash
psql
```

Inside `psql`, run:

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
```

Exit:

```sql
\q
```

---

## 🏗️ 5. Create a Database

```bash
createdb start_tech
```

Or from inside `psql`:

```sql
CREATE DATABASE start_tech OWNER myuser;
```

---

## 🔑 6. Grant Privileges

Inside `psql`:

```sql
GRANT ALL PRIVILEGES ON DATABASE start_tech TO myuser;
\q
```

---

## 🌐 7. Setup `.env` File (for Prisma or Node.js)

Create a `.env` file in the root of your project:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/start_tech"
```

---

## 🔁 8. Prisma Setup (if used)

```bash
npx prisma generate
npx prisma migrate dev
```

Your `schema.prisma` should include:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 🧪 9. Test the Database Connection

```bash
psql "postgresql://myuser:mypassword@localhost:5432/start_tech"
```

You should see the psql prompt.

---

## 📋 10. Common `psql` Commands

| Command              | Description                       |
|----------------------|-----------------------------------|
| `\l`                 | List all databases                |
| `\c start_tech`      | Connect to `start_tech` database |
| `\dt`                | List tables                       |
| `\d tablename`       | Describe a table structure        |
| `\du`                | List roles/users                  |
| `\q`                 | Quit psql                         |

---

## 💾 11. Backup and Restore

### Backup the database:
```bash
pg_dump -U myuser -d start_tech -f backup.sql
```

### Restore the database:
```bash
psql -U myuser -d start_tech -f backup.sql
```

---

## 🧽 12. Uninstall PostgreSQL (if needed)

```bash
sudo systemctl stop postgresql
sudo apt --purge remove postgresql postgresql-*
sudo rm -rf /etc/postgresql /etc/postgresql-common /var/lib/postgresql
sudo deluser postgres
sudo delgroup postgres
```

---

## ✅ Done

Your PostgreSQL database `start_tech` is now ready to use with your project.
