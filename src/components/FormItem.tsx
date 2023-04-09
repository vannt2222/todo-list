import variables from "../styles/variables.module.scss";
import layout from "../styles/layout.module.scss";
interface Props {
  label: string;
  children?: React.ReactNode;
}
const FormItem: React.FC<Props> = ({ label, children }) => {
  return (
    <div className={layout.form__item}>
      {label && <label className={layout.form__item__label}>{label}</label>}
      {children}
    </div>
  );
};
export default FormItem;
