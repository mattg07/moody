"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";
export interface Category {
  id: string;
  name: string;
}
export interface Mood {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  created_at: string;
  category_id: string;
  categories: { name: string }[] | any; 
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select("*");
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data as Category[];
}

export async function createMood(formData: FormData) {
  const supabase = createClient();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User is not logged in");
  }

  const { data: moodData, error: insertError } = await supabase
    .from("moods")
    .insert({
      title: title,
      description: description,
      category_id: category,
      user_id: user.id,
    })
    .select();

  if (insertError) {
    throw new Error("Error creating mood");
  }

  const moodId = moodData[0].id;

  const files = formData.getAll("pictures") as File[];
  for (const file of files) {
    if (file instanceof File) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(fileName, file);

      if (uploadError) {
        throw new Error("Could not upload images");
      }

      const fileUrl = supabase.storage.from("pictures").getPublicUrl(fileName)
        .data.publicUrl;

      const { error: imageInsertError } = await supabase
        .from("mood_images")
        .insert({
          mood_id: moodId,
          image_url: fileUrl,
        });

      if (imageInsertError) {
        throw new Error("Error inserting image URL");
      }
    } else {
      throw new Error("Invalid file in form data");
    }
  }
  revalidatePath("/create");
  return moodId; 
}
export async function getMood(): Promise<Mood[] | null> {
  const supabase = createClient();
  const {data, error} = await supabase.from("moods").select("*");
  if(error){
    console.log(error)
  }
  return data as Mood[];
}

export async function getMoodById(moodId: string): Promise<Mood | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("moods")
    .select(
      `id,
      user_id,
    title,
    description,
    created_at,
    category_id,
    categories(name)
    `
    )
    .eq("id", moodId)
    .single();
  if (error) {
    console.error("Error trying to fetch the mood:", error);
    return null;
  }
  
  return data as Mood;
}

export async function getImages( moodId: string){
  const supabase = createClient();
  const {data, error} = await supabase.from("mood_images").select(`image_url`).eq("mood_id", moodId)
  if (error){
    console.error("Could not retrieve images from the database")
  }
  return data;
}

export async function updateMood(moodId: string, title: string, description: string, category_id : string,) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("moods") 
    .update({
      title: title,
      description: description,
      category_id: category_id
    })
    .eq("id", moodId) 
    .single(); 

  if (error) {
    console.error("Error updating mood:", error);
    throw new Error("Error updating mood");
  }
  revalidatePath(`/mood/${moodId}`)

  return data;
}
export async function deleteMood(moodId: string){
  const supabase = createClient();
  const {data, error} = await supabase.from("moods").delete().eq("id", moodId)
  if(error){
    console.error("Could not delete mood!")
  }
}

export async function deleteImage(imageUrl: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('mood_images')
    .delete()
    .eq('image_url', imageUrl);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/edit/")
}