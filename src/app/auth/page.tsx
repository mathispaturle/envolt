// app/auth/page.tsx

import React, { Suspense } from 'react';
import LoginPage from './LoginPage';

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}

