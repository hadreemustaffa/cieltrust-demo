import { LinkButtonPrimary } from '@/components/button';

export default function OpenAccountBanner() {
  return (
    <div className="border-accent/10 bg-surface flex flex-col items-center gap-8 rounded-md border px-4 py-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">
          Start your financial journey with <span className="text-brand">Cieltrust</span> today!
        </h2>
        <p className="max-w-prose">
          Enjoy seamless, secure, and convenient financial solutions tailored just for you. Unlock a world of
          possibilities with our innovative products and exceptional customer service.
        </p>
      </div>

      <LinkButtonPrimary to="/signup/">Open Account</LinkButtonPrimary>
    </div>
  );
}
