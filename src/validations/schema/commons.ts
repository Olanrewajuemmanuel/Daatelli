import * as yup from "yup";
import { Findings, SuggestionItem } from "../../types/types";

const MAX_FILES_SIZE = 200 * 1024 * 1024; // 200 MB
const MAX_FILES_COUNT = 5;

const supportedDocTypes = [
  "application/pdf",
  "text/csv",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.presentation",
];

export const createUploadFileSchema = (fullName: string | undefined) => {
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
      )
      .test(
        "supported_docs",
        "Unsupported file format. Should be of type txt, PDF, CSV, Excel, PPT or Word document",
        (files) => {
          if (!files) return false;
          return (
            Array.isArray([...files]) &&
            [...files].every((file) => supportedDocTypes.includes(file.type))
          );
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

export const uploadFileSchema = yup.object().shape({
  // For type definition
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
      "Total size of files must be less than 200GB",
      (files) => {
        if (!files) return false;
        if (!Array.isArray([...files])) return false;

        const totalSize = [...files].reduce((acc, file) => acc + file.size, 0);
        return totalSize <= MAX_FILES_SIZE;
      }
    ),
  privateCopy: yup.boolean(),
  researchers: yup
    .array<SuggestionItem[]>()
    .min(1, "You must add at least your name as an author"),
  doiOrLink: yup.string().url("Link must be a valid URL"),
});

export const uploadFindingsSchema = yup.object().shape({
  abstract: yup
    .string()
    .min(100, "Abstract should be a minimum of 100 characters")
    .max(255, "Abstract should be a maximum of 255 characters"),
  findings: yup
    .array<Findings[]>()
    .required("Finding is required")
    .min(1, "Add at least one Finding"),
  domainOfResearch: yup.string().required("Add your research domain"),
  tags: yup.array<string[]>(),
});

export const urlValidationSchema = yup.string().url("Add a valid URL");

export const attestationSchema = yup.object().shape({
  attestation: yup
    .boolean()
    .isTrue("You need to agree to the above terms to continue")
    .required("You need to agree to the above terms to continue"),
});
