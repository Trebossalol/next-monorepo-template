import Link from "next/link";
import * as React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";

export type PageElement = HTMLDivElement
export type PageProps = React.ComponentProps<"div">
export function Page({ children, className, ...other }: PageProps) {
    return (
        <div className={cn("flex h-full flex-col", className)} {...other}>
            {children}
        </div>
    );
}

export type PageHeaderElement = HTMLDivElement
export type PageHeaderProps = React.ComponentProps<"div">
export function PageHeader({
    className,
    children,
    ...other
}: PageHeaderProps) {
    return (
        <div
            className={cn("sticky top-0 z-20 bg-background", className)}
            {...other}
        >
            {children}
        </div>
    );
}

export type PagePrimaryBarElement = HTMLDivElement
export type PagePrimaryBarProps = React.ComponentProps<"div">
export function PagePrimaryBar({
    className,
    children,
    ...other
}: PagePrimaryBarProps) {
    return (
        <div
            className={cn(
                "relative flex h-14 flex-row items-center gap-1 border-border/50 border-b px-4 sm:px-6",
                className,
            )}
            {...other}
        >
            <SidebarTrigger />
            <Separator className="mr-2 h-4!" orientation="vertical" />
            <div className="flex w-full flex-row items-center justify-between">
                {children}
            </div>
        </div>
    );
}

export type PageTitleElement = HTMLHeadingElement
export type PageTitleProps = React.ComponentProps<"h1">
function PageTitle({
    className,
    children,
    ...other
}: PageTitleProps): React.JSX.Element {
    return (
        <h1 className={cn("font-bold text-lg sm:text-xl", className)} {...other}>
            {children}
        </h1>
    );
}

export type BreadcrumbSegment = {
    label: string;
    href?: string;
}

export function PageBreadcrumb({
    segments,
    className,
    ...props
}: {
    segments: BreadcrumbSegment[];
    className?: string;
} & React.ComponentProps<"nav">) {
    return (
        <Breadcrumb className={className} {...props}>
            <BreadcrumbList>
                {segments.map((segment, idx) => {
                    const isLast = idx === segments.length - 1;
                    return (
                        <React.Fragment key={segment.label + idx}>
                            <BreadcrumbItem>
                                {isLast || !segment.href ? (
                                    <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={segment.href}>{segment.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export type PageActionsElement = HTMLDivElement
export type PageActionsProps = React.ComponentProps<"div">
export function PageActions({
    className,
    children,
    ...other
}: PageActionsProps) {
    return (
        <div className={cn("flex items-center gap-2", className)} {...other}>
            {children}
        </div>
    );
}

export type PageSecondaryBarElement = HTMLDivElement
export type PageSecondaryBarProps = React.ComponentProps<"div">
export function PageSecondaryBar({
    className,
    children,
    ...other
}: PageSecondaryBarProps) {
    return (
        <div
            className={cn(
                "relative flex h-12 items-center justify-between gap-2 border-b px-4 sm:px-6",
                className,
            )}
            {...other}
        >
            {children}
        </div>
    );
}

export type PageBodyElement = HTMLDivElement
export type PageBodyProps = React.ComponentProps<"div"> & {
    disableScroll?: boolean;
}
export function PageBody({
    children,
    className,
    disableScroll = false,
    ...other
}: PageBodyProps) {
    if (disableScroll) {
        return (
            <div className={cn("flex h-full flex-col", className)} {...other}>
                {children}
            </div>
        );
    }

    return (
        <div className={cn("grow overflow-hidden", className)} {...other}>
            <ScrollArea className="h-full">{children}</ScrollArea>
        </div>
    );
}

export type PageContentProps = React.PropsWithChildren<{
    title: string;
    action?: React.ReactNode;
}>
export function PageContent({
    title,
    action,
    children,
}: PageContentProps) {
    return (
        <div className="p-4 pb-24 sm:px-6 sm:pt-6">
            <div className="mx-auto w-full space-y-4">
                <div
                    className={
                        action ? "flex flex-row items-center justify-between" : undefined
                    }
                >
                    <PageTitle>{title}</PageTitle>
                    {action}
                </div>
                {children}
            </div>
        </div>
    );
}
