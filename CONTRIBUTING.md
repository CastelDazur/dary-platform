# Contributing to DARY Platform

Thank you for your interest in contributing to the DARY Platform! This document outlines our development process and guidelines.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Code of Conduct

All contributors are expected to:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on the project's best interests

## Getting Started

### Prerequisites

- Node.js 20.x LTS
- PostgreSQL 16.x
- Redis 7.x
- Docker & Docker Compose

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/CastelDazur/dary-platform.git
cd dary-platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your local config

# 4. Start dependencies via Docker
docker-compose up -d db redis

# 5. Run database migrations
npm run migrate

# 6. Seed development data
npm run seed

# 7. Start development server
npm run dev
```

The API will be available at `http://localhost:3000`.

## Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Write** your code following our style guidelines
4. **Add tests** for any new functionality
5. **Run** the test suite: `npm test`
6. **Commit** your changes following our commit convention
7. **Push** to your fork and **submit** a pull request

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic changes) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies |
| `perf` | Performance improvements |

### Examples

```
feat(gifts): add AI-powered personalization for gift recommendations
fix(auth): resolve JWT refresh token expiration edge case
docs(api): update authentication endpoint documentation
perf(db): optimize lead scoring query with composite index
```

## Pull Request Process

1. Ensure all tests pass: `npm test`
2. Update documentation if you changed APIs or behavior
3. Add a clear description of what changes you made and why
4. Reference any related issues: `Closes #123`
5. Request review from at least one maintainer
6. PRs require approval before merging

## Code Style

### JavaScript/Node.js
- ESLint configuration: `.eslintrc.js`
- Prettier configuration: `.prettierrc`
- Run formatter: `npm run format`
- Run linter: `npm run lint`

### Key Guidelines
- Use `async/await` over Promise chains
- Handle all errors explicitly - no silent failures
- Write descriptive variable and function names
- Add JSDoc comments for public functions
- Keep functions small and focused (Single Responsibility)

### Database
- All queries via Sequelize ORM - no raw SQL in business logic
- Add database indexes for frequently queried columns
- Use transactions for multi-step operations
- Never store sensitive data in plaintext

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "Auth Service"
```

We aim for **>80% code coverage** on all new features.

## Questions?

Open an issue or reach out via [Telegram](https://t.me/casteldazur).
