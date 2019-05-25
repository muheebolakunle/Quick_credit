# Quick_credit

[![Build Status](https://travis-ci.org/muheebolakunle/Quick_credit.svg?branch=develop)](https://travis-ci.org/muheebolakunle/Quick_credit)
[![Maintainability](https://api.codeclimate.com/v1/badges/8793692113ba5c01d06e/maintainability)](https://codeclimate.com/github/muheebolakunle/Quick_credit/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8793692113ba5c01d06e/test_coverage)](https://codeclimate.com/github/muheebolakunle/Quick_credit/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/muheebolakunle/Quick_credit/badge.svg?branch=develop)](https://coveralls.io/github/muheebolakunle/Quick_credit?branch=develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)



## Project Overview

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.


## Features

1. User (client) can sign up.
2. User (client) can login.
3. User (client) can request for only one loan at a time.
4. User (client) can view loan repayment history, to keep track of his/her liability or
responsibilities.
5. Admin can mark a client as verified, after confirming his/her home and work address.
6. Admin can view a specific loan application.
7. Admin can approve or reject a client’s loan application.
8. Admin can post loan repayment transaction in favour of a client.
9. Admin can view all loan applications.
10. Admin can view all current loans (not fully repaid).
11. Admin can view all repaid loans.

### Optional Features

1. User can reset password.
2. Integrate real time email notification upon approval or rejection of a loan request.


## Project Pipeline

- [Pivotal Tracker stories](https://www.pivotaltracker.com/n/projects/2327655)
- [UI Templates](https://muheebolakunle.github.io/Quick_credit/UI)
- [Hosted API](https://quickcredit-kuns.herokuapp.com/api/v1)


## Technologies

- Node JS
- Express
- Mocha & Chai
- Joi
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node Js
To run:


```sh
git clone <https://github.com/muheebolakunle/Quick_credit.git>
cd quickcreditapp
npm install
npm start
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create user account`

`- POST /api/v1/auth/signin Login a user`

`- GET /api/v1/user Get all user`

`- GET /api/v1/user/<:id> Get a user`

`- PATCH /api/v1/user/<:id> Update a user`

`- DELETE /api/v1/user/<:id> Delete a user`

`- POST /api/v1/loans Create a loan application`

`- GET /api/v1/loans/<:loan-id>/repayment View loan repayment history`

`- GET /api/v1/loans Get all loan applications`

`- GET /api/v1/loans?status=approved&repaid=false Get all current loans that are not fully repaid`

`- GET /api/v1/loans?status=approved&repaid=true Get all repaid loans.`

`- PATCH /api/v1/users/<:user-email>/verify Mark a user as verified`

`- GET /api/v1/loans/<:loan-id> Get a specific loan application`

`- PATCH /api/v1/loans/<:loan-id> Approve or reject a loan application`

`- POST /api/v1/loans/<:loan-id>/repayment Create a loan repayment record`


## License
The QuickCredit API is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author

Muheeb Olakunle

