'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { fetchCategories, createMood, Category } from "@/actions/actions";
import SubmitButton from "./submit-button";
import { useRouter } from 'next/navigation'

const initialState = {
  message:'',
  error: null,
}

export default function MoodForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter()

  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    }

    loadCategories();
  }, []);

  return (
    <section className="w-3/4 my-2 px-2">
      <form ref={formRef}
        action={async (e) => {
          const formData = new FormData(formRef.current!);
          const moodId = await createMood(formData);
          formRef.current?.reset();
          router.push(`/mood/${moodId}`);
        }}
      >

        <Card className="mx-auto max-w-2/4 bg-gray-200">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl font-bold">
              MOOD
            </CardTitle>
            <CardDescription className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-xl font-semibold">
              What are you feeling like?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid w-2/4 gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Summer outfits and places"
                required
              />
            </div>
            <div className="grid gap-2 w-2/4">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <Textarea
                minLength={18}
                name="description"
                required
                placeholder="Describe your mood"
              />
            </div>
            <div className="grid gap-2 w-1/4">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 w-1/4">
              <Label htmlFor="pictures">Upload pictures</Label>
              <input id="pictures" name="pictures" type="file" multiple />
            </div>
            <SubmitButton />
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
