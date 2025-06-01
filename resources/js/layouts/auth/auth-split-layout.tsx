import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {


    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-[url('/storage/images/company.jpg')] bg-cover bg-center z-0" />
                
                <div className="absolute inset-0 bg-black/50 z-10" />

                <Link href={route('home')} className="relative z-20 flex items-center font-bold text-lg font-medium text-white w-45 rounded-lg h-12">
                    <img
                        src="/storage/images/logo.png"
                        style={{ width: '60px', height: 'auto', objectFit: 'cover' }}
                        alt="ConectaPro Logo"
                    />
                    ConectaPro
                </Link>

                {/* Frase */}
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2 text-white font-bold w-50 text-lg items-center justify-center rounded-lg h-12">
                        <p className="text-lg">Las puertas a tu futuro.</p>
                    </blockquote>
                </div>
            </div>

            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
