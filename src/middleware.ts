import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Always allow login page
      if (req.nextUrl.pathname === '/admin/login') {
        return true
      }
      // Require token for all other admin routes
      return !!token
    },
  },
  pages: {
    signIn: '/admin/login',
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}
