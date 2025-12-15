import { NextLayoutProps } from "@/types/next";
import { Page, PageBody, PageHeader, PagePrimaryBar } from "@workspace/ui/components/page";
import { ReactNode } from "react";

export default function ConfigurationLayout({ section1, section2 }: NextLayoutProps & {
    section1: ReactNode,
    section2: ReactNode
}) {
    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Configuration
                </PagePrimaryBar>
            </PageHeader>
            <PageBody>
                <div className="flex flex-col gap-4">
                    {section1}
                    {section2}
                </div>
            </PageBody>
        </Page>
    )
}