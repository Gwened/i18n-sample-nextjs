export default function makeSiteUrl(pathname: string) {
    // Add your own  environment variables here
    return `http://localhost:${process.env.PORT || 3000}${pathname}`;
}
  