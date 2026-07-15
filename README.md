<p align="center">
  <img src="./docs/logo.png" alt="Mizania" width="90" />
</p>

<h1 align="center">Mizania</h1>
<p align="center"><em>A minimalist tool for managing student expenses, tracking budgets, and maintaining financial clarity.</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Laravel-FF2D20?style=flat&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Auth-Sanctum-3B82F6?style=flat" alt="Sanctum" />
  <img src="https://img.shields.io/badge/DB-MySQL-4479A1?style=flat&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a> ·
  <a href="#">Live Demo (coming soon)</a>
</p>

---

## Overview

Mizania (from Arabic "ميزانية" — *balance*) is a full-stack personal finance app aimed at students who want a simple, no-friction way to track spending, set budgets, and see where their money is going, without the clutter of full-blown finance apps.

This is a **monorepo** containing both the backend and frontend:

| Folder | Description |
|---|---|
| [`/api`](./api) | Laravel + Sanctum REST API — auth, expenses, categories, budgets |
| [`/frontend`](./frontend) | React + Vite SPA — the UI shown below |

## Preview

**Landing**

![Landing](https://i.imgur.com/Gr0a5yH.png)

**Login / Register**

![Login](https://i.imgur.com/Gr0a5yH.png)
![Register](https://i.imgur.com/5fabYyG.png)

**Dashboard**

![Dashboard](https://i.imgur.com/VOuF8hY.png)

**Expenses**

![Expenses](https://i.imgur.com/v1KCBWl.png)

**Budget Planner**

![Budgets](https://i.imgur.com/qWdS5dZ.png)

## Core Features

- **Authentication** — secure token-based auth (Laravel Sanctum)
- **Expense tracking** — full CRUD, search, and category filtering
- **Category management** — organize spending into custom categories
- **Budgeting** — set a monthly budget, allocate it across categories, and track utilization
- **Insights** — automatic "over budget" / "near limit" flags per category, plus a weekly activity chart and a live budget health indicator on the dashboard

## Architecture

```
┌─────────────────┐        REST API (Sanctum token)        ┌──────────────────┐
│  React + Vite    │  ───────────────────────────────────▶  │  Laravel API      │
│  (/frontend)      │  ◀───────────────────────────────────  │  (/api)            │
└─────────────────┘                                          └──────────┬───────┘
                                                                         │
                                                                    ┌────▼─────┐
                                                                    │  MySQL   │
                                                                    └──────────┘
```

## Getting Started

Clone the repo, then set up each side:

```bash
git clone https://github.com/ziyadelhabachi77/expense-tracker
cd mizania

# 1. Backend
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

```bash
# 2. Frontend (in a separate terminal, from repo root)
cd frontend
npm install
cp .env.example .env
npm run dev
```

- Backend runs at `http://localhost:8000`
- Frontend runs at `http://localhost:5173`

## Tech Stack

| | |
|---|---|
| **Backend** | Laravel, Laravel Sanctum, MySQL, PHPUnit |
| **Frontend** | React, Vite, `<styling/chart libraries>` |
| **Tooling** | Docker (local dev), Git |


## License

This project is licensed under the MIT License.
