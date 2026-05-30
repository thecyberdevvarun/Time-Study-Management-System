import { NextResponse } from 'next/server'
import Cookies from 'js-cookie'

// Role-based access control configuration
const ROLE_PERMISSIONS = {
  admin: {
    canAccess: ['/dashboard', '/studies', '/analytics', '/reports', '/settings', '/operators', '/videos'],
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },
  ie_analyst: {
    canAccess: ['/dashboard', '/studies', '/analytics', '/reports'],
    canCreate: true,
    canEdit: true,
    canDelete: false,
  },
  viewer: {
    canAccess: ['/dashboard', '/studies', '/analytics', '/reports'],
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/api']

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('token')
  const userCookie = request.cookies.get('user')

  // Redirect to login if no token
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Parse user from cookie
  let user = null
  try {
    user = userCookie ? JSON.parse(userCookie.value) : null
  } catch (e) {
    // Invalid user cookie, redirect to login
    const loginUrl = new URL('/login', request.url)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete('token')
    response.cookies.delete('user')
    response.cookies.delete('refreshToken')
    return response
  }

  // Check if user exists and has a role
  if (!user || !user.role) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Get role permissions
  const role = user.role
  const permissions = ROLE_PERMISSIONS[role]

  // If role not found, redirect to login
  if (!permissions) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Check if user has access to the requested path
  const hasAccess = permissions.canAccess.some(route => pathname.startsWith(route))

  if (!hasAccess) {
    // Redirect to dashboard if no access
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Add user info to headers for use in pages
  const response = NextResponse.next()
  response.headers.set('x-user-role', role)
  response.headers.set('x-user-id', user.id || '')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
