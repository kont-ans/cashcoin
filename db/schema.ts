import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
  boolean,
  mysqlEnum,
  decimal,
  index,
} from "drizzle-orm/mysql-core";

// ==================== USERS TABLE ====================
export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    telegramId: bigint("telegram_id", { mode: "number", unsigned: true }).notNull().unique(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }),
    username: varchar("username", { length: 255 }),
    referralCode: varchar("referral_code", { length: 20 }).notNull().unique(),
    referredBy: bigint("referred_by", { mode: "number", unsigned: true }),
    balanceLira: decimal("balance_lira", { precision: 15, scale: 2 }).notNull().default("0"),
    balanceUsd: decimal("balance_usd", { precision: 15, scale: 2 }).notNull().default("0"),
    balanceBtc: decimal("balance_btc", { precision: 18, scale: 8 }).notNull().default("0"),
    balanceCoin: decimal("balance_coin", { precision: 15, scale: 2 }).notNull().default("0"),
    spinsCount: int("spins_count").notNull().default(0),
    spinsUsed: int("spins_used").notNull().default(0),
    referralCount: int("referral_count").notNull().default(0),
    referralRewards: decimal("referral_rewards", { precision: 15, scale: 2 }).notNull().default("0"),
    tasksCompleted: int("tasks_completed").notNull().default(0),
    coupons: int("coupons").notNull().default(0),
    status: mysqlEnum("status", ["active", "banned", "suspended"]).notNull().default("active"),
    lastActiveAt: timestamp("last_active_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (table) => [
    index("idx_users_telegram").on(table.telegramId),
    index("idx_users_status").on(table.status),
    index("idx_users_referral").on(table.referredBy),
  ]
);

// ==================== SPIN HISTORY ====================
export const spinHistory = mysqlTable(
  "spin_history",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    result: varchar("result", { length: 100 }).notNull(),
    resultValue: decimal("result_value", { precision: 15, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_spin_user").on(table.userId),
  ]
);

// ==================== WITHDRAWALS ====================
export const withdrawals = mysqlTable(
  "withdrawals",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
    currency: mysqlEnum("currency", ["lira", "usd", "btc", "coin"]).notNull(),
    method: mysqlEnum("method", ["wallet", "bank", "vodafone_cash", "paypal", "crypto"]).notNull(),
    walletAddress: varchar("wallet_address", { length: 500 }),
    bankName: varchar("bank_name", { length: 255 }),
    accountNumber: varchar("account_number", { length: 255 }),
    accountName: varchar("account_name", { length: 255 }),
    phoneNumber: varchar("phone_number", { length: 50 }),
    status: mysqlEnum("status", ["pending", "reviewing", "completed", "rejected"]).notNull().default("pending"),
    adminNote: text("admin_note"),
    processedBy: bigint("processed_by", { mode: "number", unsigned: true }),
    processedAt: timestamp("processed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_wd_user").on(table.userId),
    index("idx_wd_status").on(table.status),
    index("idx_wd_created").on(table.createdAt),
  ]
);

// ==================== REFERRALS ====================
export const referrals = mysqlTable(
  "referrals",
  {
    id: serial("id").primaryKey(),
    referrerId: bigint("referrer_id", { mode: "number", unsigned: true }).notNull(),
    referredId: bigint("referred_id", { mode: "number", unsigned: true }).notNull().unique(),
    rewardGiven: decimal("reward_given", { precision: 15, scale: 2 }).notNull().default("0"),
    status: mysqlEnum("status", ["active", "rejected", "pending"]).notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_ref_referrer").on(table.referrerId),
    index("idx_ref_referred").on(table.referredId),
  ]
);

// ==================== TICKETS ====================
export const tickets = mysqlTable(
  "tickets",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    subject: mysqlEnum("subject", ["technical", "withdrawal", "deposit", "inquiry", "complaint", "other"]).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    priority: mysqlEnum("priority", ["high", "medium", "low"]).notNull().default("medium"),
    status: mysqlEnum("status", ["open", "in_progress", "closed"]).notNull().default("open"),
    adminReply: text("admin_reply"),
    repliedBy: bigint("replied_by", { mode: "number", unsigned: true }),
    repliedAt: timestamp("replied_at"),
    closedAt: timestamp("closed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_ticket_user").on(table.userId),
    index("idx_ticket_status").on(table.status),
    index("idx_ticket_priority").on(table.priority),
  ]
);

// ==================== SETTINGS ====================
export const settings = mysqlTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  description: varchar("description", { length: 255 }),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==================== AUDIT LOGS ====================
export const auditLogs = mysqlTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }),
    action: varchar("action", { length: 100 }).notNull(),
    details: text("details"),
    performedBy: bigint("performed_by", { mode: "number", unsigned: true }),
    ipAddress: varchar("ip_address", { length: 100 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_audit_user").on(table.userId),
    index("idx_audit_action").on(table.action),
  ]
);

// ==================== TASKS ====================
export const tasks = mysqlTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    reward: decimal("reward", { precision: 15, scale: 2 }).notNull(),
    rewardType: mysqlEnum("reward_type", ["lira", "usd", "btc", "coin", "spin", "coupon"]).notNull(),
    taskType: mysqlEnum("task_type", ["join_channel", "visit_site", "watch_ad", "share_post", "complete_survey", "other"]).notNull(),
    targetUrl: varchar("target_url", { length: 500 }),
    requiredCount: int("required_count").notNull().default(1),
    isActive: boolean("is_active").notNull().default(true),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_tasks_active").on(table.isActive),
  ]
);

// ==================== USER TASKS ====================
export const userTasks = mysqlTable(
  "user_tasks",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    taskId: bigint("task_id", { mode: "number", unsigned: true }).notNull(),
    status: mysqlEnum("status", ["in_progress", "completed", "rewarded"]).notNull().default("in_progress"),
    progress: int("progress").notNull().default(0),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_ut_user").on(table.userId),
    index("idx_ut_task").on(table.taskId),
  ]
);

// ==================== PROMO CODES ====================
export const promoCodes = mysqlTable(
  "promo_codes",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    reward: decimal("reward", { precision: 15, scale: 2 }).notNull(),
    rewardType: mysqlEnum("reward_type", ["lira", "usd", "btc", "coin", "spin"]).notNull(),
    maxUses: int("max_uses").notNull().default(1),
    currentUses: int("current_uses").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_promo_code").on(table.code),
  ]
);

// ==================== USER PROMO REDEMPTIONS ====================
export const promoRedemptions = mysqlTable(
  "promo_redemptions",
  {
    id: serial("id").primaryKey(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    promoId: bigint("promo_id", { mode: "number", unsigned: true }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_pr_user").on(table.userId),
    index("idx_pr_promo").on(table.promoId),
  ]
);

// ==================== BROADCAST LOGS ====================
export const broadcastLogs = mysqlTable(
  "broadcast_logs",
  {
    id: serial("id").primaryKey(),
    type: mysqlEnum("type", ["text", "image", "video", "document"]).notNull(),
    content: text("content").notNull(),
    mediaUrl: varchar("media_url", { length: 500 }),
    target: mysqlEnum("target", ["all", "active", "currency_lira", "currency_usd", "currency_btc", "currency_coin"]).notNull().default("all"),
    sentCount: int("sent_count").notNull().default(0),
    failedCount: int("failed_count").notNull().default(0),
    scheduledAt: timestamp("scheduled_at"),
    sentAt: timestamp("sent_at"),
    createdBy: bigint("created_by", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_broadcast_created").on(table.createdAt),
  ]
);

// ==================== WHEEL SEGMENTS ====================
export const wheelSegments = mysqlTable(
  "wheel_segments",
  {
    id: serial("id").primaryKey(),
    label: varchar("label", { length: 100 }).notNull(),
    value: decimal("value", { precision: 15, scale: 2 }).notNull(),
    color: varchar("color", { length: 20 }).notNull(),
    probability: decimal("probability", { precision: 5, scale: 4 }).notNull(),
    type: mysqlEnum("type", ["lira", "usd", "btc", "coin", "spin", "coupon", "none"]).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: int("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_wheel_active").on(table.isActive),
  ]
);
