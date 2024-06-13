import { toast } from "react-toastify";

export default function showToast(error) {
  toast.error(error, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    onClick: function () {},
  });
}
