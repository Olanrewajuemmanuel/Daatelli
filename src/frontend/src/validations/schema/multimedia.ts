import * as yup from "yup";
import { SuggestionItem } from "../../types/types";

const supportedMediaTypes = [
  // Videos
  "video/mp4",
  "video/ogg",
  "video/MPV",
  //   Images
  "image/jpg",
  "image/jpeg",
  "image/apng",
  "image/avif",
  "image/png",
  "image/svg+xml",
  "image/ico",
  "image/bmp",
  "image/heic",
  "image/gif",
  "image/webp",
  //   To be fully supported...
  "audio/ogg",
  "audio/webm",
  "audio/wav",
];
const MAX_FILES_SIZE = 2 * 1024 * 1024 * 1024;

export const createMultiMediaUploadFileSchema = (
  fullName: string | undefined
) => {
  return yup.object().shape({
    files: yup
      .mixed<File[]>()
      .test("required", "You need to provide at least one file", (files) => {
        if (!files?.length) return false;
        return true;
      })
      .test(
        "total_file_size",
        "Total size of files must be less than 2GB",
        (files) => {
          if (!files) return false;
          if (!Array.isArray([...files])) return false;

          const totalSize = [...files].reduce(
            (acc, file) => acc + file.size,
            0
          );
          return totalSize <= MAX_FILES_SIZE;
        }
      )
      .test("supported_docs", "Unsupported file format.", (files) => {
        if (!files) return false;
        return (
          Array.isArray([...files]) &&
          [...files].every((file) => supportedMediaTypes.includes(file.type))
        );
      }),
    privateCopy: yup.boolean(),
    researchers: yup
      .array<SuggestionItem[]>()
      .min(1, "You must add at least your name as an author")
      .test(
        "have_a_name",
        "Fill your full name in your profile to add a finding",
        () => {
          if (!fullName) return false;
          return true;
        }
      )
      .test(
        "name_in_list",
        "Your name must be in the list of authors",
        (researchers) => {
          if (!researchers || researchers.length === 0) return false;
          return researchers.find((researcher) => researcher.name === fullName);
        }
      ),
    doiOrLink: yup.string().url("Link must be a valid URL"),
  });
};
