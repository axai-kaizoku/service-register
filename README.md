# Service Register

A Basic E - Service App which register complaints online and can track complain with given request ID. Integrated Admin panel to manage complaints and change status of complaints.

## Technologies

- [Next js](https://nextjs.org/)
- [React js](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Next Auth](https://next-auth.js.org/)

## Screenshots

Home
![Home](/e-service-main.png)

Creating a request.
![Home](/e-service-create-req.png)

Request ID
![Home](/e-service-req-id.png)

Request Detail
![Home](/e-service-req-detail.png)

Admin Login
![Home](/e-service-login.png)

Admin Dashboard
![Home](/e-service-admin.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/axai-kaizoku/service-register.git
```

Go to the project directory

```bash
  cd service-register
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

`NEXT_PUBLIC_MONGODB_URL`

`UPLOADTHING_SECRET`

`UPLOADTHING_APP_ID`

## License

[MIT](https://choosealicense.com/licenses/mit/)
