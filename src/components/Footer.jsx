export default function Footer() {
  return (
    <footer className="col-span-full col-start-1 grid grid-cols-6 gap-x-4 text-center">
      <nav id="secondary-nav" className="footer__nav">
        <a href="/yourbank/" className="logo" aria-label="go to homepage">
          <img src="./images/icons/logo.svg" width="48" height="48" alt="" />
        </a>

        <ul>
          <li>
            <a href="/yourbank/">Home</a>
          </li>
          <li>
            <a href="/yourbank/careers/">Careers</a>
          </li>
          <li>
            <a href="/yourbank/about/">About</a>
          </li>
          <li>
            <a href="/yourbank/security/">Security</a>
          </li>
        </ul>
      </nav>

      <div className="line"></div>

      <div className="footer__contact-info">
        <button
          type="button"
          className="btn btn-tertiary align-center gap-4xs flex text-center"
        >
          {/* envelope-icon  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="var(--gray-12)"
          >
            <path d="M1.5 9.169v8.581a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V9.169l-8.928 5.494a3 3 0 0 1-3.145 0L1.5 9.169zm21-1.761V7.25a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 7.408z" />
          </svg>
          yourbank@example.com.my
        </button>
        <button
          type="button"
          className="btn btn-tertiary align-center gap-4xs flex text-center"
        >
          {/* phone-icon  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M1.5 5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.106 4.423c.183.732-.091 1.502-.694 1.955l-1.294.97c-.134.101-.164.248-.126.351 1.136 3.1 3.598 5.562 6.697 6.697.103.038.251.009.351-.126l.97-1.294c.453-.604 1.223-.877 1.955-.694l4.423 1.106c.835.209 1.42.959 1.42 1.819V20a3 3 0 0 1-3 3h-2.25C8.552 23 1.5 15.949 1.5 7.25V5z"
              fill="var(--gray-12)"
            />
          </svg>
          +60&nbsp;(415)&nbsp;555&#8209;0132
        </button>
        <button
          type="button"
          className="btn btn-tertiary align-center gap-4xs flex text-center"
        >
          {/* map-pin-icon  */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.851l.071.041.028.016a.76.76 0 0 0 .722 0l.029-.016.071-.041.255-.153.889-.589a19.58 19.58 0 0 0 2.682-2.282c1.944-1.991 3.964-4.981 3.964-8.827a8.25 8.25 0 1 0-16.5 0c0 3.846 2.019 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282l.889.589.255.153zM12 14a3 3 0 1 0 0-6 3 3 0 1 0 0 6z"
              fill="var(--gray-12)"
            />
          </svg>
          Kuala Lumpur, Malaysia
        </button>
      </div>

      <div className="line"></div>

      <div className="footer__bottom-bar">
        <div className="footer__socials">
          <a href="#" aria-label="facebook">
            {/* facebook-icon  */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_11_89143)">
                <path
                  d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4687H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92187 17.3438 4.92187V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4687H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                  fill="var(--gray-12)"
                />
              </g>
              <defs>
                <clipPath id="clip0_11_89143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="#" aria-label="twitter">
            {/* twitter-icon  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                d="M7.55 21.75c9.054 0 14.008-7.503 14.008-14.008 0-.211-.005-.427-.014-.638A10 10 0 0 0 24 4.555a9.71 9.71 0 0 1-2.826.773 4.95 4.95 0 0 0 2.165-2.723c-.966.573-2.023.977-3.126 1.195a4.93 4.93 0 0 0-5.916-.969A4.93 4.93 0 0 0 11.82 8.29c-1.957-.098-3.872-.607-5.62-1.492S2.91 4.669 1.673 3.149a4.93 4.93 0 0 0 1.523 6.57 4.93 4.93 0 0 1-2.231-.614v.061a4.92 4.92 0 0 0 3.951 4.828c-.724.198-1.484.227-2.221.084.315.978.927 1.833 1.751 2.447s1.819.954 2.847.975c-1.744 1.37-3.898 2.113-6.116 2.109C.783 19.61.39 19.586 0 19.538a13.97 13.97 0 0 0 7.55 2.212z"
                fill="var(--gray-12)"
              />
            </svg>
          </a>
        </div>

        <p className="footer__copyright footer__copyright--first">
          Yourbank All Rights Reserved
        </p>

        <div className="footer__about">
          <p className="footer__copyright footer__copyright--second">
            Yourbank All Rights Reserved
          </p>
          <div className="footer__info">
            <a href="#" className="footer__link">
              Privacy Policy
            </a>
            <a href="#" className="footer__link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
