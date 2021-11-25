import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { IContact } from "../Model/Contact";
import { ContactListAction } from "../redux/Action-Creators/ContactAction";
import CardComponent from "./CardComponent";

const ContactFormComponent = () => {
  const [phoneIndex, setPhoneIndex] = useState<number>(0);
  const [phoneToEdit, setPhoneToEdit] = useState<IContact | any>();
  const [formType, setFormType] = useState<string>();
  const [forceUpdate, setForceUpdate] = useState(0);
  const dispatch = useDispatch();
  const { handleAddContact, handleUpdateData } = bindActionCreators(
    ContactListAction,
    dispatch
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const hanldeAddPhoneNumber = async (data: IContact) => {
    const { phone } = data;
    if (formType === "editForm") {
      await handleUpdateData(phoneIndex, { phone }, phoneToEdit?._id);
      setFormType("");
    } else {
      await handleAddContact({ phone });
      setForceUpdate((prevState) => prevState + 1);
    }
    reset();
  };

  const handleCancel = () => {
    setFormType("");
    reset();
  };

  const handleTakePhoneData = (
    index: number,
    phone: IContact,
    type: string
  ) => {
    setPhoneToEdit(phone);
    setPhoneIndex(index);
    setFormType(type);
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit(hanldeAddPhoneNumber)}>
          <input
            type="text"
            defaultValue={formType === "editForm" ? phoneToEdit?.phone : ""}
            className="textField"
            placeholder="Enter Phone number"
            {...register("phone", { required: true })}
          />
          <button className="addBtn" type="submit">
            {formType === "editForm" ? "Update" : "Add"}
          </button>
          {formType === "editForm" && (
            <button className="addBtn" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <div className="requiredMessage">
            {errors.phone && "Phone is required"}
          </div>
        </form>
      </div>
      <div>
        <CardComponent
          handleTakePhoneData={handleTakePhoneData}
          forceUpdate={forceUpdate}
        />
      </div>
    </div>
  );
};

export default ContactFormComponent;
