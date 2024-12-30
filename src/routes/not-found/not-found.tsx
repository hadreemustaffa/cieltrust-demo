import { LinkButtonPrimary } from '@/components/button';

export default function NotFound() {
  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-8 rounded-md border border-accent/10 p-8">
      <div className="flex max-w-xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <h1 className="text-4xl font-bold md:text-7xl lg:text-9xl">404</h1>
          <p className="font-bold">| Page not found</p>
        </div>
        <p>
          It looks like the page you’re looking for doesn’t exist or may have been moved. Not to worry! Use the
          navigation to find what you need, or head back to our homepage.
        </p>
      </div>
      <LinkButtonPrimary to="/">Back to homepage</LinkButtonPrimary>
    </div>
  );
}
