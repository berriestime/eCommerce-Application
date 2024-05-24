import { AppProvider } from '@/providers/app';

import { useAuthStateChange } from './hooks/useAuthStateChange';

const App = (): JSX.Element => {
  useAuthStateChange();
  return <AppProvider />;
};

export { App };
