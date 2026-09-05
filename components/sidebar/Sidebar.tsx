"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MENUS } from "../../constants/menu/menus";
import { useEffect, useState, useTransition } from "react";
import {
  deleteConversationAction,
  getConversationAction,
} from "@/actions/chat/action-chat";
import { logoutAction } from "@/actions/login/action-login";
import clsx from "clsx";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoLogOutOutline,
  IoTrashOutline,
} from "react-icons/io5";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({ collapsed, onToggleCollapse }: SidebarProps) => {
  const [conversation, setConversation] = useState<
    {
      id: string;
      createdAt: string;
    }[]
  >([]);
  const [isLoggingOut, startLogout] = useTransition();
  const pathname = usePathname();
  const { id: paramId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getConversations = async () => {
      const data = await getConversationAction();
      setConversation(data);
    };
    getConversations();
  }, [paramId]);

  const handleDelete = async (conversationId: string) => {
    const result = await deleteConversationAction({
      conversationId,
    });

    if (!result.success) return;

    if (result.nextConversationId) {
      router.replace(`/assistant/${result.nextConversationId}`);
    } else {
      router.replace("/assistant");
    }

    router.refresh();
  };

  const handleLogout = () => {
    startLogout(async () => {
      await logoutAction();
    });
  };

  return (
    <aside
      className={clsx(
        "no-print fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#e5e5e5] bg-white transition-all duration-200",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div
        className={clsx(
          "flex h-16 items-center",
          collapsed ? "justify-center px-2" : "justify-between px-5",
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0a0a0a]">
            <span className="text-xs font-semibold text-white">A</span>
          </div>

          {!collapsed && (
            <span className="text-[15px] font-semibold tracking-[-0.2px] text-[#0a0a0a]">
              Anzalia
            </span>
          )}
        </Link>

        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Colapsar menú"
            className="rounded-md p-2 text-[#888888] transition hover:bg-[#f7f7f7] hover:text-[#0a0a0a]"
          >
            <IoChevronBackOutline size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expandir menú"
            className="rounded-md p-2 text-[#888888] transition hover:bg-[#f7f7f7] hover:text-[#0a0a0a]"
          >
            <IoChevronForwardOutline size={16} />
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {MENUS.map((section) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.5px] text-[#5a5a5c]">
                {section.title}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={clsx(
                        "group flex h-9 items-center gap-3 rounded-md px-3 text-sm transition-colors",
                        collapsed && "justify-center",
                        isActive
                          ? "bg-[#f7f7f7] font-medium text-[#0a0a0a]"
                          : "text-[#5a5a5c] hover:bg-[#fafafa] hover:text-[#0a0a0a]",
                      )}
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className={
                          isActive
                            ? "text-[#0a0a0a]"
                            : "text-[#888888] group-hover:text-[#0a0a0a]"
                        }
                      />

                      {!collapsed && <span>{item.label}</span>}
                    </Link>

                    {item.href === "/assistant" &&
                      !collapsed &&
                      !!conversation?.length && (
                        <div className="ml-5 mt-1 space-y-0.5">
                          {conversation.map(
                            ({ id: conversationId, createdAt }) => (
                              <Link
                                key={conversationId}
                                href={`/assistant/${conversationId}`}
                                className={clsx(
                                  "flex justify-between truncate rounded-md px-2 py-1.5 text-xs text-[#888888] transition-colors hover:bg-[#fafafa] hover:text-[#0a0a0a]",
                                  conversationId === paramId &&
                                    "bg-gray-100 text-black",
                                )}
                              >
                                <p>
                                  Cvs {conversationId.substring(5, 10)} -{" "}
                                  {createdAt}
                                </p>
                                <IoTrashOutline
                                  onClick={() => handleDelete(conversationId)}
                                />
                              </Link>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#e5e5e5] p-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title={collapsed ? "Cerrar sesión" : undefined}
          className={clsx(
            "mb-1 flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm text-[#5a5a5c] transition hover:bg-[#fff5f5] hover:text-[#d45656] disabled:cursor-not-allowed disabled:opacity-50",
            collapsed && "justify-center",
          )}
        >
          <IoLogOutOutline size={17} className="shrink-0" />
          {!collapsed && (
            <span>{isLoggingOut ? "Cerrando..." : "Cerrar sesión"}</span>
          )}
        </button>

        <div
          className={clsx(
            "flex items-center gap-3 rounded-md px-3 py-2",
            collapsed && "justify-center",
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f7f7f7] text-xs font-medium text-[#3a3a3c]">
            A
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#0a0a0a]">
                Usuario
              </p>

              <p className="truncate text-xs text-[#888888]">Plan gratuito</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
