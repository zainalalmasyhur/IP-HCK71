export default function Footer(){
    return(
        <footer className="bg-body-tertiary text-center">
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Instagram */}
            <a
              data-mdb-ripple-init=""
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/zainalalmsyhr/?hl=en"
              role="button"
            >
              <i className="fab fa-instagram" />
            </a>
            {/* Linkedin */}
            <a
              data-mdb-ripple-init=""
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/in/zainal-abidin-41908a1b8/"
              role="button"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            {/* Github */}
            <a
              data-mdb-ripple-init=""
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/zainalalmasyhur"
              role="button"
            >
              <i className="fab fa-github" />
            </a>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:
          <a className="text-body" href="">
            Zainalalmsyhr
          </a>
        </div>
        {/* Copyright */}
      </footer>
    )
}