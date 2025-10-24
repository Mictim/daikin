"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import CardWrapper from "../card-wrapper";
import FormError from "../form-error";
import { FormSuccess } from "../form-success";

import { useAuthState } from "@/hooks/use-auth-state";
import { signIn } from "@/lib/auth-client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Import the schemas (adjusted to match likely export)
import { requestOTP } from "@/helpers/auth/request-otp";
import TraditionalSignInSchema from "@/helpers/zod/login-schema";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SignIn = () => {
    const locale = useLocale();
    const t = useTranslations('signIn');
    const router = useRouter();
    const {
        error,
        success,
        loading,
        setSuccess,
        setError,
        setLoading,
        resetState
    } = useAuthState();

    // Infer schemas from the union


    // Dynamically select schema based on sign-in method
    const currentSchema = TraditionalSignInSchema;

    const form = useForm<z.infer<typeof currentSchema>>({
        resolver: zodResolver(currentSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof currentSchema>) => {
        resetState();
        setLoading(true);

        try {
            // Traditional sign-in
            const signInValues = values as z.infer<typeof TraditionalSignInSchema>;
            // Determine if input is email or username
            await signIn.email(
                {
                    email: signInValues.email,
                    password: signInValues.password
                },
                {
                    onRequest: () => setLoading(true),
                    onResponse: () => setLoading(false),
                    onSuccess: async (ctx) => {
                        if (ctx.data.twoFactorRedirect) {
                            const response = await requestOTP()
                            if (response?.data) {
                                setSuccess(t('success.otpSent'))
                                router.push(`/${locale}/two-factor`)
                            } else if (response?.error) {
                                setError(response.error.message)
                            }
                        } else {
                            setSuccess(t('success.loggedIn'));
                            router.replace(`/${locale}/`);
                        }
                    },
                    onError: (ctx) => {
                        setError(
                            ctx.error.message || t('error.loginFailed')
                        );
                    },
                }
            );
        } catch (err) {
            console.error(err);
            setError(t('error.somethingWrong'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardWrapper
            cardTitle={t('title')}
            cardDescription={t('description')}
            cardFooterDescription={t('footerDescription')}
            cardFooterLink={`/signup`}
            cardFooterLinkTitle={t('footerLink')}
            showCloseButton={true}
            closeButtonLink="/"
        >
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Email or Username Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t('email')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="text"
                                        placeholder={t('emailPlaceholder')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field (only for traditional sign-in) */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('password')}</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        type="password"
                                        placeholder={t('passwordPlaceholder')}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                <Link
                                    href="/forgot-password"
                                    className="text-xs underline ml-60"
                                    locale={locale}
                                >
                                    {t('forgotPassword')}
                                </Link>
                            </FormItem>
                        )}
                    />
                    {/* Error & Success Messages */}
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    {/* Submit Button */}
                    <Button disabled={loading} type="submit" className="w-full">
                        {t('login')}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default SignIn;