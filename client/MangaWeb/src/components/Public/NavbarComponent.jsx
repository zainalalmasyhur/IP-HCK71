import { Link } from "react-router-dom";

export default function Navbar() {
  const Logout = () => {
    localStorage.clear();
    useNavigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img
            src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-rasterize-logo-template-bold-brand-png-image_5584123.png"
            style={{ height: 35, width: 35 }}
          />
        </Link>
        <div className="d-flex">
          <Link
            onClick={Logout}
            to={"/"}
            className="btn"
            style={{ color: "#FF76CE" }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
