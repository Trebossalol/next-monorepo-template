import { NextLayoutProps } from "@/types/next";

export default function AuthLayout({ children }: NextLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {children}
        </div>
    );
}
