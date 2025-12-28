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

# Run development server
npm run dev
```

### Linux / macOS

```bash
# Open Terminal
cd path/to/DB-1404

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access the App
Open [http://localhost:5173](http://localhost:5173) in your browser.

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
```

> **Note**: Without these credentials, the app will use demo data from `mockData.ts`.

---

## 📁 Project Structure

```
src/
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Home dashboard
│   ├── PostsPage.tsx   # Browse experiences
│   ├── PlacesPage.tsx  # Explore places
│   ├── CompanionsPage.tsx  # Find companions
│   └── ProfilePage.tsx # User profiles
├── components/
│   ├── layout/         # AppLayout, Navbar
│   ├── ui/             # Shadcn/UI components
│   ├── EERDiagram.tsx  # Phase 1 visualization
│   └── home.tsx        # Landing page
├── lib/
│   ├── supabase.ts     # Supabase client connection
│   ├── api.ts          # Database API functions
│   └── utils.ts        # Utility functions
├── data/
│   ├── mockData.ts     # Demo data
│   └── schema.sql      # PostgreSQL schema
├── types/
│   └── database.ts     # TypeScript interfaces
docs/
├── EER-DIAGRAM-DOCUMENTATION.md
├── PHASE-2-LOGICAL-DESIGN.md
└── PHASE-3-IMPLEMENTATION.md
```

---

## 🗄️ Database Schema

The complete PostgreSQL schema is in `src/data/schema.sql` and includes:

| Table                | Description                            |
| :------------------- | :------------------------------------- |
| `users`              | User accounts with role specialization |
| `profiles`           | User profile information               |
| `posts`              | Travel experiences                     |
| `places`             | Tourist attractions                    |
| `cities`             | City information                       |
| `companion_requests` | Travel companion requests              |
| `companion_matches`  | Match responses                        |

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)

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
