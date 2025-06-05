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
    <ul className="my-auto flex flex-col gap-8 lg:flex-row">
      {links.map((link) => (
        <li key={link.to} className="w-full">
          <NavLink to={link.to} className="text-copy/80 hover:text-copy block py-2">
            {({ isActive, isPending }) => (
              <span
                className={`${isPending ? 'animate-pulse' : ''} ${isActive ? 'after:bg-brand text-copy relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full' : ''} `}
              >
                {link.label}
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
