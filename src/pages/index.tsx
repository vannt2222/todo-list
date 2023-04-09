import TheHeader from "@/components/TheHeader";
import ColumnTasks from "@/components/column-card/ColumnTasks";
import ItemCard from "@/components/column-card/ItemCard";
import FormAddTodo from "@/components/form/FormAddTodo";
import { STATUS, statusTasks } from "@/types/app";
import React, { SyntheticEvent, useState } from "react";
import layout from "../styles/layout.module.scss";
import { uniqueId } from "@/utilities/helper";

interface FormEvent<T = Element> extends SyntheticEvent<T> {}
export type TaskTDProps = {
  id: string;
  title: string;
  description: string;
  properties: Array<{ value: string }>;
  status: number;
};

export default function Home() {
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [isEditForm, setIsEditForm] = useState<boolean>(false);
  const [taskTodo, setTaskTodo] = useState<TaskTDProps[]>([]);
  const [itemTodo, setItemTodo] = useState({
    id: uniqueId("id_"),
    title: "",
    description: "",
    properties: [{ value: "" }],
    status: 1,
  });
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, cat: STATUS) => {
    const id = e.dataTransfer.getData("id");

    let tasks = taskTodo.filter((task) => {
      if (task.id == id) {
        task.status = cat;
      }
      return task;
    });
    setTaskTodo(tasks);
  };

  const renderItemTask = (status: STATUS) => {
    return taskTodo.map((item, index) => {
      if (item.status == status) {
        return (
          <ItemCard
            key={index}
            onDragStart={(e) => onDragStart(e, item.id)}
            title={item.title}
            description={item.description}
            handleDelete={(e) => handleDelete(e, index)}
            handleItemDetail={(e) => handleItemDetail(e, index)}
          ></ItemCard>
        );
      }
    });
  };

  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    const newTaskTodo = taskTodo.filter((item, i) => i !== index);
    setTaskTodo(newTaskTodo);
  };
  const handleItemDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setIsShowForm(true);
    setIsEditForm(true);
    const itemDetail = taskTodo.find((item, i) => i === index);
    if (itemDetail) {
      setItemTodo(itemDetail);
    }
  };

  const handleAddTodo = () => {
    setIsShowForm(!isShowForm);
    setItemTodo({
      id: uniqueId("id_"),
      title: "",
      description: "",
      properties: [{ value: "" }],
      status: 1,
    });
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>, data: TaskTDProps) => {
    e.preventDefault();

    data.properties = data.properties.filter((item) => item.value !== "");
    const newTaskItemIndex = taskTodo.findIndex((item) => {
      return item.id === data.id;
    });

    if (newTaskItemIndex === -1) {
      setTaskTodo((prev) => [...prev, data]);
    } else {
      taskTodo.splice(newTaskItemIndex, 1, data);
      setIsEditForm(false);
    }
    setIsShowForm(false);
  };

  return (
    <div>
      <TheHeader handleAddTodo={handleAddTodo} />
      <div className={layout.container}>
        <ColumnTasks
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, STATUS.NEW)}
          statusName={statusTasks[STATUS.NEW]}
        >
          {renderItemTask(STATUS.NEW)}
        </ColumnTasks>

        <ColumnTasks
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, STATUS.INPROGESS)}
          statusName={statusTasks[STATUS.INPROGESS]}
        >
          {renderItemTask(STATUS.INPROGESS)}
        </ColumnTasks>
        <ColumnTasks
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, STATUS.DONE)}
          statusName={statusTasks[STATUS.DONE]}
        >
          {renderItemTask(STATUS.DONE)}
        </ColumnTasks>
        <ColumnTasks
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, STATUS.ACCHIVE)}
          statusName={statusTasks[STATUS.ACCHIVE]}
        >
          {renderItemTask(STATUS.ACCHIVE)}
        </ColumnTasks>
      </div>
      {isShowForm && (
        <>
          <div className={layout.overlay}></div>
          <FormAddTodo
            isShowForm={isShowForm}
            setIsShowForm={setIsShowForm}
            handleSubmit={handleSubmit}
            itemTodo={itemTodo}
            setItemTodo={setItemTodo}
            isEditForm={isEditForm}
          />
        </>
      )}
    </div>
  );
}
