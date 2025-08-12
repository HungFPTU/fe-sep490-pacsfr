import { Container } from "@shared/components/layout/Container";
import { LoginForm } from "@modules/auth/components/LoginForm";

export default function LoginPage() {
    return (
        <Container className="py-10">
            <h1 className="text-2xl font-semibold mb-6">Login</h1>
            <LoginForm />
        </Container>
    );
} 