'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { IoFilterSharp, IoSearch } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { useGetDepartmentsTags } from '@/hooks/departments/hook';

import { BreadCrumb } from '@/components/breadcrumbs';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';

import { breadcrumbNewsData } from '@/modules/admin/news/constant';
import {
  dataStatusAdminNewsState,
  parentRefAdminNewsState,
  searchAdminNewsState,
} from '@/recoils/admin/news/atom';

const HeaderNewsSection = () => {
  const { data } = useGetDepartmentsTags();

  const queryClient = useQueryClient();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputSearch, setInputSearch] = useRecoilState(searchAdminNewsState);
  const [, setDataStatus] = useRecoilState(dataStatusAdminNewsState);
  const [parentRef] = useRecoilState(parentRefAdminNewsState);

  const handleFilterChange = async (filter: string) => {
    setDataStatus('data');
    queryClient.invalidateQueries({ queryKey: ['all-post'] });
    let tempFilter = '';

    if (filter.length > 0) {
      tempFilter = `&filter=${filter}`;
    }
    if (parentRef?.current) {
      parentRef?.current.scrollIntoView({ behavior: 'smooth' });
    }
    router.replace(`/admin/news?page=1${tempFilter}`, { scroll: false });
  };

  const handleKeyDownSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setDataStatus('search');
      queryClient.invalidateQueries({ queryKey: ['get-search-post'] });
      if (parentRef?.current) {
        parentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      router.replace(`/admin/news?page=1&search=${inputSearch}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className='flex flex-col  border-b pb-5'>
      <BreadCrumb items={breadcrumbNewsData} textColor='text-primary-main' />
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
        <h3 className='text-primary-900'>News Management</h3>
        <div className='flex gap-4 items-center justify-between'>
          <div className='rounded-full border border-neutral-300 py-2.5 px-6 flex gap-2'>
            <label
              className=' rounded-full  flex items-center justify-center'
              htmlFor='search'
            >
              <IoSearch className='text-neutral-main text-xl' />
            </label>
            <input
              type='text'
              id='search'
              placeholder='Cari Berita dan Tekan Enter...'
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={handleKeyDownSearch}
              className='w-full sm:min-w-[300px] bg-transparent outline-none'
            />
          </div>
          <Popover>
            <PopoverTrigger>
              {' '}
              <div className='border border-primary-main rounded-lg p-[10px] flex items-center'>
                <IoFilterSharp className='text-2xl text-primary-main' />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {' '}
              <div className='flex flex-col gap-2 rounded-[18px] '>
                <p className='text-neutral-800 py-2 px-4 font-medium text-base'>
                  Filter
                </p>
                <RadioGroup
                  onValueChange={(e: string) => {
                    handleFilterChange(e);
                  }}
                  defaultValue='all-data'
                >
                  <ScrollArea className='h-[200px]'>
                    {[
                      '',
                      'Article',
                      'Press Release',
                      'Announcement',
                      ...(data?.data || []),
                    ].map((item, i) => (
                      <div
                        key={i}
                        className=' flex items-center space-y-2 space-x-2 px-4'
                      >
                        <RadioGroupItem
                          checked={
                            searchParams.get('filter') === item ? true : false
                          }
                          value={item}
                          id={item}
                        />
                        <Label
                          className='text-base text-neutral-800'
                          htmlFor={item === '' ? 'Semua' : item}
                        >
                          {item === '' ? 'Semua' : item}
                        </Label>
                      </div>
                    ))}
                  </ScrollArea>
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default HeaderNewsSection;
