'use client';
import { useState, useEffect } from 'react';
import { deleteImage, fetchCategories, getImages, getMoodById, updateMood } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
type Image = {
  id: string;
  image_url: string;
};

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string };
};

export default function EditPage({ params }: Props) {
  const [mood, setMood] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [pics, setPics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const moodData = await getMoodById(params.id);
        const categoriesData = await fetchCategories();
        const picsData = await getImages(params.id);

        if (moodData) {
          setMood(moodData);
        }
        setCategories(categoriesData);
        setPics(picsData || []);
      } catch (err) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMood((prevMood: any) => ({
      ...prevMood,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMood(params.id, mood.title, mood.description, mood.category_id);
      router.push(`/mood/${params.id}`);
    } catch (err) {
      setError('Error updating mood');
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId);
      router.push(`/mood/${params.id}`);

    } catch (err) {
      setError('Error deleting image');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-2xl mt-2'>{error}</p>;
  if (!mood) return <div className='text-2xl mt-2'>Mood not found</div>;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <h1 className="text-white text-2xl mt-2">Edit your Mood</h1>
        <div className="w-full max-w-md">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={mood.title}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={mood.description}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="flex flex-col w-full max-w-md px-2">
          <label htmlFor="category">Categories:</label>
          <select
            id="category"
            name="category_id"
            value={mood.category_id || ''}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Update Mood</button>
      </form>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {pics.map((pic) => (
          <div key={pic.id} className="mt-8">
            <Image className="max-h-[500px]" src={pic.image_url} alt="Mood Image" />
            <Button className="bg-white text-red-700 rounded-md mt-1 w-20" onClick={() => handleDelete(pic.image_url)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
