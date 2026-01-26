import { useState, useEffect, useCallback } from 'react';

// BeforeInstallPromptEvent is not in standard DOM types
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type DeviceType = 'desktop' | 'ios' | 'android';

interface UsePwaInstallReturn {
  deviceType: DeviceType;
  isInstalled: boolean;
  canInstall: boolean;
  triggerInstall: () => Promise<void>;
}

function getDeviceType(): DeviceType {
  if (typeof navigator === 'undefined') return 'desktop';

  const userAgent = navigator.userAgent.toLowerCase();

  // iOS detection (iPhone, iPad, iPod)
  // Note: iPad on iOS 13+ reports as Mac, so we also check for touch support
  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) return 'ios';

  // Android or other mobile devices that support beforeinstallprompt
  const isMobile = /android|webos|blackberry|opera mini|iemobile/i.test(userAgent);

  if (isMobile) return 'android';

  return 'desktop';
}

function getIsInstalled(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for standalone display mode (PWA installed)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  // iOS Safari standalone mode
  const isIOSStandalone =
    'standalone' in navigator && (navigator as Navigator & { standalone: boolean }).standalone;

  return isStandalone || isIOSStandalone;
}

export function usePwaInstall(): UsePwaInstallReturn {
  const [deviceType] = useState<DeviceType>(() => getDeviceType());
  const [isInstalled, setIsInstalled] = useState<boolean>(() => getIsInstalled());
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Listen for the beforeinstallprompt event (Chrome/Edge/Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Also listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
      }
    };
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    // Clear the deferred prompt (can only be used once)
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  // Can install if we have a deferred prompt (Android/Chrome)
  // iOS can always "install" manually via share menu
  const canInstall = deferredPrompt !== null || deviceType === 'ios';

  return {
    deviceType,
    isInstalled,
    canInstall,
    triggerInstall,
  };
}
