import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="QuickBite Logo" />
        <h1>Quick Bite</h1>
      </div>
      <button>Cart</button>
    </div>
  );
}
