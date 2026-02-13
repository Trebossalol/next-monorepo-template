import AppSidebar from '@/components/app/app-sidebar'

export default async function AppLayout({ children }: NextLayoutProps) {
	return <AppSidebar>{children}</AppSidebar>
}
