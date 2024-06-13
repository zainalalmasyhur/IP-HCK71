import { Link } from "react-router-dom";
export default function CancelButton() {
  return (
    <div className="col-6">
      <Link className="btn btn-lg btn-light rounded-pill w-100 p-2" to={"/"}>
        Cancel
      </Link>
    </div>
  );
}
