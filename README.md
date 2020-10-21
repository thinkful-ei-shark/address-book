# POST and DELETE Requests: Assignment

- Start a new project called address-book from your Express Boilerplate
- This app will store contact information in the following format:
  {
  id: UUID,
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: Number
  }
- Create a GET route on /address that fetches all addresses

- Create a POST route on /address that creates a new address

  - The new record should have the following request validations:
    - ALL fields except address2 are required
    - state must be exactly two characters
    - zip must be exactly a five-digit number
    - you DON’T need to validate if the state/zip are “real”

- The server should generate an id with the UUID library upon receiving the POST request and return it with the response body

- Create a DELETE route on /address/:id

- Add Bearer Token Authorization middleware on ONLY the POST/DELETE routes
