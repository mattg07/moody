'use client';
import { useRouter } from "next/navigation";

export default function SingInButton() {
    const router = useRouter()
    return (
        <div className="mt-2"> Don&apos;t have an account?{" "}
                        <button onClick={() => {
                            router.push('/register');
                        }}  form="login-form" className="underline">
              Sign up
            </button>   </div>
    )
} 