This app demonstrates a pattern for internationalization (i18n) using Next.js, without having a mandatory explicit base folder such as "en".

The app takes the user's locale preferences set in the browser (English or French)
Also, a page can still be accessed with "en/" or "fr/" as prefix in the pathname, to request a specific language (made for search-engine crawlers).

But, since Next.js doesn't know how to cache using the Vary header, when running build, you will see that the hello page is dynamic. Check the static branch to see the official Next.js way of handling internationalization.


## Running

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/hello](http://localhost:3000/hello) with your browser to see the result.

