This app demonstrates the default pattern for internationalization (i18n) in Next.js

The app CANNOT takes the user's locale preferences set in the browser (English or French)
It can only be accessed with "en/" or "fr/" as prefix in the pathname.

For SEO, the alternate URLs defined in the metadata are wrong.

It can use static generation though.

## Running

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/hello](http://localhost:3000/hello) with your browser to see the result.

Build the prod server:

```bash
npm run build
```

