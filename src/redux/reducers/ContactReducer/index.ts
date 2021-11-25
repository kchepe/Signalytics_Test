import { IContact } from "../../../Model/Contact";
import { InitalStateProps } from "../../../Model/InitalState";
import { ContactActionProps } from "../../Action-Types/ContactListActionType";
import { ContactListEnum } from "../../enum/ContactListEnum.ts";

const initialState: InitalStateProps = {
  contact: [],
  hasError: false,
  message: "",
};

const contactReducer = (
  state: InitalStateProps = initialState,
  action: ContactActionProps
) => {
  const newState: IContact[] = state.contact;
  switch (action.type) {
    case ContactListEnum.GET_CONTACT:
      return action.payload;
    case ContactListEnum.ADD:
      const newContact = [...newState, action.payload];
      return { ...state, contact: newContact };
    case ContactListEnum.DELETE:
      const filteredData = newState.filter((arr) => arr._id !== action.payload);
      return { ...state, contact: filteredData };
    case ContactListEnum.UPDATE:
      const data: any = [...newState];
      data[action.payload.index].phone = action.payload.phone.phone;
      return { ...state, contact: data };
    case ContactListEnum.ERROR:
      return (initialState.hasError = action.payload);
    default:
      return state;
  }
};

export default contactReducer;
