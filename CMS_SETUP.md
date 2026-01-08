# CMS Setup Guide

## Environment Variables

Make sure your `.env.local` file contains:

```env
# Database
DATABASE_URL="your-neon-database-url"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

## Setup Steps

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Generate Prisma Client**

   ```bash
   npm run db:generate
   ```

3. **Push Database Schema**

   ```bash
   npm run db:push
   ```

4. **Seed Admin User**

   ```bash
   npm run db:seed
   ```

   Default credentials:

   - Email: `admin@fethiyecamtemizleme.com`
   - Password: `admin123`
     ⚠️ **Change the password after first login!**

5. **Run Migration Script (Optional)**

   ```bash
   npx tsx scripts/migrate-content.ts
   ```

   This will migrate existing hardcoded content to the database.

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## CMS Access

- **Login URL**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin`

## Features Implemented

✅ NextAuth authentication with credentials provider
✅ Turkish language interface
✅ Mobile responsive design
✅ Blog management with auto-slug generation
✅ Gallery album and image management
✅ Services management
✅ Testimonials management
✅ FAQ management
✅ Image upload with optimization (WebP, 90% quality, max 10MB)
✅ Orphaned file prevention system
✅ TipTap rich text editor
✅ Migration script for existing content

## Content Management

All content types can be managed through the CMS dashboard:

- **Blog**: Create, edit, delete blog posts with rich text content
- **Gallery**: Create albums and upload multiple images
- **Services**: Manage service offerings with features
- **Testimonials**: Add customer testimonials with ratings
- **FAQ**: Manage frequently asked questions

## Image Management

- Images are automatically optimized to WebP format
- Maximum file size: 10MB before optimization
- Quality: 90%
- Orphaned files are automatically cleaned up after 24 hours
- Images are stored in Vercel Blob Storage

## Next Steps

1. Update remaining frontend components (Services, Testimonials, FAQ, Gallery) to fetch from database
2. Complete gallery album edit page
3. Add reordering functionality for services, testimonials, and FAQs
4. Set up cron job for orphaned file cleanup (optional)
