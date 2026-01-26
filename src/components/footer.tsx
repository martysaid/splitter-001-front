export const Footer = () => {
  return (
    <footer className="w-full px-6 pb-8 pt-0 md:px-12">
      <small className="block text-center text-xs text-foreground md:text-base">
        See our{' '}
        <a href="/agreement" className="font-semibold hover:underline hover:underline-offset-4">
          User Agreement
        </a>{' '}
        and{' '}
        <a href="/privacy" className="font-semibold hover:underline hover:underline-offset-4">
          Privacy Policy
        </a>
      </small>
    </footer>
  );
};
