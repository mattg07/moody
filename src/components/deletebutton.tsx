'use client';
import { deleteMood } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
  moodId: string;
};

export default function DeleteButton({ moodId }: DeleteButtonProps) {
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteMood(moodId);
      alert("Mood deleted successfully!");
      setShowDelete(false);
      router.push("/");
    } catch (err) {
      alert("Failed to delete mood: " + (err as Error).message);
    }
  };

  if (showDelete) {
    return (
      <div className="bg-black/90 fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-4">
          <h2>Do you really want to delete this mood?</h2>
          <div className="flex justify-center gap-2 mt-2">
            <button onClick={() => setShowDelete(false)}>No</button>
            <button
              onClick={handleDelete}
              className="text-red-700 px-1 bg-gray-900 rounded-sm border-gray-400"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button onClick={() => setShowDelete(true)}>
      Delete
    </Button>
  );
}
