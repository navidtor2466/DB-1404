# 🏔️ همسفر میرزا | Hamsafar Mirza

> پلتفرم اشتراک تجربیات سفر و یافتن همسفر  
> Travel Experience Sharing & Companion Finding Platform

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

---

## 📖 About

**Hamsafar Mirza** is a social travel guide web application where users can:
- 📝 Share travel experiences (visited or imagined places)
- 🗺️ Discover tourist attractions across Iranian cities
- 👥 Find travel companions for upcoming trips
- ⭐ Rate and comment on experiences
- 👤 Follow other travelers and manage profiles

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Windows

```powershell
# Open PowerShell or Command Prompt
cd path\to\DB-1404

# Install dependencies
npm install

# Run development server (auto mode)
npm run dev

# Force mock data
npm run dev:mock

# Force Supabase (requires env)
npm run dev:supabase

# Seed Supabase with mock data (optional)
npm run seed:supabase
```

### Linux / macOS

```bash
# Open Terminal
cd path/to/DB-1404

# Install dependencies
npm install

# Run development server (auto mode)
npm run dev

# Force mock data
npm run dev:mock

# Force Supabase (requires env)
npm run dev:supabase

# Seed Supabase with mock data (optional)
npm run seed:supabase
```

### Access the App
Open [http://localhost:5173](http://localhost:5173) in your browser. The root URL redirects to `/app`.

### Build for Production
```bash
npm run build
```

---


## ⚙️ Environment Setup (Database Connection)

To connect to Supabase database, create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Optional data mode: mock | supabase | auto (default)
VITE_DATA_SOURCE=auto
```

Data modes:
- `auto`: Use Supabase when configured, otherwise fallback to mock data
- `supabase`: Require Supabase credentials (no mock fallback)
- `mock`: Always use `src/data/mockData.ts`

> **Note**: Run `npm run seed:supabase` to load mock data into Supabase.

---


## 📁 Project Structure

```
src/
|-- App.tsx                     # Main app with routing
|-- main.tsx                    # Entry point
|-- index.css                   # Global styles
|-- pages/                      # Main application pages
|   |-- Dashboard.tsx           # Home dashboard
|   |-- PostsPage.tsx           # Browse experiences
|   |-- PostDetailPage.tsx      # Post details
|   |-- NewPostPage.tsx         # Create post
|   |-- PlacesPage.tsx          # Explore places
|   |-- CompanionsPage.tsx      # Find companions
|   `-- ProfilePage.tsx         # User profiles
|-- components/
|   |-- layout/                 # AppLayout, Navbar
|   |-- ui/                     # Shadcn/UI components
|   |-- EERDiagram.tsx          # EER diagram visualization
|   |-- ERDiagram.tsx           # ER diagram visualization
|   `-- home.tsx                # Legacy landing page (not routed)
|-- lib/
|   |-- supabase.ts             # Supabase client connection
|   |-- api.ts                  # Data API (Supabase + mock)
|   `-- utils.ts                # Utility functions
|-- data/
|   |-- mockData.ts             # Demo data
|   `-- schema.sql              # PostgreSQL schema
|-- types/
|   |-- database.ts             # TypeScript interfaces
|   `-- supabase.ts             # Supabase generated types
scripts/
|-- dev.mjs                     # Dev helper (sets VITE_DATA_SOURCE)
`-- seed-supabase.ts            # Seed Supabase with mock data
public/
`-- promts/
    `-- image-prompts.md         # Image generation prompts
```

---


## 🗄️ Database Schema

The complete PostgreSQL schema is in `src/data/schema.sql` and includes:

| Table                | Description                            |
| :------------------- | :------------------------------------- |
| `users`              | User accounts with role specialization |
| `regular_users`      | Regular user subtype                   |
| `moderators`         | Moderator subtype                      |
| `admins`             | Admin subtype                          |
| `profiles`           | User profile information               |
| `posts`              | Travel experiences                     |
| `comments`           | Post comments                          |
| `ratings`            | Post ratings                           |
| `follows`            | User follow relationships              |
| `places`             | Tourist attractions                    |
| `cities`             | City information                       |
| `companion_requests` | Travel companion requests              |
| `companion_matches`  | Match responses                        |

Additional junction tables and views (for images, features, interests, and ratings) live in the schema file.

---


## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Routing**: React Router v6
- **Diagrams**: React Flow
- **Icons**: Lucide React
- **Data**: Supabase (PostgreSQL) with mock fallback

---


## 📚 Documentation

| Phase   | Document                                                       |
| :------ | :------------------------------------------------------------- |
| Phase 1 | [EER Diagram Documentation](docs/EER-DIAGRAM-DOCUMENTATION.md) |
| Phase 2 | [Logical Design (3NF)](docs/PHASE-2-LOGICAL-DESIGN.md)         |
| Phase 3 | [Implementation Details](docs/PHASE-3-IMPLEMENTATION.md)       |

---

## 📜 License

This project was created for the Database Course.

---
