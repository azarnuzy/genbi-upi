import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { toast } from 'sonner';

import { ACCEPTED_MEDIA_TYPES } from '@/lib/validations/news';
import { useDeleteDocument, usePutDocument } from '@/hooks/documents/hook';
import { useDeletePhoto, usePutPhoto } from '@/hooks/photos/hook';

import MiniSpinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { TFileActionProps, TPhotoPayload } from '@/types/photos';

const FilePreview = (props: TFileActionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [getId, setId] = useState<number | null>(null);

  const { mutate, status } = usePutPhoto();
  const { mutate: mutateDelete, status: statusDelete } = useDeletePhoto();
  const { mutate: mutateDocument, status: statusDocument } = usePutDocument();
  const { mutate: mutateDeleteDocument, status: statusDeleteDocument } =
    useDeleteDocument();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    payload: TPhotoPayload
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
    setId(payload.photo_id as number);
    setOpen(true);
  };

  const queryClient = useQueryClient();

  const handleEditPhoto = () => {
    const { payload } = props;

    ACCEPTED_MEDIA_TYPES.includes(props.typeFile as string)
      ? mutate(
          {
            id: getId as number,
            payload: {
              caption: payload?.caption || '',
              category: payload?.category || '',
              featured: false,
              post_id: Number(payload?.post_id),
              file: file as File,
            },
          },
          {
            onSuccess: () => {
              toast.success('Photo updated successfully');
              queryClient.invalidateQueries({
                queryKey: [props.invalidateQueryName as string],
              });
            },
            onError: (error) => {
              toast.error(
                error.response?.data.message || 'Failed to update photo'
              );
            },
          }
        )
      : mutateDocument(
          {
            id: getId as number,
            payload: {
              file: file as File,
              category: payload?.category || '',
              post_id: Number(payload?.post_id),
            },
          },
          {
            onSuccess: () => {
              toast.success('Document updated successfully');
              queryClient.invalidateQueries({
                queryKey: [props.invalidateQueryName as string],
              });
            },
            onError: (error) => {
              toast.error(
                error.response?.data.message || 'Failed to update document'
              );
            },
          }
        );
    setOpen(false);
    setId(null);
    setFile(null);
  };

  const handleDeletePhoto = () => {
    ACCEPTED_MEDIA_TYPES.includes(props.typeFile as string)
      ? mutateDelete(props?.payload?.photo_id as number, {
          onSuccess: () => {
            toast.success('Photo deleted successfully');
            queryClient.invalidateQueries({
              queryKey: [props.invalidateQueryName as string],
            });
          },
          onError: (error) => {
            toast.error(
              error.response?.data.message || 'Failed to delete photo'
            );
          },
        })
      : mutateDeleteDocument(props?.payload?.photo_id as number, {
          onSuccess: () => {
            toast.success('Document deleted successfully');
            queryClient.invalidateQueries({
              queryKey: [props.invalidateQueryName as string],
            });
          },
          onError: (error) => {
            toast.error(
              error.response?.data.message || 'Failed to delete document'
            );
          },
        });
  };

  return (
    <div className='relative w-full max-w-[400px]'>
      <div className='m-2 w-full'>
        {ACCEPTED_MEDIA_TYPES.includes(props.typeFile as string) ? (
          <div className='relative mx-auto w-full h-40 overflow-hidden rounded-lg shadow-md'>
            <Image
              src={props.url || '/images/no-photo-available.png'}
              alt='image'
              width={0}
              height={0}
              sizes='100vw'
              className='object-cover w-full h-full'
            />
          </div>
        ) : (
          <div className='relative mx-auto w-full p-2 overflow-hidden rounded-lg shadow-md '>
            <p className='max-w-[80%] text-ellipsis'> {props.nameFile}</p>
          </div>
        )}

        <div className='max-h-content flex gap-4 items-center absolute top-2 right-2'>
          <Dialog open={open} onOpenChange={setOpen}>
            <label
              htmlFor={`file-${props.payload?.photo_id}`}
              className='cursor-pointer'
            >
              <input
                type='file'
                hidden
                id={`file-${props.payload?.photo_id}`}
                onChange={(e) => {
                  handleFileChange(e, props.payload as TPhotoPayload);
                }}
                // onCha
                className='hidden'
              />
              <div className='p-1 bg-white rounded-full'>
                {status === 'pending' || statusDocument === 'pending' ? (
                  <div className='flex justify-center w-full'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <MdOutlineEdit className='text-warning-main' size={20} />
                )}
              </div>
            </label>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit File</DialogTitle>

                {file && (
                  <div className='w-full h-full max-h-[400px]'>
                    <Image
                      width={0}
                      height={0}
                      sizes='50vw'
                      src={URL.createObjectURL(file)}
                      alt='Preview'
                      className='w-full h-full mt-4 object-contain'
                    />
                  </div>
                )}

                <DialogFooter className='sm:justify-start mt-5'>
                  <div className='flex justify-between items-center w-full'>
                    <DialogClose asChild>
                      <Button type='button' variant='secondary'>
                        Close
                      </Button>
                    </DialogClose>
                    <Button type='button' onClick={handleEditPhoto}>
                      {status === 'pending' || statusDocument === 'pending'
                        ? 'Loading...'
                        : 'Edit'}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {props.isRemove && (
            <button
              onClick={handleDeletePhoto}
              className='p-1 bg-white rounded-full cursor-pointer flex justify-center'
            >
              {statusDelete === 'pending' ||
              statusDeleteDocument === 'pending' ? (
                <div className='flex justify-center w-full'>
                  <MiniSpinner />
                </div>
              ) : (
                <FaRegTrashAlt className='text-error-main' size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
