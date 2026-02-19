# Changelog

All notable changes to the DARY Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Multi-language support (FR, DE, NL)
- Advanced analytics dashboard
- Stripe Connect integration for payouts
- Mobile app (iOS/Android) - React Native

## [1.3.0] - 2026-02-19

### Added
- Automatic sync service for real-time gift tracking
- Webhook support for third-party integrations
- Campaign scheduler with cron-based execution
- DAR token transaction history API

### Changed
- Improved gift recommendation engine performance by 40%
- Optimized PostgreSQL queries for lead scoring
- Updated AI prompt templates for better personalization

### Fixed
- Fixed race condition in DAR token balance updates
- Resolved email notification delivery issues

## [1.2.0] - 2026-01-15

### Added
- Viral referral system with multi-tier tracking
- AI-generated personalized gift descriptions
- B2B dashboard with campaign analytics
- CSV export for lead data
- Role-based access control (Admin, Manager, Viewer)

### Changed
- Migrated from REST polling to WebSocket for real-time updates
- Redesigned onboarding flow for brand partners

### Fixed
- Fixed DAR balance calculation on concurrent transactions
- Resolved CORS issues with third-party embed widgets

## [1.1.0] - 2025-12-01

### Added
- Brand partner registration portal
- QR code generation for gift campaigns
- Telegram bot integration for notifications
- Email templates with Handlebars

### Changed
- Switched from MongoDB to PostgreSQL for better relational data handling
- Refactored authentication to use JWT refresh tokens

## [1.0.0] - 2025-11-01

### Added
- Initial platform release
- Basic lead generation module
- DAR internal token system
- Gift catalog management
- Admin panel (React)
- REST API (Node.js/Express)
- PostgreSQL database schema
- Docker containerization
