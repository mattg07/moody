// submit-button.js
import { deleteMood } from "@/actions/actions";
import { Button } from "@/components/ui/button";

export default function DeleteButton() {

  return (
    <Button type="submit" onClick={deleteMood(mood.Id)}>
        Delete
    </Button>
  );
}
