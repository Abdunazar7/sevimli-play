import { SetMetadata } from "@nestjs/common";
 
// USER ROLE
export enum UserRole {
  SUPERADMIN = "superadmin",
  MODERATOR = "moderator",
  USER = "user",
}

// LANGUAGE OPTIONS
export enum Language {
  UZ = "uz",
  RU = "ru",
  EN = "en",
}

// MATURITY LEVELS
export enum MaturityLevel {
  ZERO_PLUS = "0+",
  SIX_PLUS = "6+",
  TWELVE_PLUS = "12+",
  SIXTEEN_PLUS = "16+",
  EIGHTEEN_PLUS = "18+",
}

// VIDEO QUALITY
export enum VideoQuality {
  SD = "SD",
  HD = "HD",
  FHD = "FHD",
  UHD = "UHD",
}

// PAYMENT STATUS
export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

// PAYMENT CURRENCY
export enum Currency {
  USD = "USD",
  UZS = "UZS",
  RUB = "RUB",
}

// SUBSCRIPTION STATUS
export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  PENDING = "pending",
  CANCELED = "canceled",
}

// BILLING PERIOD ENUM
export enum BillingPeriod {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  WEEKLY = "weekly",
}

// DEVICE TYPES
export enum DeviceType {
  MOBILE = "mobile",
  PC = "pc",
  TV = "TV",
}

// OPERATING SYSTEMS
export enum OS {
  ANDROID = "android",
  IOS = "ios",
  WINDOWS = "windows",
  LINUX = "linux",
}

// COMMENT TYPES
export enum ThumbnailType {
  POSTER = "poster",
  BACKGROUND = "background",
  THUMBNAIL = "thumbnail",
}

// CONTENT TYPES
export enum ContentType {
  MOVIE = "movie",
  SERIES = "series",
}

// CONTENT PEOPLE ROLE
export enum ContentRole {
  ACTOR = "actor",
  DIRECTOR = "director",
  PRODUCER = "producer",
  WRITER = "writer",
}

//  DECORATOR
export const ROLES_KEY = "roles";
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
