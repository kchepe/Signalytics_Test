import { IContact } from "../../../Model/Contact";
import { InitalStateProps } from "../../../Model/InitalState";
import { ContactListEnum } from "../../enum/ContactListEnum.ts";

interface GetContactAction {
  type: ContactListEnum.GET_CONTACT;
  payload: InitalStateProps;
}

interface AddAction {
  type: ContactListEnum.ADD;
  payload: IContact;
}

interface UpdateAction {
  type: ContactListEnum.UPDATE;
  payload: { index: number; phone: IContact };
}

interface DeleteAction {
  type: ContactListEnum.DELETE;
  payload: string | undefined;
}

interface ErrorAction {
  type: ContactListEnum.ERROR;
  payload: boolean;
}

export type ContactActionProps =
  | GetContactAction
  | AddAction
  | DeleteAction
  | UpdateAction
  | ErrorAction;
