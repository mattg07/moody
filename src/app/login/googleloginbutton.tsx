"use client";
import { Button } from "@/components/ui/button";
import { oAuthSignIn } from "./action";
import GoogleButton from "react-google-button";

export default function GoogleLoginButton() {
  return (
    <GoogleButton className="max-h-11"
      type="light"
      onClick={() => oAuthSignIn("google")}
    />
  );
}
