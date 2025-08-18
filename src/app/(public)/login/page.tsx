import { LoginForm } from "@modules/auth/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                 <h1 className="text-2xl font-semibold text-black">Đăng nhập hệ thống</h1>
                 <p className="text-sm text-gray-500 mt-1">Truy cập bảng điều khiển quản trị và nghiệp vụ</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}