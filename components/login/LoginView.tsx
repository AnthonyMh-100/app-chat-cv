"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import { loginAction, type LoginState } from "@/actions/login/action-login";
import { useRouter } from "next/navigation";

const initialState: LoginState = {
  success: false,
  message: "",
};

const LoginView = () => {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!state.success) return;
    router.replace("/assistant");
  }, [state.success]);

  return (
    <div className="w-full max-w-95 text-black">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D4A4]">
          <span className="text-sm font-bold text-black">CV</span>
        </div>

        <h1 className="text-xl font-semibold tracking-[-0.02em] text-[#0A0A0A]">
          Resume Analyzer
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#5A5A5C]">
          Analiza tu CV y compáralo con una vacante para obtener recomendaciones
          con IA.
        </p>
      </div>

      <div className="rounded-2xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="mb-6">
          <p className="text-sm font-medium text-[#00B48A]">Bienvenido</p>

          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#0A0A0A]">
            Inicia sesión
          </h2>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1C1C1E]">
              Correo electrónico
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="h-11 w-full rounded-xl border border-[#E5E5E5] px-4 text-sm outline-none transition focus:border-[#00D4A4] focus:ring-4 focus:ring-[#00D4A4]/10"
            />

            {state.errors?.email && (
              <p className="mt-1 text-xs text-[#D45656]">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-[#1C1C1E]">
                Contraseña
              </label>

              <button
                type="button"
                className="text-xs text-[#00B48A] hover:text-[#009F77]"
              >
                ¿Olvidaste?
              </button>
            </div>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="h-11 w-full rounded-xl border border-[#E5E5E5] px-4 text-sm outline-none transition focus:border-[#00D4A4] focus:ring-4 focus:ring-[#00D4A4]/10"
            />

            {state.errors?.password && (
              <p className="mt-1 text-xs text-[#D45656]">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-[#D45656]">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] text-sm font-medium text-white transition hover:bg-[#1C1C1E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Ingresando..." : "Ingresar"}
            {!pending && <IoArrowForwardOutline size={17} />}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-[#5A5A5C]">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-[#00B48A] hover:text-[#009F77]"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
