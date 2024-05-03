"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from 'react-dom';
import { FcGoogle } from "react-icons/fc";

export const GoogleLoginButton = () => {
  const { pending } = useFormStatus();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <button
      className="btn-google"
      onClick={() => {
        signIn("google", { callbackUrl: `${callbackUrl} ` });
      }}
      disabled={pending}
    >
      <FcGoogle size={24} className="" />
      {/* Continuar con Google */}
      CONTINUAR CON GOOGLE
    </button>
  );
};