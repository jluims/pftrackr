import classes from "../css/navbar.module.css";
function Navbar() {
  return (
    <nav className={classes.navbar}>
      <a href="/" className={classes.title}>PFtrackr</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </nav>
  );
}

export { Navbar };
