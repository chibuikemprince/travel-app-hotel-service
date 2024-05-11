## Description

The Hotel Microservices is a highly efficient system designed specifically for hotel booking. It provides a range of functionalities to cater to the needs of both users and administrators. Built with Next.js, Node.js, TypeScript, MongoDB, and RabbitMQ, this microservice ensures a seamless and reliable hotel booking experience.

Users can easily book hotels through this microservice, and after authorization via Google OAuth2, they can access their booking history effortlessly. This feature allows users to keep track of their hotel reservations and make any necessary changes or cancellations.

Similar to the Flight Microservices, the Hotel Microservices also facilitates real-time communication between services. After a successful hotel booking, it communicates with the user service via RabbitMQ to send email notifications to users. This ensures that users receive important information about their bookings and any updates related to their hotel reservations.

Next.js, Node.js, TypeScript, MongoDB, and RabbitMQ are the key technologies used in building the Hotel Microservices. Next.js provides efficient server-side rendering and client-side navigation, resulting in a smooth and responsive user interface. Node.js enables the microservice to handle a large number of concurrent requests effectively.

TypeScript enhances code maintainability and developer productivity, ensuring a reliable and bug-free application. MongoDB offers efficient data storage for hotel information, user details, and booking history. RabbitMQ facilitates seamless communication between different services, ensuring reliable and efficient message delivery for sending email notifications to users.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

```
