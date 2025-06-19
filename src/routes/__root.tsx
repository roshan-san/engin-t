import type { ReactNode } from 'react'
import { Outlet, HeadContent, Scripts, createRootRouteWithContext, redirect, } from '@tanstack/react-router'
import { ReloadPrompt } from '../components/ReloadPrompt'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from "src/components/ui/sonner"
import "../styles/app.css"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()
    ({
        head: () => ({
            meta: [
                { title: "Engin" },
                { name: 'apple-mobile-web-app-title', content: 'Engin' },
                { charSet: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'theme-color', content: '#ffffff' }
            ],
            links: [
                { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'shortcut icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
            ],
        }),
        component: RootComponent,
    })

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                <ThemeProvider>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Toaster />
                </ThemeProvider>
                <ReloadPrompt />
                <Scripts />
            </body>
        </html>
    )
}