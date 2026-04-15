const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />

                <p className="text-primary/80 text-sm">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
