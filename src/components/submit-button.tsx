// submit-button.js
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  console.log(useFormStatus())
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating mood..' : 'Create Mood'}
    </Button>
  );
}
