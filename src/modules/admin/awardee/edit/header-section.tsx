import React from 'react';

import { BreadCrumb } from '@/components/breadcrumbs';
import { WideBaseLayout } from '@/components/layouts/base';

import { breadcrumbEditAwardeeData } from '@/modules/admin/awardee/edit/constant';

const EditAwardeeHeaderSection = ({ id }: { id: string }) => {
  return (
    <WideBaseLayout>
      <div className='flex flex-col  border-b pb-5'>
        <BreadCrumb
          items={breadcrumbEditAwardeeData(id)}
          textColor='text-primary-main'
        />
        <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-4'>
          <h3 className='text-primary-900'>Edit Awardee </h3>
        </div>
      </div>
    </WideBaseLayout>
  );
};

export default EditAwardeeHeaderSection;
