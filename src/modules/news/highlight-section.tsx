import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import BaseLayout from '@/components/layouts/base';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HiglightSection = () => {
  return (
    <div
      className='w-full h-full min-h-[40vh] pt-12 pb-56 relative'
      style={{
        background:
          'radial-gradient(106.84% 43.83% at 8.16% 86.94%, #FFD99F 0%, #F9F9F9 75.08%)',
      }}
    >
      <div
        className='h-[577px] w-[577px] rounded-full absolute top-0 right-0 z-[1]'
        style={{
          background: 'rgba(189, 219, 240, 0.82)',
          filter: 'blur(100px)',
        }}
      ></div>
      <BaseLayout>
        <div className='grid grid-cols-2 gap-6 relative z-[2]'>
          <div
            className='col-span-2 md:col-span-1 rounded-3xl w-full px-6 py-4 flex flex-col justify-between h-[480px] border shadow-sm hover:bg-[#011739D6] transition-all duration-300 ease-in-out relative group'
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #0A1E3C 100%), url('/images/peran-1.webp') center/cover no-repeat, lightgray 50%",
            }}
          >
            <div className='flex flex-col  lg:flex-row items-start lg:items-center lg:justify-between gap-y-2 '>
              <div className='flex gap-2 items-center flex-wrap'>
                <Badge
                  variant='outline'
                  className='bg-warning-100 border border-warning-300 text-warning-600 '
                >
                  Press Release
                </Badge>
                <Badge variant='outline' className='bg-neutral-100'>
                  Education
                </Badge>
              </div>
              <p className='font-semibold text-neutral-100'>4 Desember, 2024</p>
            </div>
            <h2 className='text-balance text-white'>
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <div className='absolute top-0 left-0 w-full h-[480px] hover:bg-[#011739D6] transition-all duration-300 ease-in-out flex justify-center items-center hover:z-[10] hover:opacity-100 rounded-3xl hover:backdrop-blur-sm'>
              <Button
                className='border border-neutral-100 rounded-3xl text-neutral-100 hover:bg-neutral-100 hover:text-balance transition-all duration-300 ease-in-out group-hover:flex gap-1 items-center py-1 text-sm hidden '
                variant='ghost'
                asChild
              >
                <Link href='/'>
                  <p className='text-sm'>Selengkapnya</p>
                  <ArrowRight className='text-sm' />
                </Link>
              </Button>
            </div>
          </div>
          <div className='col-span-2 md:col-span-1 flex flex-col justify-between gap-y-5'>
            {Array(4)
              .fill('_')
              .map((_, i) => (
                <div
                  className='bg-neutral-100 rounded-3xl p-4 flex flex-col gap-2.5 relative group'
                  key={i}
                >
                  <div className='absolute top-0 left-0 w-full h-full hover:bg-[#011739D6] transition-all duration-300 ease-in-out flex justify-center items-center hover:z-[10] opacity-0 hover:opacity-100 rounded-3xl hover:backdrop-blur-sm'>
                    <Button
                      className='border border-neutral-100 rounded-3xl text-neutral-100 hover:bg-neutral-100 hover:text-balance transition-all duration-300 ease-in-out group-hover:flex gap-1 items-center py-1 text-sm hidden '
                      variant='ghost'
                      asChild
                    >
                      <Link href='/'>
                        <p className='text-sm'>Selengkapnya</p>
                        <ArrowRight className='text-sm' />
                      </Link>
                    </Button>
                  </div>
                  <div className='flex justify-between items-center'>
                    <Badge variant='destructive'>Executive</Badge>
                    <p className='text-sm text-neutral-main'>
                      4 December, 2024
                    </p>
                  </div>
                  <h4>Lorem ipsum dolor sit amet.</h4>
                </div>
              ))}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default HiglightSection;
