// app/auth/page.tsx

import React, { Suspense } from 'react';
import InvitePage from './InvitePage';

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      < InvitePage />
    </Suspense>
  );
}

