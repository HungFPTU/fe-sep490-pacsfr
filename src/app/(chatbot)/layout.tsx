

export default function FullPageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // Layout này không chứa Navbar hay bất cứ thứ gì khác.
    // Nó chỉ hiển thị nội dung của trang con (chính là trang chatbot).
    return <>{children}</>;
  }