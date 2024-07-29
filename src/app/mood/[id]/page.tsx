import { getImages, getMoodById } from "@/actions/actions";
import Image from "next/image";
import DeleteButton from "@/components/deletebutton";
import EditButton from "@/components/editbutton";
import { createClient } from "@/utils/supabase/server";
import { Literata } from "next/font/google";
const literata = Literata({
  weight: "400",
  subsets: ["latin"],
});
type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string };
};
export default async function MoodPage({ params }: Props) {
  const mood = await getMoodById(params.id);
  if (!mood) {
    return <div>Mood not found</div>;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();


  const pics = await getImages(params.id);
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={`${literata.className} text-3xl`}>{mood.title}</h1>
      {user?.id === mood.user_id && (
  <div className="flex gap-2">
    <DeleteButton moodId={mood.id} />
    
    <EditButton moodId={mood.id} />
  </div>
)}
      <p>{mood.description}</p>
      <p>Category: {mood.categories.name}</p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {" "}
        {pics?.map((pics) => (
          
          <Image key={pics.image_url} className="max-h-[500px]" alt={mood.title} src={pics.image_url}></Image>
        ))}
      </div>
    </div>
  );
}
