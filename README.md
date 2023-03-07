# Pseudo code for a Human Resource application

- `Design approach`: Domain Driven Design, The Clean Architecture, SOLID.
- `Database type`: NoSQL
- `Language`: TypeScript

## Domains

![UML classes](/domains.png "UML classes")



## how to get started:

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

