import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import layout from "../../styles/layout.module.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

interface PropsItem {
  children?: React.ReactNode;
  onDragStart: React.DragEventHandler<HTMLDivElement>;
  title: string;
  description: string;
  handleDelete: React.MouseEventHandler<SVGSVGElement>;
  handleItemDetail: React.MouseEventHandler<HTMLDivElement>;
}
const ItemCard: React.FC<PropsItem> = ({
  onDragStart,
  title,
  description,
  handleDelete,
  handleItemDetail,
}) => {
  return (
    <div
      className={layout.item__container}
      draggable
      onDragStart={onDragStart}
      onClick={handleItemDetail}
    >
      <div className={layout.item__container__title}>
        <h3>{title}</h3>
        <FontAwesomeIcon
          icon={solid("xmark")}
          className={layout.icon}
          onClick={handleDelete}
        />
      </div>
      <p className={layout.item__container__description}>{description}</p>
    </div>
  );
};

export default ItemCard;
