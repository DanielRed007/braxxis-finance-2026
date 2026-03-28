import type { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }): ReactNode {
  return <>{children}</>;
}
