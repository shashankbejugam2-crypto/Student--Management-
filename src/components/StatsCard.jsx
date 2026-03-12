export default function StatsCard({ icon: Icon, label, value, color, delay = 0 }) {
    const colorMap = {
        indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/20',
        green: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
        amber: 'from-amber-500 to-amber-600 shadow-amber-500/20',
        red: 'from-rose-500 to-rose-600 shadow-rose-500/20',
        purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
        cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/20',
    }

    return (
        <div
            className="glass-card rounded-2xl p-5 hover:glow-sm transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center justify-between mb-3">
                <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.indigo
                        } flex items-center justify-center shadow-lg`}
                >
                    <Icon className="text-white" size={22} />
                </div>
            </div>
            <p className="text-2xl font-bold text-white mb-0.5">{value}</p>
            <p className="text-sm text-surface-400">{label}</p>
        </div>
    )
}
