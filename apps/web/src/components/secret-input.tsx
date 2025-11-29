import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SecretInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  const [showSecret, setShowSecret] = useState(false);
  const disabled =
    props.value === '' || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input
        type={showSecret ? 'text' : 'password'}
        className={cn('hide-secret-toggle pr-10', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowSecret((prev) => !prev)}
        disabled={disabled}
      >
        {showSecret && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showSecret ? 'Hide secret' : 'Show secret'}
        </span>
      </Button>

      {/* hides browsers secret toggles */}
      <style>{`
					.hide-secret-toggle::-ms-reveal,
					.hide-secret-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
};
SecretInput.displayName = 'SecretInput';

export { SecretInput };
