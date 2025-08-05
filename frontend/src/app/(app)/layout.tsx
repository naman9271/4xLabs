'use client';

import { withAuth } from '@/context/auth-context';

function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export default withAuth(AppGroupLayout);
