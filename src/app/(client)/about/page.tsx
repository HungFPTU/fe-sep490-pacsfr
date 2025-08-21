import { Container } from "@/shared/components/layout/Container";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                        About PASCS
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Public Administrative Service Consultation System
                    </p>
                    <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-gray max-w-none">
                        <p className="text-lg text-gray-600 mb-6">
                            PASCS is a comprehensive digital platform designed to streamline administrative processes
                            and enhance citizen services at commune and ward administrative offices.
                        </p>

                        <h3 className="text-xl font-medium text-gray-900 mb-4">
                            Key Features
                        </h3>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Smart queue management system</li>
                            <li>• Real-time performance monitoring</li>
                            <li>• Automated reporting and analytics</li>
                            <li>• User-friendly interface design</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}
