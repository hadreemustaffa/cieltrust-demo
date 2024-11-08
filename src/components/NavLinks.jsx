import { Link } from "react-router-dom";

function NavLinks() {
  const links = [
    {
      to: "/yourbank/",
      label: "Home",
    },
    {
      to: "/yourbank/careers/",
      label: "Careers",
    },
    {
      to: "/yourbank/about/",
      label: "About",
    },
    {
      to: "/yourbank/security/",
      label: "Security",
    },
  ];
  return (
    <>
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="hover:text-link-hover text-link">
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

export default NavLinks;
