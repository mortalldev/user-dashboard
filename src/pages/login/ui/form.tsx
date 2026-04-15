import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/entities/auth';
import { toast } from 'sonner';
import { setCredentials } from '@/entities/auth/authSlice';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema, type LoginFormValues } from '@/shared/lib/validations/auth';
import { useAppDispatch } from '@/shared/lib/utils';

export function LoginForm() {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const res = await login(values).unwrap();

            if (res) {
                navigate('/');
                toast.success('Login success!');
                dispatch(setCredentials({ token: res.access_token }));
            }
        } catch (error: any) {
            toast.error(error?.data?.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-lg w-full border p-6 rounded-md"
        >
            <h2 className="font-semibold text-xl text-center">Login</h2>
            <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="off"
                    {...register('email')}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="******"
                        autoComplete="off"
                        {...register('password')}
                    />

                    <Button
                        variant={'ghost'}
                        type="button"
                        className="absolute right-0"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? 'Loading...' : 'Login'}
            </Button>
        </form>
    );
}
