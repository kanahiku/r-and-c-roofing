/** Keep in sync with `services/forms/src/index.ts` so the UI rejects the same values the API would. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX = { name: 120, email: 254, phone: 40, message: 5000 };

export type ContactFieldName = 'name' | 'email' | 'phone' | 'zip' | 'topic' | 'message';
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export const FIELD_ERRORS: Record<ContactFieldName, string> = {
  name: 'Enter Valid Name',
  email: 'Enter Valid Email',
  phone: 'Enter Valid Phone Number',
  zip: 'Enter Valid ZIP Code',
  topic: 'Select a Topic',
  message: 'Enter Valid Message',
};

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= MAX.email;
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return true;
  return digits.length >= 10 && digits.length <= 15;
}

export function validateContactFields(values: {
  name: string;
  email: string;
  phone: string;
  zip?: string;
  topic?: string;
  message?: string;
  hasZipField?: boolean;
  hasTopicField?: boolean;
  hasMessageField?: boolean;
  messageRequired?: boolean;
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!values.name || values.name.length > MAX.name) errors.name = FIELD_ERRORS.name;

  if (!isValidEmail(values.email)) errors.email = FIELD_ERRORS.email;

  if (!values.phone || !isValidPhone(values.phone) || values.phone.length > MAX.phone) {
    errors.phone = FIELD_ERRORS.phone;
  }

  if (values.hasZipField && !values.zip) errors.zip = FIELD_ERRORS.zip;

  if (values.hasTopicField && !values.topic) errors.topic = FIELD_ERRORS.topic;

  if (values.hasMessageField && values.messageRequired && !values.message) {
    errors.message = FIELD_ERRORS.message;
  } else if (values.message && values.message.length > MAX.message) {
    errors.message = FIELD_ERRORS.message;
  }

  return errors;
}

export function fieldFromApiError(error: string): ContactFieldName | null {
  const text = error.toLowerCase();
  if (text.includes('phone')) return 'phone';
  if (text.includes('email')) return 'email';
  if (text.includes('name')) return 'name';
  if (text.includes('message')) return 'message';
  return null;
}
