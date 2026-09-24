/** Keep in sync with `services/forms/src/index.ts` so the UI rejects the same values the API would. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ZIP_RE = /^\d{5}(?:-\d{4})?$/;
export const MAX = {
  name: 120,
  email: 254,
  phone: 40,
  street: 120,
  address2: 80,
  city: 80,
  state: 2,
  zip: 10,
  message: 5000,
};

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const;

export const US_STATE_CODES = new Set<string>(US_STATES.map((state) => state.value));

export type ContactFieldName =
  | 'name'
  | 'email'
  | 'phone'
  | 'street'
  | 'address2'
  | 'city'
  | 'state'
  | 'zip'
  | 'topic'
  | 'message';
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export const FIELD_ERRORS: Record<ContactFieldName, string> = {
  name: 'Enter Valid Name',
  email: 'Enter Valid Email',
  phone: 'Enter Valid Phone Number',
  street: 'Enter Street Address',
  address2: 'Enter Apt/Suite',
  city: 'Enter City',
  state: 'Select a State',
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

export function isValidZip(zip: string): boolean {
  return ZIP_RE.test(zip);
}

export function isValidState(state: string): boolean {
  return US_STATE_CODES.has(state.toUpperCase());
}

export function validateContactFields(values: {
  name: string;
  email: string;
  phone: string;
  street?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  topic?: string;
  message?: string;
  hasStreetField?: boolean;
  hasAddress2Field?: boolean;
  hasCityField?: boolean;
  hasStateField?: boolean;
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

  if (values.hasStreetField && (!values.street || values.street.length > MAX.street)) {
    errors.street = FIELD_ERRORS.street;
  }

  if (values.hasAddress2Field && values.address2 && values.address2.length > MAX.address2) {
    errors.address2 = FIELD_ERRORS.address2;
  }

  if (values.hasCityField && (!values.city || values.city.length > MAX.city)) {
    errors.city = FIELD_ERRORS.city;
  }

  if (values.hasStateField && !isValidState(values.state || '')) {
    errors.state = FIELD_ERRORS.state;
  }

  if (values.hasZipField && (!values.zip || !isValidZip(values.zip))) {
    errors.zip = FIELD_ERRORS.zip;
  }

  if (values.hasTopicField && !values.topic) errors.topic = FIELD_ERRORS.topic;

  if (values.hasMessageField && values.messageRequired && !values.message) {
    errors.message = FIELD_ERRORS.message;
  } else if (values.message && values.message.length > MAX.message) {
    errors.message = FIELD_ERRORS.message;
  }

  return errors;
}

export interface SubmitError {
  /** Sentence shown in the form status line. */
  message: string;
  /** Append the "call us" fallback — only for problems the visitor cannot fix. */
  offerPhone: boolean;
}

/**
 * Turns a Worker error (or transport failure) into something a visitor can act on.
 * Errors that map to a specific field are handled by `fieldFromApiError` instead.
 * Keep the matched strings in sync with `services/forms/src/index.ts`.
 */
export function submitErrorMessage(apiError: string, httpStatus?: number): SubmitError {
  const text = apiError.toLowerCase();

  if (text.includes('spam check')) {
    return { message: 'Your spam check expired. Please complete it again and resend.', offerPhone: false };
  }

  if (text.includes('origin not allowed') || text.includes('unknown site') || text.includes('missing site')) {
    return { message: 'This form is not set up correctly, so your message was not sent.', offerPhone: true };
  }

  if (httpStatus === 0) {
    return { message: 'We could not reach our server. Check your connection and try again.', offerPhone: true };
  }

  if (httpStatus && httpStatus >= 500) {
    return { message: 'Our server could not save your message. Please try again in a moment.', offerPhone: true };
  }

  return { message: 'Something went wrong and your message was not sent.', offerPhone: true };
}

export function fieldFromApiError(error: string): ContactFieldName | null {
  const text = error.toLowerCase();
  if (text.includes('street')) return 'street';
  if (text.includes('apt') || text.includes('suite')) return 'address2';
  if (text.includes('city')) return 'city';
  if (text.includes('state')) return 'state';
  if (text.includes('zip')) return 'zip';
  if (text.includes('phone')) return 'phone';
  if (text.includes('email')) return 'email';
  if (text.includes('name')) return 'name';
  if (text.includes('message')) return 'message';
  return null;
}
