import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Input } from '../components';
import { CreateBlogInput } from '@dragon_18/medium-common';

const CreateBlog: React.FC = () => {
  const [blogData, setBlogData] = useState<CreateBlogInput>({
    title: '',
    description: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogData({ ...blogData, title: e.target.value });
  };

  const handleDescriptionChange = (content: string) => {
    setBlogData({ ...blogData, description: content });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(blogData);
  };

  return (
    <div className='flex flex-col items-center justify-center py-12 px-6 lg:px-8 bg-gray-50 min-h-screen'>
      <div className='w-full max-w-3xl space-y-8'>
        <h1 className='text-5xl font-extrabold text-center text-gray-800'>
          Create a New Blog
        </h1>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <Input
              type='text'
              name='title'
              placeholder='Enter your blog title'
              label='Blog Title'
              value={blogData.title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label
              htmlFor='description'
              className='text-xl font-semibold text-gray-700'
            >
              Blog Content
            </label>
            <div className='mt-1'>
              <Editor
                apiKey='kehj2o765tk6lern8dn6sd3hirh2qut7l3veskohxk9oo0di'
                initialValue='<p>Write your blog content here...</p>'
                onEditorChange={handleDescriptionChange}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    'anchor',
                    'autolink',
                    'charmap',
                    'codesample',
                    'emoticons',
                    'image',
                    'link',
                    'lists',
                    'media',
                    'searchreplace',
                    'table',
                    'visualblocks',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                }}
              />
            </div>
          </div>
          <div>
            <Button type='submit' text='Publish Blog' className='mt-8' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
