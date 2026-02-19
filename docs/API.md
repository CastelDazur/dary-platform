# DARY Platform - API Reference

Base URL: `https://api.dary.one/api/v1`

All requests must include `Content-Type: application/json` header.
Authenticated endpoints require `Authorization: Bearer <access_token>` header.

---

## Authentication

### POST /auth/login
Authenticate a user and receive access/refresh tokens.

**Request Body:**
```json
{
  "email": "user@company.com",
  "password": "securepassword"
}
```

**Response `200 OK`:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@company.com",
    "role": "brand_admin",
    "darBalance": 5000
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Invalid credentials
- `429` - Rate limit exceeded

---

### POST /auth/refresh
Refresh the access token.

**Request Body:**
```json
{ "refreshToken": "eyJhbGci..." }
```

**Response `200 OK`:**
```json
{ "accessToken": "eyJhbGci..." }
```

---

## Campaigns

### GET /brands/campaigns
List all campaigns for the authenticated brand. `[AUTH REQUIRED]`

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter: `active`, `paused`, `ended` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |

**Response `200 OK`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Summer Referral Campaign",
      "budgetDar": 10000,
      "spentDar": 3250,
      "status": "active",
      "leadsCount": 142,
      "giftsCount": 67,
      "startsAt": "2026-06-01T00:00:00Z",
      "endsAt": "2026-08-31T23:59:59Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5 }
}
```

---

### POST /brands/campaigns
Create a new campaign. `[AUTH REQUIRED]`

**Request Body:**
```json
{
  "title": "Q3 Lead Generation",
  "budgetDar": 5000,
  "giftPerLead": 100,
  "startsAt": "2026-07-01T00:00:00Z",
  "endsAt": "2026-09-30T23:59:59Z",
  "targetAudience": {
    "ageRange": [25, 45],
    "interests": ["technology", "fitness"]
  }
}
```

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "title": "Q3 Lead Generation",
  "status": "draft",
  "createdAt": "2026-02-19T13:00:00Z"
}
```

---

## Gifts

### POST /gifts/generate
Generate an AI-personalized gift for a lead. `[AUTH REQUIRED]`

**Request Body:**
```json
{
  "campaignId": "uuid",
  "recipientId": "uuid",
  "preferences": {
    "interests": ["coffee", "travel"],
    "priceRange": [50, 150]
  }
}
```

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "gift": {
    "name": "Premium Coffee Subscription",
    "description": "3-month specialty coffee subscription from artisan roasters",
    "estimatedValue": 89,
    "darCost": 120
  },
  "qrCode": "data:image/png;base64,...",
  "expiresAt": "2026-03-19T13:00:00Z"
}
```

---

## DAR Token Economy

### GET /dar/balance
Get current DAR balance. `[AUTH REQUIRED]`

**Response `200 OK`:**
```json
{
  "balance": 4850,
  "pendingDeductions": 200,
  "availableBalance": 4650
}
```

### GET /dar/transactions
Get transaction history. `[AUTH REQUIRED]`

**Query Parameters:** `page`, `limit`, `type` (`credit`|`debit`)

**Response `200 OK`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "amount": -120,
      "type": "debit",
      "description": "Gift generated for lead #5621",
      "createdAt": "2026-02-19T10:30:00Z"
    }
  ],
  "pagination": { "page": 1, "total": 84 }
}
```

---

## Error Format

All errors follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Field 'email' is required",
    "details": [
      { "field": "email", "message": "Required field missing" }
    ]
  }
}
```

## Rate Limiting

- Unauthenticated: `100 requests/minute` per IP
- Authenticated: `1000 requests/minute` per user
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
