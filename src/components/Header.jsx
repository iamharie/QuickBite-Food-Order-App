import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="QuickBite Logo" />
        <h1>Quick Bite</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={null}>
          CART (0)
        </Button>
      </nav>
    </header>
  );
}
