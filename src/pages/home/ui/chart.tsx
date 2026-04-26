// ui/charts.tsx
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLimitsQuery } from '@/features/limits';
import { useProductsQuery } from '@/features/products';
import { useUsersQuery } from '@/features/users';
import { useCardsQuery } from '@/features/cards';
import Loader from '@/widgets/loader';

const tooltipStyle = {
    backgroundColor: '#0f0f1a',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#e2e8f0',
    fontSize: '13px',
    padding: '8px 12px',
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={tooltipStyle}>
                <p
                    style={{
                        color: payload[0].payload.fill || payload[0].fill,
                        fontWeight: 600,
                        margin: 0,
                    }}
                >
                    {payload[0].name}
                </p>
                <p style={{ color: '#e2e8f0', margin: '2px 0 0' }}>
                    Count: <span style={{ fontWeight: 700 }}>{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export function DashboardCharts() {
    const { data: productsData, isLoading: productsLoading } = useProductsQuery(undefined);
    const { data: limitsData, isLoading: limitsLoading } = useLimitsQuery(undefined);
    const { data: usersData, isLoading: usersLoading } = useUsersQuery(undefined);
    const { data: cardsData, isLoading: cardsLoading } = useCardsQuery(undefined);

    const isLoading = productsLoading || limitsLoading || usersLoading || cardsLoading;

    if (isLoading) return <Loader />;

    const chartData = [
        { name: 'Products', value: productsData?.total ?? 0, fill: '#60a5fa' },
        { name: 'Limits', value: limitsData?.total ?? 0, fill: '#facc15' },
        { name: 'Users', value: usersData?.total ?? 0, fill: '#4ade80' },
        { name: 'Cards', value: cardsData?.total ?? 0, fill: '#a78bfa' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="rounded-2xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-xl shadow-lg py-6">
                <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">
                        Overall Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {chartData.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                formatter={(value) => (
                                    <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border border-purple-500/20 bg-purple-500/10 backdrop-blur-xl shadow-lg py-6">
                <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">By Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={chartData} barSize={36}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Bar
                                background={() => null}
                                dataKey="value"
                                radius={[6, 6, 0, 0]}
                                name="Count"
                            >
                                {chartData.map((entry, i) => (
                                    <Cell key={i} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
