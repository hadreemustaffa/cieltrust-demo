import { Link } from 'react-router-dom';

function NavLinks() {
  const links = [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/careers/',
      label: 'Careers',
    },
    {
      to: '/about/',
      label: 'About',
    },
    {
      to: '/security/',
      label: 'Security',
    },
  ];
  return (
    <>
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="text-link hover:text-link-hover">
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

export default NavLinks;
