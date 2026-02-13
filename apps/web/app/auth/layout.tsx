import { APP_NAME, APP_SLOGAN, APP_VERSION } from "@workspace/common/constants";

export default function AuthLayout({ children }: NextLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col px-4">
            <div className="flex-1 flex items-center justify-center">{children}</div>
            <footer className="pb-8 text-center">
                <p className="text-sm font-medium text-zinc-500">
                    {APP_NAME} - {APP_VERSION}
                </p>
                <p className="mt-0.5 text-xs text-zinc-600">{APP_SLOGAN}</p>
            </footer>
        </div>
    );
}
