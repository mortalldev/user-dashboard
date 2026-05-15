import ComingSoonCard from '@/components/coming-soon-card';
// import { Button } from '@/components/ui/button';
// import GlobalLimits from '@/pages/limits/global/list';
// import UsersLimits from '@/pages/limits/users/list';
// import { Globe, Users } from 'lucide-react';
// import { useState } from 'react';

const Limits = () => {
    // const [tabs, setTabs] = useState<'global' | 'users'>('global');

    return (
        <div className="w-full h-full flex flex-col">
            <ComingSoonCard />
            {/* <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit shrink-0">
                <Button
                    variant={tabs === 'global' ? 'default' : 'ghost'}
                    onClick={() => setTabs('global')}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                    <Globe className="w-4 h-4" />
                    Global Limits
                </Button>

                <Button
                    variant={tabs === 'users' ? 'default' : 'ghost'}
                    onClick={() => setTabs('users')}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg"
                >
                    <Users className="w-4 h-4" />
                    Users Limits
                </Button>
            </div>

            <div className="flex-1 min-h-0 mt-4">
                {tabs === 'global' ? <GlobalLimits /> : <UsersLimits />}
            </div> */}
        </div>
    );
};

export default Limits;
