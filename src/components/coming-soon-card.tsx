const ComingSoonCard = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden p-4 sm:p-0 rounded-xl">
            <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl -top-10 -left-10" />
            <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -bottom-10 -right-10" />
            <div className="absolute w-48 h-48 bg-blue-500/20 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 flex flex-col items-center gap-4 px-12 py-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                </div>

                <h1 className="text-xl sm:text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Coming Soon
                </h1>

                <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xs">
                    The API is ready — UI integration is in progress. Stay tuned!
                </p>
            </div>
        </div>
    );
};

export default ComingSoonCard;
