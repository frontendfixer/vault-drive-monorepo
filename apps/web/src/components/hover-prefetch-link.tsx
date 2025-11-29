import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function HoverPrefetchLink({
  ...props
}: React.ComponentProps<typeof Link>) {
  const [active, setActive] = useState(false);

  return (
    <Link
      preload={active ? 'intent' : undefined}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...props}
    />
  );
}
