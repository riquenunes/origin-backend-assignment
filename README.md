Hi there! This is my entry to Origin's senior backend position assignment. The project was made using TypeScript and Node.js because they are the technologies I work with daily and felt like was less "risky" using for the assignment.

# About the solution

I've tried taking a more domain driven approach, so you will notice that the HTTP server part of the solution was purposelly made to be very small.

As far as the business logic goes, you will see that I have several `InsuranceRiskCalculator` classes (domain services), each one is concerned with calculating the risk score for a specific insurance type (auto, home, life or disability).

The core idea of the solution was implementing in such a way that all score changing logic (eg deducting 1 risk point if the user's income is above $200k) are contained in separate classes (which I called `RiskFactor`s) that can be re-used and composed together with other `RiskFactor`s (using the [Chain of Responsibility pattern](https://refactoring.guru/pt-br/design-patterns/chain-of-responsibility)) to give the final risk score for a specific type of insurance. This makes the individual rules easier to test (although I've made the decision to test their combination in the `InsuranceRiskCalculator` classes instead of individually testing one by one) and removes duplicated logic, as one can simply combine multiple `RiskFactor`s to calculate the risk score for a specific insurance type.

I have also left some comments in the code itself, so feel free to check them out!

# Running

Make sure you have Docker installed

Build the image:
```
docker build -t awesome-assignment .
```

Run:
```
docker run -p 3000:1337 -t awesome-assignment # you can change 3000 to any other port you have available
```

# Testing

After the above steps a REST API will be running on port 3000 (or whatever port you chose)

## Sending a request
The application exposes a single endpoint at `/` that receives a POST request and expects the same body as the one described in the assignment's README.

```sh
curl --location --request POST 'http://127.0.0.1:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}'
```

Expected response (200):
```json
{
  "auto": "regular",
  "home": "economic",
  "life": "regular",
  "disability": "inelegible"
}
```

## Running tests

You can also run the tests using the same Docker image above:
```sh
docker run -t awesome-assignment npm test
```
