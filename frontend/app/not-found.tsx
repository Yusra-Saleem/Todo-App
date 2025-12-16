import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-4xl font-black text-[#800000]">404</h2>
            <p className="text-xl font-semibold">Page Not Found</p>
            <p className="text-muted-foreground">Could not find requested resource</p>
            <Button asChild>
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
