import { NavLink } from 'react-router-dom';

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
          <NavLink
            to={link.to}
            className={({ isActive, isPending }) =>
              isPending
                ? 'animate-pulse'
                : isActive
                  ? 'relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:bg-brand'
                  : 'text-copy/80 transition-colors duration-300 hover:text-copy'
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default NavLinks;
