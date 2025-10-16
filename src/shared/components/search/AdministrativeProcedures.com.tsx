import Link from "next/link";

interface Procedure {
    id: string;
    name: string;
    icon: string;
    description?: string;
}

const procedures: Procedure[] = [
  {
    id: "birth-certificate",
    name: "Đăng ký khai sinh",
    icon: "👶",
    description: "Đăng ký khai sinh cho trẻ em"
  },
  {
    id: "marriage-registration",
    name: "Đăng ký kết hôn",
    icon: "💒",
    description: "Đăng ký kết hôn trực tuyến"
  },
  {
    id: "death-certificate",
    name: "Đăng ký khai tử",
    icon: "🕊️",
    description: "Đăng ký khai tử"
  },
  {
    id: "household-registration",
    name: "Đăng ký hộ khẩu",
    icon: "🏠",
    description: "Quản lý hộ khẩu gia đình"
  },
  {
    id: "id-card",
    name: "Cấp thẻ căn cước công dân",
    icon: "🆔",
    description: "Cấp thẻ căn cước công dân"
  },
  {
    id: "passport",
    name: "Cấp hộ chiếu",
    icon: "📘",
    description: "Cấp hộ chiếu phổ thông"
  },
  {
    id: "business-license",
    name: "Đăng ký kinh doanh",
    icon: "💼",
    description: "Đăng ký thành lập doanh nghiệp"
  },
  {
    id: "tax-registration",
    name: "Đăng ký thuế",
    icon: "💰",
    description: "Đăng ký mã số thuế"
  },
  {
    id: "social-insurance",
    name: "Bảo hiểm xã hội",
    icon: "🛡️",
    description: "Đăng ký bảo hiểm xã hội"
  },
  {
    id: "health-insurance",
    name: "Bảo hiểm y tế",
    icon: "🏥",
    description: "Đăng ký bảo hiểm y tế"
  },
  {
    id: "unemployment-benefit",
    name: "Trợ cấp thất nghiệp",
    icon: "💼",
    description: "Đăng ký hưởng trợ cấp thất nghiệp"
  },
  {
    id: "pension",
    name: "Lương hưu",
    icon: "👴",
    description: "Đăng ký hưởng lương hưu"
  },
  {
    id: "disability-benefit",
    name: "Trợ cấp người khuyết tật",
    icon: "♿",
    description: "Đăng ký trợ cấp người khuyết tật"
  },
  {
    id: "child-benefit",
    name: "Trợ cấp trẻ em",
    icon: "👶",
    description: "Đăng ký trợ cấp trẻ em"
  },
  {
    id: "education-support",
    name: "Hỗ trợ giáo dục",
    icon: "📚",
    description: "Đăng ký hỗ trợ học phí"
  },
  {
    id: "housing-support",
    name: "Hỗ trợ nhà ở",
    icon: "🏘️",
    description: "Đăng ký hỗ trợ nhà ở xã hội"
  }
];

export function AdministrativeProcedures() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Dịch vụ công trực tuyến
          </h2>
        </div>

                {/* Grid 4x4 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {procedures.map((procedure) => (
                        <Link
                            key={procedure.id}
                            href={`/search?category=${procedure.id}`}
                            className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                                    <span className="text-2xl">{procedure.icon}</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-800 leading-tight group-hover:text-red-600 transition-colors">
                                    {procedure.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Xem tất cả dịch vụ
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
            </div>
        </section>
    );
}
