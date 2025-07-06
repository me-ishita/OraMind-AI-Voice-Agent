// convex/users.js
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// ✅ Sign Up
export const signUp = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .unique();

    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    const userId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      password: args.password,
    });

    return { success: true, userId };
  },
});

// ✅ Sign In
export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .unique();

    if (!user || user.password !== args.password) {
      return { success: false, message: 'Invalid credentials' };
    }

    return { success: true, user };
  },
});

// ✅ Get user by email (for showing name)
export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .unique();

    return user;
  },
});

// ✅ Update user info (name/photo)
export const updateUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    photo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .unique();

    if (!user) return;

    await ctx.db.patch(user._id, {
      ...(args.name && { name: args.name }),
      ...(args.photo && { photoURL: args.photo }),
    });
  },
});
