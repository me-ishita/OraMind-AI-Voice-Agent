import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    photoURL: v.optional(v.string()),

  }),

  DiscussionRoom: defineTable({
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string(),

    conversation: v.optional(
      v.array(
        v.object({
          role: v.string(),     
          content: v.string(),  
        })
      )
    ),

    summery: v.optional(v.any()),
    uid: v.optional(v.id("users")),
  }),
});
