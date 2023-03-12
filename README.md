# HR System

Clean architectured, Infrastructure agnostic and Domain Driven designed Human Resource application.

`Testing status:` [![CircleCI](https://dl.circleci.com/status-badge/img/gh/web2solutions/cbh-take-home-staffing/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/web2solutions/cbh-take-home-staffing/tree/main)

`Known Vulnerabilities:` ![Known Vulnerabilities](https://snyk.io/test/github/web2solutions/cbh-take-home-staffing/badge.svg)

`Testing coverage:` [![codecov](https://codecov.io/gh/web2solutions/cbh-take-home-staffing/branch/main/graph/badge.svg?token=5118POS3ED)](https://codecov.io/gh/web2solutions/cbh-take-home-staffing)

![cov](https://codecov.io/gh/web2solutions/cbh-take-home-staffing/branch/main/graphs/sunburst.svg?token=5118POS3ED)

### Architecture

- `Design principles`
  - Domain Driven Design
  - The Clean Architecture
  - Hexagonal Architecture
  - SOLID.
  - Monolithic. Ability to quickly switch to microservice.
- `Language`: TypeScript
- `Database`: Agnostic, In Memory, Key/Value, NoSQL

## Domains

![UML classes](/domains.png "UML classes")

#### Project Structure

    .
    ├── ...
    ├── src
    │   ├── Domains
    │   │   ├── Facilities
    │   │   │   ├── Data Entity
    │   │   │   │   ├── IFacility.js
    │   │   │   ├── Data Model
    │   │   │   │   ├── Facility.js
    │   │   │   ├── Data Repository
    │   │   │   │   ├── FacilityMongoDB.js
    │   │   │   ├── Use cases
    │   │   │
    │   │   ├── Agents
    │   │   │   ├── Data Entity
    │   │   │   │   ├── IAgent.js
    │   │   │   ├── Data Model
    │   │   │   │   ├── Agent.js
    │   │   │   ├── Data Repository
    │   │   │   │   ├── AgentMongoDB.js
    │   │   │   ├── Use cases
    │   │   │
    │   │   └── Shifts
    │   │       ├── Data Entity
    │   │       │   ├── IShift.js
    │   │       ├── Data Model
    │   │       │   ├── Shift.js
    │   │       ├── Data Repository
    │   │       │   ├── ShiftMongoDB.js
    │   │       ├── Use cases
    │   │           ├── getShiftsByFacility.js
    │   │           ├── generateReport.js
    │   │
    │   └── Infrastructure
    │       ├── Persistence
    │       │   ├── BaseRepo.ts
    │       │   ├── InMemory.ts
    │       │   ├── Paging.ts
    │       │
    │       ├── Utils
    │
    ├── tests                   # Test files
    │   
    └── ...





## How to get started

1. [Install Node.js](https://nodejs.org/en/download/)
2. Run `npm i` in this repo to install dependencies
3. Run `npm test` to run the automated tests

## ToDo

- Application Bootstrap - foundation
  - Start services
  - API routing
  - Caching
  - APM
- Add Open API support to provide API documentation
- Decouple each domain into different microservices
  - Low Latency internal communication. gRPC? ZeroMQ?
- Create Controllers for API endpoints.
  - Lambda handlers
  - Express.js handlers
- Add more Data Repositories
  - MongoDB
  - DynamoDB
  - PostgreSQL
  - Redis
- Integration Testing
- CircleCI

