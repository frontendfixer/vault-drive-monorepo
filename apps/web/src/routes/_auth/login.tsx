import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { z } from 'zod';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LoadingIcon } from '@/components/loading-icon.tsx';
import { SecretInput } from '@/components/secret-input.tsx';
import { sleep } from '@/lib/utils.ts';

const inputSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<z.infer<typeof inputSchema>>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  const signInMutation = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async () => {
      const inputDataValidation = inputSchema.safeParse(formData);
      if (!inputDataValidation.success) {
        return toast.error('Invalid login credentials. Please try again.');
      }

      try {
        // const resp = await signInUser(inputDataValidation.data);
        const resp = { ok: true, message: 'Login successful' };
        if (resp.ok) {
          await sleep(500, () => {
            navigate({
              to: '/',
            });
          });
          return toast.success(resp.message);
        } else {
          return toast.error(resp.message);
        }
      } catch (error) {
        console.log('SignIn Error', error);
        return toast.error('System error. Please try again.');
      }
    },
  });
  return (
    <div className="from-accent-50 to-muted-100 w-full max-w-md rounded-lg bg-gradient-to-br p-4">
      {/* Login Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-xl font-semibold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              signInMutation.mutate();
            }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={signInMutation.isPending}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <SecretInput
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={signInMutation.isPending}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                  disabled={signInMutation.isPending}
                />
                <Label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm font-normal"
                >
                  Remember me
                </Label>
              </div>
              <Link
                aria-disabled
                to="/"
                // href="/forgot-password"
                className="text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? (
                <LoadingIcon className="mr-2 size-4" />
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {"Don't have an account? "}
              <Link
                to="/"
                className="text-foreground font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Google Sign In */}
          <div className="mt-6 space-y-3 border-t pt-5 text-center">
            <Button variant="outline" className="w-full" onClick={() => {}}>
              <FaGoogle /> Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground/30 mt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Vault Drive. All rights reserved.
        </p>
      </div>
    </div>
  );
}
