import Image from 'next/image';

export function GovernmentFooter() {
  return (
    <>
      <div className="relative min-h-[200px] flex flex-col justify-center overflow-hidden">
        {/* Nền background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/image/background/trong-dong-1.jpg"
            alt="Background"
            fill
            className="object-cover opacity-30 blur-sm"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-0 py-12">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24">
                <Image
                  src="/logo.png"
                  width={96}
                  height={96}
                  alt="Logo Cổng Dịch vụ công quốc gia"
                  priority
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-red-600 mb-6">
              CỔNG DỊCH VỤ CÔNG QUỐC GIA
            </h1>

            {/* Contact Info */}
            <div className="text-gray-800 space-y-2">
              <p className="text-lg">
                <strong>Địa chỉ:</strong> UBND Phường Tăng Nhơn Phú
              </p>
              <p className="text-lg">
                <strong>Email:</strong> dichvucong@chinhphu.vn
              </p>
              <p className="text-lg">
                <strong>Hotline:</strong> 1800 1096
              </p>
            </div>

            {/* Support */}
            <div className="mt-6">
              <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
                Hỗ trợ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-red-600 text-white border-t border-yellow-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Left side */}
            <div className="flex-1">
              <div className="mb-2">
                <p className="text-sm font-medium">
                  Cơ quan chủ quản:  Văn phòng Chính phủ
                </p>
                <p className="text-xs opacity-90 mt-1">
                  Khi sử dụng lại thông tin, đề nghị ghi rõ nguồn &quot;Cổng Dịch vụ công quốc gia&quot;
                </p>
                <p className="text-xs opacity-90 mt-1">
                  Website: https://dichvucong.gov.vn
                </p>
              </div>
            </div>

            {/* Right side - Certification */}
            <div className="flex-shrink-0">
              <div className="text-gray-800 flex items-center space-x-3">
                <div className="flex items-center justify-center overflow-hidden">
                  <Image
                    src="/assets/image/certification/nca.jpg"
                    alt="Chứng nhận Tín Nhiệm Mạng"
                    width={60}
                    height={60}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* <div>
                  <p className="text-xs font-semibold">
                    Đã được chứng nhận Tín Nhiệm Mạng
                  </p>
                  <a
                    href="https://tinnhiemmang.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] mt-1 text-blue-700 underline"
                  >
                    Xem chứng nhận
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
