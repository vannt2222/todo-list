import layout from "../../styles/layout.module.scss";
interface Props {
  children?: React.ReactNode;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  statusName: string;
}

const ColumnTasks: React.FC<Props> = ({
  onDragOver,
  onDrop,
  children,
  statusName,
}) => {
  return (
    <div className={layout.drop__area} onDragOver={onDragOver} onDrop={onDrop}>
      <h1 className={layout.drop__area__title}>{statusName}</h1>
      {children}
    </div>
  );
};
export default ColumnTasks;
