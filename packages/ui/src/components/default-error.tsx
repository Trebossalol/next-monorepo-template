'use client';

import * as React from 'react';
import { RotateCcwIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';

export type DefaultErrorProps = {
    error: Error;
    reset: () => void;
};

export function DefaultError({
    reset
}: DefaultErrorProps): React.JSX.Element {
    const handleReset = (): void => {
        reset?.();
    };
    return (
        <Card className="border-dashed shadow-none">
            <CardContent className="flex flex-col items-center justify-center gap-4 pt-6">
                <div className="flex items-center justify-center rounded-md border bg-background p-2 shadow-xs">
                    <TriangleAlertIcon className="size-4 shrink-0 text-orange-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                    Ein unerwarteter Fehler ist aufgetreten.
                </p>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                >
                    <RotateCcwIcon className="size-4" />
                    <span>Erneut versuchen</span>
                </Button>
            </CardContent>
        </Card>
    );
}