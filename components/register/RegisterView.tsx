"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowForwardOutline } from "react-icons/io5";

import {
  registerAction,
  type RegisterState,
} from "@/actions/login/action-login";

const initialState: RegisterState = {
  success: false,
  message: "",
};

export default function RegisterView() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  const router = useRouter();

  useEffect(() => {
    if (!state.success) return;
    router.replace("/settings");
  }, [state.success, router]);

  const handleFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-100">
      <div className="mb-8 text-center">
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-[#0a0a0a]">
          Crea tu cuenta
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#888888]">
          Crea tu cuenta para comenzar a gestionar y adaptar tu CV.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-[#3a3a3c]"
          >
            Nombre completo
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleFields}
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none placeholder:text-[#a8a8aa] focus:border-[#00b48a]"
          />

          {state.errors?.fullName && (
            <p className="mt-1 text-xs text-[#d45656]">
              {state.errors.fullName[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-[#3a3a3c]"
          >
            Correo electrónico
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleFields}
            placeholder="correo@ejemplo.com"
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none placeholder:text-[#a8a8aa] focus:border-[#00b48a]"
          />

          {state.errors?.email && (
            <p className="mt-1 text-xs text-[#d45656]">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-[#3a3a3c]"
          >
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleFields}
            placeholder="••••••••"
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none placeholder:text-[#a8a8aa] focus:border-[#00b48a]"
          />

          <p className="mt-1 text-xs text-[#a8a8aa]">
            Usa al menos 3 caracteres.
          </p>

          {state.errors?.password && (
            <p className="mt-1 text-xs text-[#d45656]">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-[#3a3a3c]"
          >
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleFields}
            placeholder="••••••••"
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none placeholder:text-[#a8a8aa] focus:border-[#00b48a]"
          />

          {state.errors?.confirmPassword && (
            <p className="mt-1 text-xs text-[#d45656]">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {state.message && (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              state.success
                ? "border-[#c8f2e7] bg-[#f7fffc] text-[#008f70]"
                : "border-[#f2d3d3] bg-[#fff8f8] text-[#d45656]"
            }`}
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group flex w-full items-center justify-center gap-2 rounded-md bg-[#0a0a0a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#222222] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}

          {!pending && (
            <IoArrowForwardOutline
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#888888]">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-[#0a0a0a] hover:text-[#00b48a]"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
