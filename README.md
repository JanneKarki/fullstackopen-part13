# fullstackopen-part13
Relational databases

## Setup

Install dependencies:

```
npm install
```

Create a `.env` file in the project root:

```
DATABASE_URL=postgres://user:password@host:port/database
TEST_DATABASE_URL=postgres://user:password@host:port/test_db?sslmode=no-verify
SECRET=some_secret_string
```

Database migrations are run automatically when the application starts.

## Running

Start the application (http://localhost:3001):

```
npm start
```

Start in development mode with automatic restarts:

```
npm run dev
```

## Testing

Start the application against the test database:

```
npm run start:test
```

Run the tests in another terminal:

```
npm test
```
