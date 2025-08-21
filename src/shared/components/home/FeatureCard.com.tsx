interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
    color?: string;
    stats?: string;
}

const IconComponent = ({ type, className }: { type: string; className?: string }) => {
    const icons = {
        queue: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        analytics: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        assignment: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        report: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        security: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        integration: (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    };

    return icons[type as keyof typeof icons] || icons.queue;
};

export function FeatureCard({ title, description, icon, color = "blue", stats }: FeatureCardProps) {
    const colorClasses = {
        blue: {
            icon: "text-blue-600 bg-blue-100",
            border: "border-blue-200",
            stats: "text-blue-600 bg-blue-50"
        },
        green: {
            icon: "text-green-600 bg-green-100",
            border: "border-green-200",
            stats: "text-green-600 bg-green-50"
        },
        purple: {
            icon: "text-purple-600 bg-purple-100",
            border: "border-purple-200",
            stats: "text-purple-600 bg-purple-50"
        },
        orange: {
            icon: "text-orange-600 bg-orange-100",
            border: "border-orange-200",
            stats: "text-orange-600 bg-orange-50"
        },
        red: {
            icon: "text-red-600 bg-red-100",
            border: "border-red-200",
            stats: "text-red-600 bg-red-50"
        },
        indigo: {
            icon: "text-indigo-600 bg-indigo-100",
            border: "border-indigo-200",
            stats: "text-indigo-600 bg-indigo-50"
        }
    };

    const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <div className={`group relative rounded-2xl border-2 ${colors.border} p-8 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
            {/* Icon */}
            <div className={`inline-flex w-16 h-16 items-center justify-center rounded-xl ${colors.icon} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent type={icon} className="w-8 h-8" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                {title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
                {description}
            </p>

            {/* Stats */}
            {stats && (
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.stats}`}>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {stats}
                </div>
            )}

            {/* Hover effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
}
