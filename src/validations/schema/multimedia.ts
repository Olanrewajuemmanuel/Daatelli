import * as yup from "yup";
import { MAX_FILES_COUNT, MAX_FILES_SIZE } from "./commons";
import { SuggestionItem } from "../../types/types";

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
      .test("max_length", "You most upload at most 5 files", (files) => {
        if (!files) return false;
        return Array.isArray([...files]) && files.length <= MAX_FILES_COUNT;
      })
      .test(
        "total_file_size",
        "Total size of files must be less than 200MB",
        (files) => {
          if (!files) return false;
          if (!Array.isArray([...files])) return false;

          const totalSize = [...files].reduce(
            (acc, file) => acc + file.size,
            0
          );
          return totalSize <= MAX_FILES_SIZE;
        }
      ),
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
