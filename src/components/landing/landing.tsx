import { Button } from '../ui/button';
import SectionWrapper from '../layout/section-wrapper';
import { usePwaInstall } from '@/lib/hooks/use-pwa-install';

export const Landing = () => {
  const { deviceType, isInstalled, canInstall, triggerInstall } = usePwaInstall();

  const renderInstallSection = () => {
    // Hide if already installed
    if (isInstalled) return null;

    // Desktop: informational message
    if (deviceType === 'desktop') {
      return (
        <div className="w-full">
          <p className="text-center text-base md:text-2xl">
            For app-like experience visit and install on mobile
          </p>
        </div>
      );
    }

    // iOS: show instructions (no programmatic install available)
    if (deviceType === 'ios') {
      return (
        <div className="w-full">
          <p className="text-center text-base md:text-2xl">
            For quick access, tap <span className="font-medium">Share</span> then{' '}
            <span className="font-medium">"Add to Home Screen"</span>
          </p>
        </div>
      );
    }

    // Android/Chrome: show install button when prompt is available
    if (deviceType === 'android' && canInstall) {
      return (
        <Button variant="outline" onClick={triggerInstall} className="w-full">
          Add to Home Screen
        </Button>
      );
    }

    // Android but prompt not yet available - show informational text
    if (deviceType === 'android') {
      return <p className="text-base md:text-2xl">Add to your home screen for quick access</p>;
    }

    return null;
  };

  const installContent = renderInstallSection();

  return (
    <SectionWrapper className="flex-1">
      <div className="">
        <h1 className="mb-4">
          In charge of the bills?
          <br />
          Skip the awkward math.
        </h1>
        <h2>Invite housemates by email and track who owes what.</h2>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button variant={'split'} asChild>
          <a href="/signup">Start organizing</a>
        </Button>
      </div>
      {installContent && (
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex w-full flex-col justify-end rounded-[.5rem] bg-grey-1 p-6">
            {installContent}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};
