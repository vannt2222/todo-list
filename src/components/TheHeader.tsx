import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TheLogo from "./TheLogo";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import TheButton from "./TheButton";
import variables from "../styles/variables.module.scss";
import layout from "../styles/layout.module.scss";
interface Props {
  handleAddTodo: React.MouseEventHandler<HTMLButtonElement>;
}
const TheHeader: React.FC<Props> = ({ handleAddTodo }) => {
  return (
    <div className={layout.header}>
      <TheLogo />
      <div>
        <TheButton
          border="none"
          color={variables.primaryColor}
          height="50px"
          onClick={handleAddTodo}
          radius="10px"
          width="200px"
          textColor={variables.textColor}
        >
          <FontAwesomeIcon
            icon={solid("plus")}
            bounce
            className={layout.icon}
          />
          Add todo
        </TheButton>
      </div>
    </div>
  );
};
export default TheHeader;
