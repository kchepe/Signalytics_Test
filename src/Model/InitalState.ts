import { IContact } from "./Contact";

export interface InitalStateProps {
  contact: IContact[];
  hasError: boolean;
  message?: string;
}
