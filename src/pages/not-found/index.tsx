import { Button } from '@/components/ui/button';
import { House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center justify-center">
                <h2 className="text-5xl font-black">404</h2>
                <h2 className="text-3xl font-semibold">Page not found</h2>

                <Button onClick={() => navigate('/')} className="px-10 py-6">
                    <House />
                    <p>Back</p>
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
