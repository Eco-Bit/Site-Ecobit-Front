import "./Icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
const Icon = () => {
  return (
    <div className="Icon">
      <FontAwesomeIcon
        icon={faRotate}
        style={{ width: "30px", height: "30px" }}
      />
    </div>
  );
};

export default Icon;
