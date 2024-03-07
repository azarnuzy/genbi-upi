import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ValidationSchemaAddNewsForm = z.object({
  title: z
    .string({
      required_error: 'Title should be filled',
    })
    .min(1, 'Title should be filled'),
  type: z
    .string({
      required_error: 'Type should be filled',
    })
    .min(1, 'Type should be filled'),
  department_id: z.number({
    required_error: 'Department should be filled',
  }),
  author_id: z.number({
    required_error: 'Department should be filled',
  }),
  event_id: z
    .number({
      required_error: 'Department should be filled',
    })
    .optional(),
  content: z
    .string({
      required_error: 'Content should be filled with minimum 5 character',
    })
    .min(5, { message: 'Content should be filled with minimum 5 character' })
    .refine((value) => value.trim() !== '<p></p>', {
      message: 'Content should be filled with minimum 5 character',
    }),
  //create a new schema for the hashtag that is array of string and can accept only 3 hashtag
  hashtag: z
    .array(
      z
        .string({
          required_error: 'Hashtag should be filled',
        })
        .min(1, 'Hashtag should be filled')
    )
    .nonempty('Hashtag should be filled'),
  cover: z
    .any()
    .refine(
      (files: File[]) => files !== undefined && files?.length >= 1,
      'Thumbnail should be uploaded.'
    )
    .refine((files: File[]) => {
      // console.log(files);
      return files !== undefined && files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Maximum file size is 3mb.')
    .refine(
      (files: File[]) => ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
      'Accepts only .jpg, .jpeg, .png, and .webp'
    ),
  caption_thumbnail: z
    .string({
      required_error: 'Hashtag should be filled',
    })
    .min(1, 'Hashtag should be filled')
    .optional(),
  other: z
    .any()
    // make sure that the file is uploaded with maximum 5 files

    .refine((files: File[]) => {
      // maximum file size is 3mb
      if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > MAX_FILE_SIZE) {
            return false;
          }
        }
      }
    }, 'Maximum file size is 3mb.')
    .refine((files: File[]) => {
      // accept only ACCEPTED_MEDIA_TYPES
      if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
          if (!ACCEPTED_MEDIA_TYPES.includes(files[i].type)) {
            return false;
          }
        }
      }
    }, 'Accepts only .jpg, .jpeg, .png, and .webp')
    .refine(
      (files: File[]) => files !== undefined && files?.length <= 4,
      'Maximum file is 4.'
    )
    .optional(),
  caption_othersPhoto_1: z.string({}).optional(),
  caption_othersPhoto_2: z.string({}).optional(),
  caption_othersPhoto_3: z.string({}).optional(),
  caption_othersPhoto_4: z.string({}).optional(),
  attachment: z
    .any()
    // make sure that the file is uploaded with maximum 5 files

    .refine((files: File[]) => {
      // maximum file size is 3mb
      if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > MAX_FILE_SIZE) {
            return false;
          }
        }
      }
    }, 'Maximum file size is 3mb.')
    .refine((files: File[]) => {
      // accept only ACCEPTED_MEDIA_TYPES
      if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
          if (!ACCEPTED_MEDIA_TYPES.includes(files[i].type)) {
            return false;
          }
        }
      }
    }, 'Accepts only .jpg, .jpeg, .png, and .webp')
    .refine(
      (files: File[]) => files !== undefined && files?.length <= 4,
      'Maximum file is 4.'
    )
    .optional(),
});
