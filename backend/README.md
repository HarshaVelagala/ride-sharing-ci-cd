# RideShare Showcase Backend

This folder holds a tiny Spring Boot service that mirrors the contracts the frontend expects. It is not production ready—its goal is to document the shape of a potential backend and give the UI something concrete to point at.

## Running locally

```bash
cd backend
./mvnw spring-boot:run
```

or build the container image:

```bash
docker compose up --build
```

## High-level modules

- `config` – security placeholders (`SecurityConfig`, `JwtAuthFilter`, `JwtUtil`).
- `controller` – REST endpoints for authentication and ride booking.
- `service` – in-memory implementations for quick demos.
- `repository` – Spring Data JPA repositories for when a database is wired in.
- `dto`/`model` – transport and persistence objects.

Feel free to replace these stubs with your real business logic.
