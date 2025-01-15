This app demonstrates a pattern for internationalization (i18n) using Next.js, without having a mandatory explicit base folder such as "en".

The app takes the user's locale preferences set in the browser (English or French)
Also, a page can still be accessed with "en/" or "fr/" as prefix in the pathname, to request a specific language (made for search-engine crawlers).

But, since Next.js doesn't know how to cache using the Vary header, when running build, you will see that the hello page is dynamic. 
To test static generation, set locale = "en" in app/layout.tsx ad import Hello-dynamic in app/hello/page.tsx. Also update generateMetadata(). To reintroduce i18n with static generation, you then need to create a route segment for the locale, and all URLs must contain the locale. In all your components and in generateMetadata(), you will then use the params to access the locale.

## Running

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/hello](http://localhost:3000/hello) with your browser to see the result.

