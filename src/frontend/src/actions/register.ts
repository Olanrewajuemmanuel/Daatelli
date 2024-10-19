import { serverRoutes } from "../constants";
import { RegisterType } from "../types/enums";
import { RegistrationData } from "../types/types";
import { axiosPublicClient } from "./config";

export function validateForm(
  formData: RegistrationData,
  mode: RegisterType
): Array<{ error: string; label: string }> {
  /**
   * Validates the form data for registering a member.
   *
   * @param {} formData - The partial form data to validate.
   * @returns {Array<{ error: string; label: string }>} An array of error objects containing error messages and corresponding labels.
   */

  const errorsArr: Array<{ error: string; label: string }> = [];
  if (mode === RegisterType.researcher) {
    // Validate researcher type
    if (!formData.researcherType)
      errorsArr.push({
        error: "Researcher type is required",
        label: formData.researcherType,
      });
    // Validate institution
    if (!formData.institution)
      errorsArr.push({
        error: "Institution is required",
        label: formData.researcherType,
      });
  }
  // Validate name
  if (!formData.name)
    errorsArr.push({ error: "Name is required", label: formData.name });
  // Validate email
  if (!formData.email)
    errorsArr.push({ error: "Email is required", label: formData.email });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errorsArr.push({
      error: "Email is not a valid email address",
      label: formData.email,
    });
  // Validate main field
  if (!formData.field)
    errorsArr.push({ error: "Field is required", label: formData.field });
  // Validate password
  if (!formData.password1 || !formData.password2)
    errorsArr.push({
      error: "Password is required",
      label: formData.password1,
    });
  if (formData.password1 && formData.password1.length < 8)
    errorsArr.push({
      error: "Password should be at least 8 characters long",
      label: formData.password1,
    });
  if (formData.password1 !== formData.password2)
    errorsArr.push({
      error: "Passwords do not match",
      label: formData.password1,
    });

  return errorsArr;
}

export async function registerMember(validatedForm: RegistrationData) {
  try {
    const response = await axiosPublicClient.post(
      serverRoutes.users,
      validatedForm
    );
    return await response.data;
  } catch (err) {
    return Promise.reject(
      (err as Error) || Error("An unexpected error occurred")
    );
  }
}
