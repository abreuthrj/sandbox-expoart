Expoart is a social media project developed to allow artists to display and get acknowledged for their work.

## Summary

1. [Configuration](#configuration)
2. [Running locally](#running-on-your-machine)

## Configuration

This project counts on a `.env` file containing the database configuration. Take a look at `.env.example` file to create your own configurations. ( In case of driver changes, don't forget to change `prisma/schema.prisma` provider )

<table>
  <tr>
    <td>Framework</td>
    <td>NextJS</td>
  </tr>
  <tr>
    <td>CSS</td>
    <td>TailwindCSS</td>
  </tr>
  <tr>
    <td>Database Framework</td>
    <td>Prisma</td>
  </tr>
  <tr>
    <td>Database Driver</td>
    <td>MySQL</td>
  </tr>
  <tr>
    <td>DevOps</td>
    <td>Docker</td>
  </tr>
</table>

## Running on your machine

First of all you will need to install Docker.

Once docker is installed, you can run the following commands to run your project locally

```bash
docker-compose up -d
yarn
yarn migrate
yarn dev
```
