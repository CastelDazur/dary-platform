# DARY Platform - Architecture Overview

## System Architecture

DARY Platform follows a **microservices-inspired monolith** architecture, designed for rapid scaling while maintaining development simplicity.

```
┌─────────────────────────────────────────────────────────────┐
│                     DARY Platform                           │
├─────────────────┬───────────────────┬───────────────────────┤
│   React Native  │   React Web App   │   Admin Dashboard     │
│   Mobile App    │   (Brand Portal)  │   (Management Panel)  │
└────────┬────────┴─────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         └──────────────────┼─────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API Gateway  │
                    │  (Express.js)  │
                    └───────┬────────┘
                            │
         ┌──────────────────┼─────────────────────┐
         │                  │                     │
┌────────▼───────┐ ┌────────▼───────┐ ┌──────────▼──────────┐
│  Auth Service  │ │  Gift Service  │ │  Lead Gen Service   │
│  JWT + Refresh │ │  AI + Catalog  │ │  Scoring + Export   │
└────────┬───────┘ └────────┬───────┘ └──────────┬──────────┘
         │                  │                     │
         └──────────────────┼─────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │       PostgreSQL DB        │
              │  (Primary Data Store)      │
              └─────────────┬─────────────┘
                            │
              ┌─────────────▼─────────────┐
              │         Redis             │
              │  (Cache + Session Store)  │
              └───────────────────────────┘
```

## Tech Stack

### Backend
| Layer | Technology | Version |
|-------|-----------|--------|
| Runtime | Node.js | 20.x LTS |
| Framework | Express.js | 4.x |
| Database | PostgreSQL | 16.x |
| Cache | Redis | 7.x |
| ORM | Sequelize | 6.x |
| Auth | JWT (jsonwebtoken) | 9.x |
| AI | OpenAI GPT-4 API | latest |
| Queue | Bull (Redis-based) | 4.x |

### Frontend (Web)
| Layer | Technology | Version |
|-------|-----------|--------|
| Framework | React | 18.x |
| State | Redux Toolkit | 2.x |
| UI | Tailwind CSS | 3.x |
| Charts | Recharts | 2.x |
| HTTP | Axios | 1.x |

### Mobile
| Layer | Technology | Version |
|-------|-----------|--------|
| Framework | React Native | 0.73.x |
| Navigation | React Navigation | 6.x |
| State | Redux Toolkit | 2.x |
| Push | Firebase FCM | latest |

### DevOps
| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Local dev orchestration |
| GitHub Actions | CI/CD pipeline |
| Nginx | Reverse proxy |

## Database Schema (Core Tables)

```sql
-- Core entities
users          (id, email, role, company_id, dar_balance, created_at)
companies      (id, name, plan, subscription_expires_at)
campaigns      (id, company_id, title, budget_dar, status, starts_at, ends_at)
gifts          (id, campaign_id, recipient_id, product_id, status, qr_code)
dar_transactions (id, user_id, amount, type, reference_id, created_at)
leads          (id, company_id, email, score, source, metadata, created_at)
referrals      (id, referrer_id, referee_id, reward_dar, status)
```

## API Structure

```
/api/v1
  /auth
    POST /login
    POST /refresh
    POST /logout
  /brands
    GET  /campaigns
    POST /campaigns
    PUT  /campaigns/:id
  /gifts
    GET  /gifts
    POST /gifts/generate
    GET  /gifts/:id/qr
  /leads
    GET  /leads
    POST /leads/import
    GET  /leads/export
  /dar
    GET  /balance
    GET  /transactions
    POST /transfer
  /referrals
    GET  /referrals
    POST /referrals/claim
```

## Security

- **Authentication**: JWT access tokens (15min) + refresh tokens (30 days)
- **Authorization**: RBAC with roles: `super_admin`, `brand_admin`, `manager`, `viewer`
- **API Rate limiting**: 100 req/min per IP, 1000 req/min per authenticated user
- **Data encryption**: AES-256 for sensitive fields at rest
- **HTTPS**: TLS 1.3 enforced in production
- **SQL Injection**: Parameterized queries via Sequelize ORM

## Deployment

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Services
# - app: Node.js API (port 3000)
# - web: React build served by Nginx (port 80/443)
# - db: PostgreSQL (port 5432, internal)
# - redis: Redis (port 6379, internal)
# - nginx: Reverse proxy (port 80/443)
```

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret (min 256-bit)
- `OPENAI_API_KEY` - OpenAI API key for gift generation
- `TELEGRAM_BOT_TOKEN` - Telegram notification bot
