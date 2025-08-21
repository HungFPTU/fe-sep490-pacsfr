"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button.ui";

export function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Giả lập login nha xóa cái này nha
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Chưa có API nha chỉ alert demo
    alert(`Tên đăng nhập: ${form.username}\nMật khẩu: ${form.password}`);
  }

  if (!mounted) {
    return (
      <form className="flex flex-col gap-4 w-full max-w-sm animate-pulse">
        <div>
          <label className="block text-sm mb-1">Tên đăng nhập</label>
          <input
            type="text"
            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-gray-50"
            value=""
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Mật khẩu</label>
          <input
            type="password"
            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-gray-50"
            value=""
            readOnly
          />
        </div>
        <Button type="submit" disabled>
          Đăng nhập
        </Button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
      <h1 className="text-xl font-semibold text-center mb-2 text-black">
        Hệ thống Tư vấn Dịch vụ Hành chính Công
      </h1>
      <p className="text-sm text-black text-center mb-6">
        Đăng nhập để sử dụng dịch vụ tại UBND Xã/Phường
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-1 text-black"
          >
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            placeholder="Nhập tên đăng nhập"
            autoComplete="username"
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-black/50"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-black"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-black/50"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm text-black">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" /> Ghi nhớ đăng nhập
          </label>
          <a href="#" className="text-black hover:underline">
            Quên mật khẩu?
          </a>
        </div>

        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
