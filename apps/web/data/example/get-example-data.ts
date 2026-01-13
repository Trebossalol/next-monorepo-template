import 'server-only'
import { ExampleItem, ExampleStatus } from '@/types/dto/example/example-table'
import { searchParamsCache } from '@/components/app/example/search-params'
import { cacheLife } from 'next/cache'

export const getExampleData = async (): Promise<ExampleItem[]> => {

    'use cache'
    cacheLife('minutes')

    const { pageIndex, pageSize, sortBy, sortOrder } = searchParamsCache.all()

    console.log(`getExampleData: pageIndex=${pageIndex}, pageSize=${pageSize}, sortBy=${sortBy}, sortOrder=${sortOrder}`)

    // Return mock data with various statuses for demonstration
    return [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            status: ExampleStatus.Active,
            description: 'Active user with full access',
            createdAt: new Date('2024-01-15'),
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            status: ExampleStatus.Pending,
            description: 'Pending approval',
            createdAt: new Date('2024-01-20'),
        },
        {
            id: '3',
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            status: ExampleStatus.Inactive,
            description: 'Account suspended',
            createdAt: new Date('2024-01-10'),
        },
        {
            id: '4',
            name: 'Alice Williams',
            email: 'alice.williams@example.com',
            status: ExampleStatus.Active,
            description: 'Premium member',
            createdAt: new Date('2024-01-25'),
        },
        {
            id: '5',
            name: 'Charlie Brown',
            email: 'charlie.brown@example.com',
            status: ExampleStatus.Pending,
            createdAt: new Date('2024-01-28'),
        },
        {
            id: '6',
            name: 'Diana Prince',
            email: 'diana.prince@example.com',
            status: ExampleStatus.Active,
            description: 'Administrator',
            createdAt: new Date('2024-01-05'),
        },
        {
            id: '7',
            name: 'Edward Norton',
            email: 'edward.norton@example.com',
            status: ExampleStatus.Inactive,
            createdAt: new Date('2024-01-12'),
        },
        {
            id: '8',
            name: 'Fiona Apple',
            email: 'fiona.apple@example.com',
            status: ExampleStatus.Active,
            description: 'Content creator',
            createdAt: new Date('2024-01-18'),
        },
        {
            id: '9',
            name: 'George Lucas',
            email: 'george.lucas@example.com',
            status: ExampleStatus.Pending,
            description: 'Awaiting verification',
            createdAt: new Date('2024-01-22'),
        },
        {
            id: '10',
            name: 'Helen Keller',
            email: 'helen.keller@example.com',
            status: ExampleStatus.Active,
            createdAt: new Date('2024-01-30'),
        },
    ]
}

