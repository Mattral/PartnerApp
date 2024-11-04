import { useEffect, ReactNode } from 'react';

// MATERIAL - UI
import { CacheProvider } from '@emotion/react';
import createCache, { StylisPlugin } from '@emotion/cache';

// THIRD - PARTY
import rtlPlugin from 'stylis-plugin-rtl';

// PROJECT IMPORTS
import useConfig from 'hooks/useConfig';

// TYPES
import { ThemeDirection } from 'types/config';

// ==============================|| RTL LAYOUT ||============================== //

interface Props {
  children: ReactNode;
}

const RTLLayout = ({ children }: Props) => {
  const { themeDirection } = useConfig();

  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: themeDirection === ThemeDirection.RTL ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: themeDirection === ThemeDirection.RTL ? [rtlPlugin as StylisPlugin] : []
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};

export default RTLLayout;
