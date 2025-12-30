# 📄 Phase 3: Practical Implementation (پیاده‌سازی عملی)

## 1. Project Overview

This document describes the practical implementation of the **Hamsafar Mirza** (همسفر میرزا) travel companion platform. The implementation follows the logical design from Phase 2 and transforms it into a working React application.

---

## 2. Technology Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| **React 18**     | Frontend framework           |
| **TypeScript**   | Type-safe JavaScript         |
| **Vite**         | Build tool and dev server    |
| **Tailwind CSS** | Utility-first CSS framework  |
| **Shadcn/UI**    | UI component library         |
| **React Router** | Client-side routing          |
| **React Flow**   | EER/ER diagram visualization |
| **Supabase JS**  | Postgres client + auth APIs  |
| **Lucide React** | Icon library                 |

---

## 3. Project Structure

```
src/
|-- App.tsx                     # Main app with routing
|-- main.tsx                    # Entry point
|-- index.css                   # Global styles
|-- components/
|   |-- layout/
|   |   |-- AppLayout.tsx       # Main app layout with header/footer
|   |   `-- Navbar.tsx          # Navigation bar
|   |-- ui/                     # Shadcn/UI components
|   |   |-- button.tsx
|   |   |-- card.tsx
|   |   |-- dialog.tsx
|   |   `-- ...
|   |-- home.tsx                # Legacy landing page (not routed)
|   |-- EERDiagram.tsx          # Phase 1 visualization
|   `-- ERDiagram.tsx           # ER diagram visualization
|-- pages/
|   |-- Dashboard.tsx           # Main dashboard
|   |-- PostsPage.tsx           # Posts listing
|   |-- PostDetailPage.tsx      # Single post view
|   |-- NewPostPage.tsx         # Create new post
|   |-- PlacesPage.tsx          # Places/cities browser
|   |-- CompanionsPage.tsx      # Companion finder
|   `-- ProfilePage.tsx         # User profiles
|-- types/
|   |-- database.ts             # TypeScript types matching schema
|   `-- supabase.ts             # Supabase types (when connected)
|-- data/
|   |-- mockData.ts             # Mock data for demo
|   `-- schema.sql              # Complete SQL schema
`-- lib/
    |-- api.ts                  # Supabase + mock data adapter
    |-- supabase.ts             # Supabase client + data source mode
    `-- utils.ts                # Utility functions

scripts/
|-- dev.mjs                     # Dev helper (sets VITE_DATA_SOURCE)
`-- seed-supabase.ts            # Seed Supabase with mock data
```

---

## 4. Database Schema Implementation

The SQL schema (`src/data/schema.sql`) implements all entities from the logical design:

### 4.1 Tables Created

| Table                | Description                        | Type           |
| -------------------- | ---------------------------------- | -------------- |
| `users`              | Main user table with discriminator | Strong Entity  |
| `regular_users`      | Regular user subtype               | Subtype        |
| `moderators`         | Moderator subtype                  | Subtype        |
| `admins`             | Admin subtype                      | Subtype        |
| `profiles`           | User profiles                      | Weak Entity    |
| `profile_interests`  | Multi-valued attribute             | Junction Table |
| `follows`            | User follows relationship          | M:N Junction   |
| `cities`             | City information                   | Strong Entity  |
| `places`             | Tourist places                     | Strong Entity  |
| `place_features`     | Multi-valued attribute             | Junction Table |
| `place_images`       | Multi-valued attribute             | Junction Table |
| `posts`              | Travel experiences                 | Strong Entity  |
| `post_images`        | Multi-valued attribute             | Junction Table |
| `comments`           | Post comments                      | Weak Entity    |
| `ratings`            | Post ratings                       | M:N Junction   |
| `companion_requests` | Travel companion requests          | Strong Entity  |
| `request_conditions` | Multi-valued attribute             | Junction Table |
| `companion_matches`  | Match responses                    | Strong Entity  |

### 4.2 Views (Derived Attributes)

- `profiles_with_counts`: Includes followers_count and following_count
- `posts_with_rating`: Includes avg_rating and rating_count

### 4.3 Triggers

- Auto-create profile when user is created
- Auto-create subtype record based on user_type

---

## 5. TypeScript Types

The types in `src/types/database.ts` mirror the database schema:

```typescript
// User Types
type UserType = 'regular' | 'moderator' | 'admin';

interface User {
  user_id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  password_hash: string;
  profile_image?: string;
  created_at: string;
  user_type: UserType;
}

// And many more...
```

---

## 6. Application Features

### 6.1 User Management
- No real auth UI yet; the navbar uses the first user in the dataset
- Profile viewing/editing (mock data)
- Role-based access (Regular, Moderator, Admin)
- Follow/unfollow system

### 6.2 Content System
- Create travel experiences (visited/imagined)
- Image galleries
- Comments and ratings
- Content approval workflow

### 6.3 Location System
- Browse cities
- Browse places within cities
- Location features and images
- Map links

### 6.4 Companion System
- Create companion requests
- Set travel conditions
- Accept/reject matches
- Match messaging

---

## 7. Routes

| Route                        | Component      | Description                 |
| ---------------------------- | -------------- | --------------------------- |
| `/`                          | -              | Redirects to `/app`         |
| `/app`                       | Dashboard      | Main dashboard              |
| `/app/posts`                 | PostsPage      | Browse experiences          |
| `/app/posts/new`             | NewPostPage    | Create experience           |
| `/app/posts/:postId`         | PostDetailPage | View experience             |
| `/app/places`                | PlacesPage     | Browse places               |
| `/app/companions`            | CompanionsPage | Find companions             |
| `/app/companions/:requestId` | CompanionsPage | Companion request detail    |
| `/app/profile/:userId`       | ProfilePage    | User profile                |
| `/app/settings`              | ProfilePage    | Settings (profile view)     |
| `/eer-diagram`               | EERDiagram     | EER diagram                 |
| `/er-diagram`                | ERDiagram      | ER diagram                  |

---

## 8. Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start with mock data only
npm run dev:mock

# Start with Supabase only
npm run dev:supabase

# Seed Supabase with mock data
npm run seed:supabase

# Build for production
npm run build
```

---

## 9. Database Connection

### Supabase + Mock Data Modes
The data layer can run in three modes:

- **mock**: Always use `src/data/mockData.ts`
- **supabase**: Require Supabase credentials; errors if missing
- **auto**: Default; use Supabase if configured, otherwise fallback to mock data

Key files:
- **Client**: `src/lib/supabase.ts` (reads `VITE_DATA_SOURCE` or Vite `MODE`)
- **API Layer**: `src/lib/api.ts` (runtime switch + fallback logic)
- **Seeder**: `scripts/seed-supabase.ts` (loads mock data into Supabase)

Environment:
- `.env.local` uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- `VITE_DATA_SOURCE` can be set to `mock`, `supabase`, or `auto`

Note: The mock dataset includes `cities.image`. The seed script will insert it if the column exists; otherwise it skips the column and logs a warning.

### Frontend
- Deploy to Vercel, Netlify, or similar
- Environment variables for Supabase credentials

---

## 10. Phase 3 Deliverables

? Frontend React application  
? TypeScript types matching schema  
? SQL schema file for Supabase  
? Supabase client with mock fallback  
? Seed script for Supabase  
? Mock data for demonstration  
? Responsive UI with RTL support  
? Documentation  

---

## 11. Future Enhancements

1. **Full Async Data Fetching**: Replace synchronous mock imports with async API calls
2. **Authentication**: Real user auth with Supabase Auth
3. **Image Upload**: Use Supabase Storage
4. **Real-time**: Live notifications and chat
5. **Search**: Full-text search with PostgreSQL
6. **Analytics**: User engagement tracking
7. **PWA**: Progressive Web App support

---

*This document serves as the formal deliverable for Phase 3: Practical Implementation.*
