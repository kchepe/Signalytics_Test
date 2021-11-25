import { Dispatch } from "redux";
import { ContactActionProps } from "../../Action-Types/ContactListActionType";
import { ContactListEnum } from "../../enum/ContactListEnum.ts";
import axios, { AxiosError } from "axios";
import { IContact } from "../../../Model/Contact";

const axiosInstance = axios.create({
  baseURL: "http://139.162.2.185:3031/",
});

export const handleGetContact = () => {
  return async (dispatch: Dispatch<ContactActionProps>) => {
    const res = await axiosInstance.get("/phone-numbers");
    try {
      dispatch({
        type: ContactListEnum.GET_CONTACT,
        payload: { contact: res.data, hasError: false },
      });
    } catch {
      dispatch({
        type: ContactListEnum.ERROR,
        payload: true,
      });
    }
  };
};

export const handleAddContact = (phone: IContact) => {
  return async (dispatch: Dispatch<ContactActionProps>) => {
    const res = await axiosInstance.post("/phone-number", phone);
    console.log(res, "nndnsadns");
    try {
      dispatch({
        type: ContactListEnum.ADD,
        payload: phone,
      });
    } catch (error) {
      const err = error as AxiosError;
      dispatch({
        type: ContactListEnum.ERROR,
        payload: true,
      });
    }
  };
};

export const handleDeleteContact = (id: string | undefined) => {
  return async (dispatch: Dispatch<ContactActionProps>) => {
    await axiosInstance.delete(`/phone-number/${id}`);
    try {
      dispatch({
        type: ContactListEnum.DELETE,
        payload: id,
      });
    } catch {
      dispatch({
        type: ContactListEnum.ERROR,
        payload: true,
      });
    }
  };
};

export const handleUpdateData = (
  index: number,
  phone: IContact,
  id: string
) => {
  return async (dispatch: Dispatch<ContactActionProps>) => {
    await axiosInstance.put(`/phone-number/${id}`, phone);
    try {
      dispatch({
        type: ContactListEnum.UPDATE,
        payload: { index, phone },
      });
    } catch {
      dispatch({
        type: ContactListEnum.ERROR,
        payload: true,
      });
    }
  };
};
