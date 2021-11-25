import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { IContact } from "../Model/Contact";
import { InitalStateProps } from "../Model/InitalState";
import { ContactListAction } from "../redux/Action-Creators/ContactAction";
import { State } from "../redux/reducers";

interface CardComponentProps {
  handleTakePhoneData: (index: number, phone: IContact, type: string) => void;
  forceUpdate: number;
}

const CardComponent = (props: CardComponentProps) => {
  const { handleTakePhoneData, forceUpdate } = props;
  const dispatch = useDispatch();
  const { handleGetContact, handleDeleteContact } = bindActionCreators(
    ContactListAction,
    dispatch
  );
  const contacts: InitalStateProps = useSelector(
    (state: State) => state.contact
  );

  useEffect(() => {
    handleGetContact();
  }, [forceUpdate]);

  if (contacts.hasError) return <div>Server Error.</div>;

  return (
    <div className="cardContainer">
      {contacts.contact.map((number, i) => (
        <div className="card" key={i}>
          <div>{number.phone}</div>
          <div>
            <button
              onClick={() => handleTakePhoneData(i, number, "editForm")}
              className="addBtn"
            >
              Edit
            </button>
            <button
              className="addBtn"
              onClick={() => handleDeleteContact(number._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
