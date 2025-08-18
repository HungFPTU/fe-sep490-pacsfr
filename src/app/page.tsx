import Link from "next/link";
import Image from "next/image";
import { Container } from "@shared/components/layout/Container";
import { Button } from "@shared/components/ui/Button";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <Container className="py-12 md:py-20">
          <div className="flex flex-col items-center text-center">
            <Image src="/globe.svg" width={60} height={60} alt="Logo" />
            <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-gray-900">
              Cổng Quản Trị Dịch Vụ Công
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
              Hệ thống hỗ trợ trong việc quản lý và xử lý hồ sơ trực tuyến hiệu quả.
            </p>

            {/* Login Button */}
            <div className="mt-8">
              <Link href="/login">
                <Button  className="px-6 py-3 text-base font-medium">
                  Đăng nhập để tiếp tục
                </Button>
              </Link>
            </div>

            <div className="mt-10">
              <Image src="/hero-illustration.svg" alt="Minh họa" width={500} height={300} />
            </div>
          </div>
        </Container>
      </section>

      {/* Features preview */}
      <section>
        <Container className="py-12 md:py-20">
          <h2 className="text-2xl font-semibold text-center text-gray-900">Tính năng chính</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Theo dõi KPI",
                desc: "Giám sát hiệu quả làm việc và tiến độ xử lý hồ sơ.",
                icon: "/window.svg",
              },
              {
                title: "Phân công công việc",
                desc: "Phân bổ và điều phối hồ sơ đến nhân sự phù hợp.",
                icon: "/file.svg",
              },
              {
                title: "Báo cáo tổng hợp",
                desc: "Xem báo cáo thời gian thực để ra quyết định nhanh chóng.",
                icon: "/globe.svg",
              },
            ].map((f, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 p-6 bg-white text-center shadow-sm"
              >
                <Image src={f.icon} alt={f.title} width={40} height={40} className="mx-auto" />
                <h3 className="mt-4 font-medium text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50">
        <Container className="py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Cổng Quản Trị Dịch Vụ Công. Bảo lưu mọi quyền.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="underline">Bảo mật</Link>
              <Link href="/terms" className="underline">Điều khoản</Link>
              <Link href="/status" className="underline">Trạng thái hệ thống</Link>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
