'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { useGetAllPost } from '@/hooks/posts/hook';

import { ArticleCard } from '@/components/card/article';
import BaseLayout from '@/components/layouts/base';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { postsDataState } from '@/recoils/news/atom';

const NewsArticleSection = () => {
  const { data } = useGetAllPost({
    sort: 'created_at',
    type: 'desc',
    limit: 4,
    page: 1,
  });

  const [, setDataPost] = useRecoilState(postsDataState);

  useEffect(() => {
    if (data) {
      setDataPost(data?.data);
    }
  }, [data, setDataPost]);

  return (
    <div className='relative w-full min-h-[40vh] py-10'>
      <Image
        width={0}
        height={0}
        src='/svg/news-bg.svg'
        alt='news-bg'
        className='absolute -top-52 sm:-top-72 w-full h-[400px] z-[1]'
        sizes='100vw'
      />
      <BaseLayout>
        <div className='flex flex-col relative gap-6 z-[2]'>
          <h1 className='text-center'>
            Temukan <span className='text-primary-main'>#KabarGenBI</span>
          </h1>
          <div className='rounded-full border border-neutral-300 py-4 px-6 flex gap-2'>
            <label
              className=' rounded-full  flex items-center justify-center'
              htmlFor='search'
            >
              <IoSearch className='text-neutral-main text-xl' />
            </label>
            <input
              type='text'
              id='search'
              placeholder='Cari Berita...'
              className='w-full bg-transparent outline-none'
            />
          </div>
          <div className='flex overflow-x-auto flex-nowrap items-center gap-4 pb-2   scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded'>
            <Button className='bg-warning-main text-warning-900 rounded-full hover:bg-warning-500 border border-warning-600 '>
              Semua
            </Button>
            <Button className='bg-warning-100 text-warning-900 rounded-full hover:bg-warning-200 border border-warning-500 '>
              Press Release
            </Button>
            <Button className='bg-error-100 text-error-700 rounded-full hover:bg-error-200 border border-error-400 '>
              Semua
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Bank Indonesia
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Bank Indonesia Jabar
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Executive
            </Button>
            <Button
              variant='outline'
              className='text-neutral-main rounded-full'
            >
              Marketing
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-5'>
            {data &&
              data?.data?.map((item, i) => (
                <div className='col-span-2 md:col-span-1' key={i}>
                  <ArticleCard
                    image={item.image_cover.file_url}
                    title={item.title}
                    tags={[item.type]}
                    description={item.content}
                    link={`/berita/${item.id}`}
                  />
                </div>
              ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious href='#' />
              <PaginationLink href='#'>1</PaginationLink>
              <PaginationLink href='#'>2</PaginationLink>
              <PaginationEllipsis />
              <PaginationLink href='#'>10</PaginationLink>
              <PaginationNext href='#' />
            </PaginationContent>
          </Pagination>
        </div>
      </BaseLayout>
    </div>
  );
};

export default NewsArticleSection;
