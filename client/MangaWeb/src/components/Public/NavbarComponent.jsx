import { Link } from "react-router-dom";
import Axios from "../../utils/axios";

export default function Navbar() {
  const Logout = () => {
    localStorage.clear();
    useNavigate("/");
  };

  const handleOnUpgrade = async () => {
    const { data } = await Axios.get("/payment/midtrans/initiate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        alert("payment success!");
        await Axios.patch(
          "/users/me/upgrade",
          {
            orderId: data.orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      },
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img
              src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-rasterize-logo-template-bold-brand-png-image_5584123.png"
              style={{ height: 35, width: 35 }}
            />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={"/"}
                onClick={handleOnUpgrade}
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  backgroundColor: "#FF76CE",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease-in-out", // Efek transisi hover
                  fontSize: "14px", // Ukuran font seperti tombol Logout
                }}
                // Efek hover untuk mengubah warna latar belakang saat kursor diarahkan ke tombol
                onMouseEnter={(e) => e.target.style.backgroundColor = "#FF6EB4"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#FF76CE"}
              >
                Support Me
              </Link>
            </li>
          </ul>
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
    </>
  );
}
