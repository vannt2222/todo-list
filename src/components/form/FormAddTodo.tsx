import FormItem from "../FormItem";
import layout from "../../styles/layout.module.scss";
import variables from "../../styles/variables.module.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { STATUS, statusTasks } from "../../types/app";
import { FormEvent } from "react";
import TheButton from "../TheButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskTDProps } from "@/pages";

const FormAddTodo = ({
  isShowForm,
  setIsShowForm,
  handleSubmit,
  itemTodo,
  setItemTodo,
  isEditForm,
}: {
  isShowForm: boolean;
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: TaskTDProps) => void;
  itemTodo: TaskTDProps;
  setItemTodo: React.Dispatch<React.SetStateAction<TaskTDProps>>;
  isEditForm: boolean;
}) => {
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTodo((prevTodo) => ({ ...prevTodo, title: e.target.value }));
  };
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTodo((prevTodo) => ({ ...prevTodo, description: e.target.value }));
  };

  const handleChangeProperties = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setItemTodo((prevTodo) => {
      if (!!prevTodo.properties[index]) {
        const arrProperties = [...prevTodo.properties];
        arrProperties.splice(index, 1, { value: e.target.value });

        return {
          ...prevTodo,
          properties: arrProperties,
        };
      }
      return { ...prevTodo };
    });
  };

  const handleAddProperties = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setItemTodo((prevTodo) => ({
      ...prevTodo,
      properties: [...prevTodo.properties, { value: "" }],
    }));
  };
  const handleDelete = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    const newDataTodo = itemTodo.properties.filter((item, i) => i !== index);
    setItemTodo((prevTodo) => ({ ...prevTodo, properties: newDataTodo }));
  };

  const handleCancel = () => {
    setIsShowForm(false);
  };
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemTodo((prevTodo) => ({
      ...prevTodo,
      status: Number(e.target.value),
    }));
  };
  return (
    <form className={layout.form} onSubmit={(e) => handleSubmit(e, itemTodo)}>
      <h1>Create new task</h1>
      <FormItem label="Title">
        <input
          className={layout.form__item__input}
          type="text"
          name=""
          required={true}
          value={itemTodo?.title}
          onChange={handleChangeTitle}
        />
      </FormItem>
      <FormItem label="Description">
        <input
          className={layout.form__item__input}
          name=""
          required={true}
          value={itemTodo.description}
          onChange={handleChangeDescription}
        />
      </FormItem>
      <FormItem label="Properties">
        <FormItem label="">
          <div className={layout.form__item__list}>
            {itemTodo.properties.map((item, index: number) => {
              return (
                <div className={layout.form__item__list__input} key={index}>
                  <input
                    className={layout.form__item__input}
                    name=""
                    required={false}
                    value={item.value}
                    onChange={(e) => handleChangeProperties(e, index)}
                  />
                  <TheButton
                    border="0.5px solid"
                    color={variables.whileColor}
                    height="30px"
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      handleDelete(e, index)
                    }
                    radius="10px"
                    width="50px"
                    textColor={variables.iconColor}
                  >
                    <FontAwesomeIcon
                      icon={solid("trash-can")}
                      className={layout.icon}
                    />
                  </TheButton>
                </div>
              );
            })}
          </div>
          <TheButton
            border="0.5px solid"
            color={variables.whileColor}
            height="30px"
            onClick={handleAddProperties}
            radius="10px"
            width="50px"
            textColor={variables.iconColor}
          >
            <FontAwesomeIcon
              icon={solid("plus")}
              bounce
              className={layout.icon}
            />
          </TheButton>
        </FormItem>
      </FormItem>
      <FormItem label="Status">
        <select
          id="status"
          className={layout.form__item__input}
          onChange={handleChangeStatus}
          value={itemTodo.status}
        >
          <option value={STATUS.NEW}>{statusTasks[STATUS.NEW]}</option>
          <option value={STATUS.INPROGESS}>
            {statusTasks[STATUS.INPROGESS]}
          </option>
          <option value={STATUS.DONE}>{statusTasks[STATUS.DONE]}</option>
          <option value={STATUS.ACCHIVE}>{statusTasks[STATUS.ACCHIVE]}</option>
        </select>
      </FormItem>
      <div className={layout.form__button}>
        <TheButton
          border="none"
          color={variables.cancelColor}
          height="50px"
          onClick={handleCancel}
          radius="10px"
          width="100px"
        >
          Cancel
        </TheButton>
        <TheButton
          border="none"
          color={variables.primaryColor}
          height="50px"
          radius="10px"
          width="100px"
          textColor={variables.textColor}
        >
          {isEditForm ? "Edit" : "Add"}
        </TheButton>
      </div>
    </form>
  );
};
export default FormAddTodo;
