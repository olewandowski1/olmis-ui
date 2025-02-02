import { LanguagePicker } from '@/components/language-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const schemaWithTranslations = (
  t: TFunction<'translation', 'auth.LoginForm'>
) => {
  return z.object({
    username: z
      .string()
      .min(1, { message: t('usernameRequired') })
      .max(255, {
        message: t('maxLengthExceeded', { max: 255 }),
      }),
    password: z.string().min(1, { message: t('passwordRequired') }),
  });
};

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { t } = useTranslation('translation', { keyPrefix: 'auth.LoginForm' });
  const loginSchema = schemaWithTranslations(t);

  type LoginFormData = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
    navigate({ to: '/home' });
  };

  const toggleVisibility = () =>
    setIsVisible((prevState: boolean) => !prevState);

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                  <h1 className='text-2xl font-bold'>{t('title')}</h1>
                  <p className='text-sm text-balance text-muted-foreground'>
                    {t('subtitle')}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center justify-between h-5'>
                        <Typography.Small>
                          {t('usernameLabel')}
                          <span className='ml-1 text-destructive'>*</span>
                        </Typography.Small>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('usernamePlaceholder')}
                          aria-describedby='username-input-description'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center justify-between h-5'>
                        <Typography.Small>
                          {t('passwordLabel')}

                          <span className='ml-1 text-destructive'>*</span>
                        </Typography.Small>
                        <a
                          href='#'
                          className='ml-auto text-sm underline-offset-2 hover:underline text-muted-foreground'
                        >
                          {t('forgotPassword')}
                        </a>
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            className='pe-9'
                            placeholder={t('passwordPlaceholder')}
                            type={isVisible ? 'text' : 'password'}
                            aria-describedby='password-input-description'
                            {...field}
                          />
                          <button
                            className='absolute inset-y-0 flex items-center justify-center h-full transition-colors end-0 w-9 rounded-e-lg text-muted-foreground/80 outline-offset-2 hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                            type='button'
                            onClick={toggleVisibility}
                            aria-label={
                              isVisible ? 'Hide password' : 'Show password'
                            }
                            aria-pressed={isVisible}
                            aria-controls='password'
                          >
                            {isVisible ? (
                              <EyeOff
                                size={16}
                                strokeWidth={2}
                                aria-hidden='true'
                              />
                            ) : (
                              <Eye
                                size={16}
                                strokeWidth={2}
                                aria-hidden='true'
                              />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2
                      size={16}
                      strokeWidth={2}
                      className='animate-spin'
                    />
                  )}
                  {t('loginButton')}
                </Button>
                <div className='relative text-sm text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                  <span className='relative z-10 px-2 bg-card text-muted-foreground'>
                    {t('preferences')}
                  </span>
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center justify-between'>
                    <Typography.Small>{t('language')}</Typography.Small>
                    <LanguagePicker />
                  </div>
                </div>
              </div>
            </form>
            <div className='relative hidden bg-muted md:block'>
              <img
                src='/placeholder.svg'
                alt='Image'
                className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
              />
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className='text-balance italic text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        {t('poweredBy')} <a href='#'>{t('appName')}</a>.
      </div>
    </div>
  );
};
