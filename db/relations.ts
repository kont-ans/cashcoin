import { relations } from "drizzle-orm";
import {
  users,
  withdrawals,
  referrals,
  tickets,
  spinHistory,
  userTasks,
  promoRedemptions,
} from "./schema";

export const usersRelations = relations(users, ({ many, one }) => ({
  withdrawals: many(withdrawals),
  referralsMade: many(referrals, { relationName: "referrer" }),
  referralsReceived: one(referrals, {
    fields: [users.telegramId],
    references: [referrals.referredId],
    relationName: "referred",
  }),
  tickets: many(tickets),
  spinHistory: many(spinHistory),
  userTasks: many(userTasks),
  promoRedemptions: many(promoRedemptions),
}));

export const withdrawalsRelations = relations(withdrawals, ({ one }) => ({
  user: one(users, {
    fields: [withdrawals.userId],
    references: [users.telegramId],
  }),
}));

export const referralsRelations = relations(referrals, ({ one }) => ({
  referrer: one(users, {
    fields: [referrals.referrerId],
    references: [users.telegramId],
    relationName: "referrer",
  }),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  user: one(users, {
    fields: [tickets.userId],
    references: [users.telegramId],
  }),
}));

export const spinHistoryRelations = relations(spinHistory, ({ one }) => ({
  user: one(users, {
    fields: [spinHistory.userId],
    references: [users.telegramId],
  }),
}));

export const userTasksRelations = relations(userTasks, ({ one }) => ({
  user: one(users, {
    fields: [userTasks.userId],
    references: [users.telegramId],
  }),
}));
