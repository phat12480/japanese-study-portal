// src/components/Layout.jsx
import { useState } from "react";

const MENU_ITEMS = [
  { id: "vocab", label: "Vocabulary", icon: "📘" },
  { id: "grammar", label: "Grammar", icon: "✍🏻" },
  { id: "quiz", label: "Quiz", icon: "🎯" },
  { id: "auth", label: "Login / Register", icon: "🔐" },
];

export default function Layout({
  currentPage,
  onChangePage,
  user,
  onLogout,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* SIDEBAR */}
      <aside
        className={`flex flex-col bg-slate-900 text-slate-100 border-r border-slate-800 transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}`}
      >
        {/* Logo + toggle */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-slate-800">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold tracking-wide text-sm">
                Japanese Study
              </span>
              <span className="text-xs text-slate-400">Portal v0.2</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 mt-2 space-y-1">
          {MENU_ITEMS.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangePage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors
                  ${
                    active
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="px-3 py-3 border-t border-slate-800 text-[11px] text-slate-500">
          Made by Phát • FPTU
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-semibold text-blue-600">
              Japanese Study Portal
            </h1>
            <p className="text-sm text-slate-500">
              Tự học tiếng Nhật với Vocab, Grammar, Quiz…
            </p>
          </div>

          {/* USER INFO (Google hoặc Register Login) */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right text-xs">
                  <p className="font-medium text-slate-700">{user.name}</p>
                  <p className="text-slate-400">{user.email}</p>
                </div>

                {/* Avatar từ Google hoặc avatar ảo */}
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500
                   flex items-center justify-center text-white text-sm font-semibold overflow-hidden"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>

                <button
                  onClick={onLogout}
                  className="px-3 py-1 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 text-xs"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="text-right text-xs">
                  <p className="font-medium text-slate-700">Guest</p>
                  <p className="text-slate-400">Not logged in</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-white text-sm font-semibold">
                  ?
                </div>
              </>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
