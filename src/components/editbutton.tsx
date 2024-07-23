'use client';
import { deleteMood } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from 'next/navigation'
type Props = {
  moodId: string;
}

  export default function EditButton({moodId}: Props) {
    const router = useRouter();


    

  return (
    <Button 
    onClick={() => router.push(`/edit/${moodId}`)}
    type="submit">
        Edit
    </Button>
  );
}
