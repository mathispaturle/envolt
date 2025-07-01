'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground">
      © {year} Envolt — All rights reserved. <br />
      Made with ❤️ using <span className="font-medium text-foreground">Envolt</span>.
    </footer>
  );
}
