export interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export type Environment = {
  appVersion: string;
  production: boolean;
  defaultPhotoUrl: string;
  requireStrongPassword: boolean;
  termsAndConditionsUrl: string;
  cas: string;
  ics: string;
};
