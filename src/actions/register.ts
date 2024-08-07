import { RegisterMemberData } from "../types/types";

export function validateForm(
  formData: RegisterMemberData
): Array<{ error: string; label: string }> {
  /**
   * Validates the form data for registering a member.
   *
   * @param {} formData - The partial form data to validate.
   * @returns {Array<{ error: string; label: string }>} An array of error objects containing error messages and corresponding labels.
   */

  const errorsArr: Array<{ error: string; label: string }> = [];
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
  if (formData.password1.length < 8)
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

export function registerMember(validatedForm: RegisterMemberData) {
  setTimeout(() => null, 3000); // mimic server fn

  return Promise.resolve({
    id: "2",
    name: validatedForm.name,
    email: validatedForm.email,
  });
}
