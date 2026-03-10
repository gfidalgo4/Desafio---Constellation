Aqui explicas:

O que é o projeto
Como instalar
Como correr os testes
Decisões técnicas
Problemas conhecidos

# Playwright Automation Challenge

## Project Description

This project contains automated UI and API tests implemented using Playwright.
The UI tests target the OrangeHRM demo application and the API tests target the ReqRes public API.

---

## Tech Stack
- Playwright
- TypeScript
- AJV (JSON schema validation)
- Dotenv

---

## Project Structure

project-root/

├── src

│ ├── api

│ │ ├── clients

│ │ ├── schemas

│ │ └── tests

│ │

│ ├── ui

│ │ ├── pages

│ │ ├── tests

│ │ └── fixtures

│ │

│ └── utils

│

├── reports

├── playwright.config.ts

└── README.md

---

## Setup

Install dependencies:
    - npm install
    - npx playwright install

---

## Run Tests

Run all tests:
    - npm test
    - npx playwright test

Run UI tests:
    - npm run test:ui
    - npx playwright test --project=ui

Run API tests:
    - npm run test:api
    - npx playwright test --project=api

---

## Test Reports

After running tests an HTML report is generated.

Open the report:
    - npm run report
    - npx playwright show-report

---

## Environment Configuration

The project uses environment variables for configuration.

A template file `.env.example` is provided with the required variables.

Create a local `.env` file based on the template:
    - cp .env.example .env

---

## Design Decisions

- Page Object Model used for UI tests
- API client implemented for reusable API calls
- Fixtures used for test data
- Api clients Helper used for functions
- Api clients Users used for const 
- JSON schema validation implemented using AJV

