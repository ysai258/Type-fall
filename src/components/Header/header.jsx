import "./header.css";

export default function Header(props) {
  return <h1 className="animated-header">{props.children}</h1>;
}
