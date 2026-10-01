import type { DefaultSession } from 'next-auth'

/**
 * Augments the NextAuth session with the fields set in the `session` callback
 * in lib/auth.ts. Keep these in sync with the User model in prisma/schema.prisma.
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      subscriptionStatus: string
    } & DefaultSession['user']
  }

  interface User {
    role?: string
    subscriptionStatus?: string
  }
}
