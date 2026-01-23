# Fethiye Cam Temizleme - AI Coding Agent Instructions

## Project Architecture

This is a **Next.js 16 App Router CMS** for a Turkish window cleaning service with a dual structure:
- **Public website** (Turkish): `/`, `/blog/[slug]`, `/galeri`, `/hizmetler`, `/hakkimizda`, `/iletisim`, `/sss`
- **Admin CMS** (Turkish): `/admin/*` with NextAuth credential-based authentication

### Core Technology Stack
- **Framework**: Next.js 16.1+ with React 19, App Router, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth v4 with JWT sessions + bcrypt password hashing
- **Media**: Vercel Blob storage (via `@vercel/blob`)
- **Rich Text**: TipTap editor with StarterKit, Image, Link extensions
- **UI**: Tailwind CSS 4, Remixicon icons, browser-image-compression
- **Forms**: Zod validation, drag-and-drop (@dnd-kit)

## Database & Content Model

All models in `prisma/schema.prisma` follow these conventions:
- **ID**: `@id @default(cuid())` for all primary keys
- **Ordering**: `order Int @default(0)` with `@@index([order])` for sortable content
- **Media Relations**: Use `MediaFile` table (tracks Vercel Blob uploads with `blobId`, `url`, `status`)
  - Images linked via `imageId String?` foreign keys (e.g., `BlogPost.imageId → MediaFile.id`)
  - Relations named like `@relation("BlogPostImage")`
- **Rich Text**: Store TipTap HTML in `@db.Text` fields (e.g., `FAQ.answer`, `BlogPost.content`)

### Key Models
- **ContentBlock**: Flexible page builder with `type` field ('hero', 'about', 'features', etc.), `page` field for page assignment, `config Json?` for block-specific settings, `visible` boolean
- **Page**: Dynamic pages with `slug`, `path`, `label` (used by `[...slug]/page.tsx` catch-all route)
- **SiteSettings**: Key-value store with `key` (unique), `value`, `type`, `group` fields
- **MenuItem**: Hierarchical nav menu with self-referencing `parentId` relation

## Development Workflows

### Essential Commands
```bash
npm run dev              # Start dev server (port 3000)
npm run build            # Prisma generate + Next.js build
npm run db:push          # Push schema changes (dev)
npm run db:migrate       # Create/run migrations (prod-ready)
npm run db:seed          # Seed database (tsx prisma/seed.ts)
```

### Database Workflow
1. **Schema changes**: Edit `prisma/schema.prisma` → run `npm run db:push` (dev) or `npm run db:migrate` (prod)
2. **Auto-generate client**: `prisma generate` runs on `postinstall` and in `build` script
3. **Seed data**: Uses `tsx prisma/seed.ts` (configured in package.json `prisma.seed`)

### Authentication Pattern
- **Middleware**: `src/middleware.ts` protects all `/admin/*` routes (except `/admin/login`)
- **Session**: JWT strategy with credentials provider (`src/lib/auth.ts`)
- **Usage in API routes**:
  ```typescript
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  ```

## Critical Patterns & Conventions

### 1. API Route Structure
- **Public APIs**: `/api/[resource]/route.ts` → `GET` only, no auth required
- **Admin APIs**: `/api/admin/[resource]/route.ts` → full CRUD with `getServerSession` auth guard
- **Pattern**: Use `export const dynamic = 'force-dynamic'` for non-cached routes
- **Zod Validation**: Define schemas at top of admin routes (e.g., `blogPostSchema = z.object({...})`)

### 2. Media Upload Pattern (See `src/lib/blob.ts`)
```typescript
// Upload: Returns { url: string, blobId: string }
const { url, blobId } = await uploadToBlob(filename, buffer, contentType)
// Store in MediaFile table with status='staging', then link to content

// Delete: Requires blobId (pathname) from MediaFile.blobId
await deleteFromBlob(mediaFile.blobId, mediaFile.url)
```
**Never** delete media without updating MediaFile.status or removing DB records.

### 3. Dynamic Page Rendering (`src/app/[...slug]/page.tsx`)
- Catch-all route checks `Page` table for `path` match
- Fetches `ContentBlock` records where `page = page.slug`
- Renders blocks via `BlockRenderer` component (client-side)
- **Always** include error handling with `try/catch` + fallback arrays for DB queries

### 4. Block System Architecture
- **Block Types**: Defined in `src/lib/block-types.ts` (12 types: hero, about, features, etc.)
- **Config Schema**: Each block has flexible `config Json?` field for custom settings (colors, layout, buttons, video URLs, etc.)
- **Renderer**: `src/components/BlockRenderer.tsx` dynamically imports components, handles custom blocks with full config support (background, alignment, buttons, icons, videos)
- **Admin**: Use drag-and-drop (@dnd-kit) for reordering blocks

### 5. Slug Generation (See `src/lib/utils.ts`)
- Auto-generate slugs for Blog/Pages using `generateSlug(title)` (Turkish char normalization)
- **Pattern**: In admin API routes, use `slug: body.slug || generateSlug(body.title)`

### 6. Turkish Language
- All admin UI, error messages, form labels are in **Turkish**
- Example labels: 'Başlık' (Title), 'İçerik' (Content), 'Kaydet' (Save), 'Sil' (Delete)
- Date formatting uses Turkish locale where applicable

### 7. Image Optimization
- Use Next.js `<Image>` component with `width`, `height`, `alt` props
- Client-side compression: `browser-image-compression` before upload (see `ImageUpload` component)
- Server-side: Sharp library available for additional processing

## File Organization Principles

- **API Routes**: Mirror Prisma model names (`/api/blog`, `/api/admin/blog/[id]`)
- **Components**: Feature-based in `src/components/` (e.g., `Hero.tsx`, `Services.tsx`)
  - Admin-specific: `src/components/admin/` (e.g., `RichTextEditor.tsx`, `ImageUpload.tsx`)
- **Libraries**: `src/lib/` for utilities (`db.ts` = Prisma client, `auth.ts` = NextAuth config)
- **Types**: `src/types/` for global TypeScript definitions

## Common Pitfalls to Avoid

1. **Don't** use `page` field in ContentBlock for routing—it's for grouping blocks (e.g., 'home', 'about')
2. **Don't** forget `await params` in dynamic routes (Next.js 16+ requirement)
3. **Don't** create API routes without `export const dynamic = 'force-dynamic'` if data should always be fresh
4. **Don't** delete MediaFile records without calling `deleteFromBlob(blobId)` first
5. **Don't** assume English labels—always use Turkish in admin UI

## Testing & Debugging

- **Seed data**: Run `npm run db:seed` to populate test content
- **Login**: Default credentials in seed file (check `prisma/seed.ts`)
- **Logs**: Check `console.error` in API routes, browser console for client components
- **DB Inspection**: Use Prisma Studio (`npx prisma studio`) or SQL client

## Integration Points

- **Vercel Blob**: Requires `BLOB_READ_WRITE_TOKEN` env var
- **Database**: Requires `DATABASE_URL` env var (PostgreSQL connection string)
- **NextAuth**: Requires `NEXTAUTH_SECRET` and `NEXTAUTH_URL` env vars
