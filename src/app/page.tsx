"use client";
import { getMood, getImages, Mood } from "@/actions/actions";
import Hero from "../components/ui/Hero";
import { useEffect, useState } from "react";
import Link from "next/link";

type MoodWithImages = Mood & { images: string[] };

export default function Home() {
  const [moods, setMoods] = useState<MoodWithImages[]>([]);

  useEffect(() => {
    const fetchMoodsAndImages = async () => {
      const moodData = await getMood();
      if (moodData) {
        const moodsWithImages = await Promise.all(
          moodData.map(async (mood: Mood) => {
            const images = await getImages(mood.id);
            return {
              ...mood,
              images: images ? images.map((img) => img.image_url) : [],
            };
          })
        );
        setMoods(moodsWithImages);
      }
    };

    fetchMoodsAndImages();
  }, []);

  return (
    <div>
      <Hero />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-xl font-bold text-gray-200 pb-5">
          Featured Moods
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moods.map((mood) => (
            <Link key={mood.id} href={`/mood/${mood.id}`}>
              <div
                key={mood.id}
                className="border rounded-md flex flex-col items-center overflow-hidden bg-slate-200 h-72 border-gray-400 p-4 text-center"
              >
                <h1 className="text-xl font-bold mb-2">{mood.title}</h1>
                <p className="mb-2">{mood.description}</p>
                {mood.images.length > 0 && (
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={mood.images[0]}
                    alt={mood.title}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
