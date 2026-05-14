import { Shield, Mail, User, Key } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Loader from '@/widgets/loader';
import { useProfileQuery } from '@/features/auth';

const Profile = () => {
    const { data, isLoading } = useProfileQuery(undefined);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-6 p-2">
            <div className="rounded-2xl border bg-card p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
                    {data?.name?.slice(0, 1)?.toUpperCase()}
                </div>
                <div>
                    <h1 className="text-xl font-bold">{data?.name}</h1>
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-sm">{data?.email}</span>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold">Roles</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    {data?.roles?.length ? (
                        data.roles.map((role: string) => (
                            <Badge key={role} variant="secondary" className="px-3 py-1 text-sm">
                                {role}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No roles assigned</p>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Key className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold">Permissions</h2>
                    <Badge variant="outline" className="ml-auto">
                        {data?.permissions?.length ?? 0} total
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                    {data?.permissions?.length ? (
                        data.permissions.map((permission: string) => (
                            <div
                                key={permission}
                                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted text-sm"
                            >
                                <Shield className="w-3 h-3 text-muted-foreground shrink-0" />
                                <span>{permission}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No permissions assigned</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
