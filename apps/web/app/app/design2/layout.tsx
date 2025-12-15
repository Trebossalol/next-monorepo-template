import { NextLayoutProps } from "@/types/next";
import { Page, PageBody, PageHeader, PagePrimaryBar, PageSecondaryBar } from "@workspace/ui/components/page";
import { ReactNode } from "react";
import Design2TabSelector from "@/components/app/design2/tab-selector";

export default function ConfigurationLayout({ section1, section2 }: NextLayoutProps & {
    section1: ReactNode,
    section2: ReactNode
}) {
    return (
        <Page>
            <PageHeader>
                <PagePrimaryBar>
                    Design 2
                </PagePrimaryBar>
                <PageSecondaryBar>
                    <Design2TabSelector />
                </PageSecondaryBar>
            </PageHeader>
            <PageBody>
                {section1}
                {section2}
            </PageBody>
        </Page>
    )
}