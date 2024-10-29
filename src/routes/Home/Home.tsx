import { products } from "../../data/products";
import { features } from "../../data/features";

// components import
import {
  LinkButtonPrimary,
  LinkButtonSecondary,
} from "../../components/Button";
import Testimonials from "../../components/Testimonials";
import OpenAccountBanner from "../../components/OpenAccountBanner";
import FaqSection from "../../components/FaqSection";
import TabSection, { TabSectionTitle } from "../../components/TabSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <div className="flex flex-col items-center gap-8 lg:items-start">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <p className="flex flex-row items-center gap-2 text-sm lg:gap-4">
              {/* check-badge-icon  */}
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.60288 3.79876C9.42705 2.85093 10.6433 2.25 12 2.25C13.3566 2.25 14.5728 2.85087 15.397 3.79861C16.6501 3.71106 17.9352 4.14616 18.8946 5.10557C19.854 6.06498 20.2891 7.35009 20.2016 8.60319C21.1492 9.42735 21.75 10.6435 21.75 12C21.75 13.3568 21.149 14.5731 20.2011 15.3973C20.2884 16.6502 19.8533 17.935 18.8941 18.8943C17.9348 19.8535 16.65 20.2886 15.3971 20.2013C14.5729 21.1491 13.3567 21.75 12 21.75C10.6434 21.75 9.4272 21.1491 8.60304 20.2014C7.34992 20.289 6.0648 19.8539 5.10537 18.8945C4.14596 17.935 3.71086 16.6499 3.79841 15.3968C2.85079 14.5726 2.25 13.3565 2.25 12C2.25 10.6434 2.85085 9.42723 3.79855 8.60306C3.7111 7.35005 4.14621 6.06507 5.10554 5.10574C6.06488 4.1464 7.34987 3.71129 8.60288 3.79876ZM15.6103 10.1859C15.8511 9.84887 15.773 9.38046 15.4359 9.1397C15.0989 8.89894 14.6305 8.97701 14.3897 9.31407L11.1543 13.8436L9.53033 12.2197C9.23744 11.9268 8.76256 11.9268 8.46967 12.2197C8.17678 12.5126 8.17678 12.9874 8.46967 13.2803L10.7197 15.5303C10.8756 15.6862 11.0921 15.7656 11.3119 15.7474C11.5316 15.7293 11.7322 15.6153 11.8603 15.4359L15.6103 10.1859Z"
                  fill="currentColor"
                />
              </svg>
              No LLC Required, No Credit Check.
            </p>

            <div className="flex max-w-prose flex-col gap-2 lg:items-start lg:gap-4 lg:text-left">
              <h1 className="text-3xl font-medium lg:text-5xl">
                Welcome to <span className="text-brand">Yourbank</span>
                <br />
                Empowering Your Financial Journey
              </h1>
              <p>
                At Yourbank, our mission is to provide comprehensive banking
                solutions that empower individuals and businesses to achieve
                their financial goals. We are committed to delivering
                personalized and innovative services that prioritize our
                customers&apos; needs.
              </p>
            </div>
          </div>

          <LinkButtonPrimary to="/yourbank-main/signup/">
            Open Account
          </LinkButtonPrimary>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <TabSection hasTitle isTablistWithTitle={true} data={products}>
          <div className="flex max-w-[80ch] flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Our <span className="text-brand">Products</span>
            </h2>
            <p>
              Discover a range of comprehensive and customizable banking
              products at Yourbank, designed to suit your unique financial needs
              and aspirations
            </p>
          </div>
        </TabSection>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold text-brand">Use Cases</h2>
          <p>
            At Yourbank, we cater to the diverse needs of individuals and
            businesses alike, offering a wide range of financial solutions
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 lg:grid xl:grid-cols-2">
            <div className="grid grid-cols-auto-fit-sm grid-rows-2 gap-4 rounded-md border border-accent/10 p-4 md:grid-cols-2">
              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                  >
                    <g clipPath="url(#A)" fill="currentColor">
                      <path d="M17.692 6.878c.033.038.038.049.044.049.544.077.797.484 1.089.891a8.19 8.19 0 0 0 1.166 1.27c1.127 1.017 1.82 2.249 2.051 3.75.401 2.628-1.105 5.328-3.58 6.379-3.756 1.595-7.951-.83-8.386-4.888-.231-2.161.561-3.948 2.211-5.356a6.64 6.64 0 0 0 1.347-1.584c.066-.11.187-.198.302-.253.187-.088.396-.137.632-.22l-.193-.225-1.111-1.138c-.132-.132-.193-.269-.187-.456l.006-2.337c0-.313.385-.814.698-.874l1.083-.181c.104-.022.22-.088.281-.17.522-.704 1.441-.709 1.958-.011.071.093.209.165.324.192l1.001.17c.335.066.693.5.693.841l.006 2.364a.62.62 0 0 1-.198.484l-1.237 1.303zm-2.309 3.063c-.016.066-.033.104-.027.137.072.368-.099.528-.44.665-.649.269-.94.814-.924 1.512.017.693.39 1.122 1.017 1.347l.836.264.748.264c.203.082.319.242.297.473s-.171.374-.379.412c-.215.044-.445.082-.649.033-.396-.094-.775-.253-1.193-.396l-.66.874 1.083.467c.203.066.286.154.258.363-.017.148-.005.302-.005.473h.841c.379 0 .396 0 .374-.39-.011-.242.044-.374.308-.407.137-.017.275-.093.401-.165.583-.319.825-.83.814-1.479a1.35 1.35 0 0 0-.869-1.287c-.247-.11-.511-.192-.775-.28l-.99-.33c-.203-.077-.286-.242-.269-.462.017-.209.143-.352.335-.385.231-.038.478-.06.704-.022.275.05.533.176.825.275l.588-.924c-.253-.116-.467-.258-.698-.297-.324-.055-.423-.203-.385-.511.011-.071-.088-.214-.149-.22l-1.017-.005zm.297 19.048c-1.171 0-2.348-.033-3.519.011-.786.027-1.457-.209-2.089-.627-.896-.599-1.716-1.281-2.431-2.095l-3.178-3.613c-.863-.99-.473-2.452.759-2.854.143-.049.308-.066.456-.066l2.942.006a.64.64 0 0 1 .401.165l1.985 1.98c.132.132.253.159.44.132.396-.06.803-.115 1.204-.115l5.554-.005c.632 0 1.1.324 1.265.863.253.814-.341 1.578-1.248 1.584h-3.684c-.22 0-.44-.006-.66 0-.396.011-.654.264-.66.621 0 .363.258.638.649.638h5.856c.396 0 .682-.22.957-.484l3.833-3.673c.522-.5 1.215-.522 1.71-.077.533.484.544 1.265.005 1.809l-1.716 1.677-3.789 3.673a1.48 1.48 0 0 1-1.083.451c-1.32-.006-2.639 0-3.959 0zM9.136 5.751l1.589 1.589-1.006 1.001-1.551-1.6.968-.99zm13.884 0l.973.984-1.595 1.589-.99-1.001 1.611-1.573zm1.265 8.666l.006-1.325c0-.055.104-.154.159-.154h2.007c.055 0 .159.082.159.126l.006 1.353h-2.337zm-16.43.017c-.759 0-1.468.005-2.183-.005-.055 0-.143-.104-.148-.165v-1.155c0-.06.11-.17.17-.17h1.98c.06 0 .17.088.17.143l.011 1.353z" />
                    </g>
                    <defs>
                      <clipPath id="A">
                        <path
                          fill="#fff"
                          transform="translate(4 1)"
                          d="M0 0h22.628v28H0z"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p>Managing Personal Finances</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* savings-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                  >
                    <g clipPath="url(#A)" fill="currentColor">
                      <path d="M24.658 14.019l-.005 2.239c-.01.403.105.758.316 1.092.542.876 1.26 1.609 1.987 2.332l.838.777c.14.123.206.251.206.443l-.005 2.46c.005.684-.296 1.196-.923 1.481-.642.29-1.245.167-1.772-.28l-3.257-2.809-2.223-1.909c-.266-.221-.582-.384-.888-.551a2.8 2.8 0 0 0-1.465-.359c-.381.015-.773.02-1.154-.01-.557-.044-.953-.423-1.029-.945-.07-.457.206-.95.668-1.127a1.55 1.55 0 0 1 .562-.098l4.341-.005c.542 0 .738-.192.738-.728v-3.247a1.26 1.26 0 0 0-.457-1.018l-5.45-4.832c-.487-.433-.542-1.073-.136-1.54s1.059-.512 1.576-.118l6.976 5.304c.386.29.567.645.562 1.112l-.005 2.337zM1.005 22.205L1 20.877c-.005-.172.065-.285.181-.403l2.248-2.312c.156-.162.271-.354.407-.531a2.48 2.48 0 0 0 .507-1.609l-.015-4.231c-.01-.556.191-.95.647-1.294l6.916-5.25c.482-.369 1.144-.31 1.536.133.401.453.366 1.102-.1 1.525l-2.138 1.899L7.8 11.805c-.266.236-.396.521-.396.866v3.444c0 .423.221.63.657.63l4.467.005c.703 0 1.194.482 1.179 1.132a1.05 1.05 0 0 1-.883 1.018c-.301.044-.617.064-.924.034-1.029-.098-1.897.271-2.665.871l-2.263 1.933-3.297 2.839c-.893.763-2.213.428-2.595-.659-.05-.138-.065-.29-.07-.433l-.005-1.279zm14.207-7.168v.699h-1.26v-.566c.005-.138-.035-.197-.181-.231a2.9 2.9 0 0 1-1.164-.551l.652-.851c.381.143.728.31 1.094.394.266.059.562.02.838-.025.211-.034.346-.197.361-.418.02-.226-.1-.384-.301-.463l-1.044-.339-.758-.261a1.34 1.34 0 0 1-.898-1.299c-.015-.659.236-1.191.838-1.476.391-.187.728-.325.532-.871l1.174.01c.04 0 .11.123.11.192.025.418.025.408.422.546.231.079.452.192.703.305l-.572.866c-.03.039-.151.034-.221.015l-.984-.256c-.13-.025-.281.015-.417.049-.201.054-.336.187-.351.403a.42.42 0 0 0 .276.453c.256.103.517.182.778.266l.858.266c.798.305 1.119.787 1.079 1.579-.04.728-.497 1.269-1.25 1.481a3.8 3.8 0 0 1-.316.084z" />
                    </g>
                    <defs>
                      <clipPath id="A">
                        <path
                          fill="#fff"
                          transform="translate(1 5)"
                          d="M0 0h27v20H0z"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p>Saving for the Future</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* building-library-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                  >
                    <path d="M14.48 2.97c.315-.21.725-.21 1.04 0l11.25 7.5a.94.94 0 0 1 .26 1.3.94.94 0 0 1-1.3.26L15 4.877 4.27 12.03a.94.94 0 0 1-1.3-.26.94.94 0 0 1 .26-1.3l11.25-7.5z" />
                    <path
                      fillRule="evenodd"
                      d="M25.313 12.916v12.397h.938a.94.94 0 0 1 .938.938.94.94 0 0 1-.937.938H3.75a.94.94 0 0 1-.937-.937.94.94 0 0 1 .938-.937h.938V12.916a.94.94 0 0 1 .792-.926c3.103-.487 6.282-.739 9.52-.739s6.418.253 9.52.739a.94.94 0 0 1 .792.926zm-9.375 3.022A.94.94 0 0 0 15 15a.94.94 0 0 0-.937.938v8.438a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-8.437zm3.75-.937a.94.94 0 0 1 .938.938v8.438a.94.94 0 0 1-.937.938.94.94 0 0 1-.937-.937v-8.437a.94.94 0 0 1 .938-.937zm-8.437.938a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v8.438a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-8.437z"
                    />
                    <path d="M15 9.844c.777 0 1.406-.63 1.406-1.406S15.777 7.031 15 7.031s-1.406.63-1.406 1.406.63 1.406 1.406 1.406z" />
                  </svg>
                </div>
                <p>Homeownership</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* book-open-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                  >
                    <path d="M14.063 5.666C12.168 4.453 9.916 3.75 7.5 3.75a12.17 12.17 0 0 0-4.062.694.94.94 0 0 0-.625.884V23.14c0 .304.148.59.396.765a.94.94 0 0 0 .854.119c1.074-.38 2.231-.587 3.438-.587a10.27 10.27 0 0 1 6.563 2.357V5.666zm1.875 20.129c1.783-1.473 4.069-2.357 6.563-2.357 1.207 0 2.364.207 3.438.587a.94.94 0 0 0 1.25-.884V5.328a.94.94 0 0 0-.625-.884A12.17 12.17 0 0 0 22.5 3.75c-2.416 0-4.668.703-6.562 1.916v20.129z" />
                  </svg>
                </div>
                <p>Education Funding</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:items-start lg:text-left">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium">For Individuals</h3>
                <p>
                  For individuals, our mortgage services pave the way to
                  homeownership, and our flexible personal loans provide vital
                  support during various life milestones. We also prioritize
                  retirement planning, ensuring a financially secure future for
                  our customers.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">78%</span>Secure
                  Retirement Planning
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">63%</span>Manageable Debt
                  Consolidation
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">91%</span>Reducing
                  financial burdens
                </p>
              </div>

              <LinkButtonSecondary to="#">Learn More</LinkButtonSecondary>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:grid xl:grid-cols-2">
            <div className="grid grid-cols-auto-fit-sm grid-rows-2 gap-4 rounded-md border border-accent/10 p-4 md:grid-cols-2 xl:order-1">
              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* building-office-2-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    fillRule="evenodd"
                  >
                    <path d="M3.75 2.813a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938v20.625h-.937a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938H18.75V4.69a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937h-15zm4.688 21.563v-2.812a.94.94 0 0 1 .938-.937h3.75a.94.94 0 0 1 .938.938v2.813a.94.94 0 0 1-.937.938h-3.75a.94.94 0 0 1-.937-.937zM7.5 8.438a.94.94 0 0 1 .938-.937h.938a.94.94 0 0 1 .938.938.94.94 0 0 1-.937.938H8.44a.94.94 0 0 1-.937-.937zm.938 2.813a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938h.938a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937h-.937zM7.5 15.938A.94.94 0 0 1 8.438 15h.938a.94.94 0 0 1 .938.938.94.94 0 0 1-.937.938H8.44a.94.94 0 0 1-.937-.937zM13.125 7.5a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938h.938A.94.94 0 0 0 15 8.438a.94.94 0 0 0-.937-.937h-.937zm-.937 4.688a.94.94 0 0 1 .938-.937h.938a.94.94 0 0 1 .938.938.94.94 0 0 1-.937.938h-.937a.94.94 0 0 1-.937-.937zM13.125 15a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938h.938a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937h-.937zm7.5-6.562v18.75h6.563a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937h-.937v-15a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937h-5.625zm1.875 5.625a.94.94 0 0 1 .938-.937h.009a.94.94 0 0 1 .938.938v.009a.94.94 0 0 1-.937.938h-.009a.94.94 0 0 1-.937-.937v-.009zm.938 2.813a.94.94 0 0 0-.937.938v.009a.94.94 0 0 0 .938.938h.009a.94.94 0 0 0 .938-.937v-.009a.94.94 0 0 0-.937-.937h-.009zm-.937 4.688a.94.94 0 0 1 .938-.937h.009a.94.94 0 0 1 .938.938v.009a.94.94 0 0 1-.937.938h-.009a.94.94 0 0 1-.937-.937v-.009z" />
                  </svg>
                </div>
                <p>Startups and Entrepreneurs</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* banknotes-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                  >
                    <path d="M15 9.375c-1.553 0-2.812 1.259-2.812 2.813S13.447 15 15 15s2.813-1.259 2.813-2.812S16.553 9.375 15 9.375z" />
                    <path
                      fillRule="evenodd"
                      d="M1.875 6.094c0-1.294 1.049-2.344 2.344-2.344h21.562c1.295 0 2.344 1.049 2.344 2.344v12.188c0 1.294-1.049 2.344-2.344 2.344H4.219c-1.294 0-2.344-1.049-2.344-2.344V6.094zm8.438 6.094A4.69 4.69 0 0 1 15 7.5a4.69 4.69 0 0 1 4.688 4.688A4.69 4.69 0 0 1 15 16.875a4.69 4.69 0 0 1-4.687-4.687zm13.125-.937a.94.94 0 0 0-.937.938v.009a.94.94 0 0 0 .938.938h.009a.94.94 0 0 0 .938-.937v-.009a.94.94 0 0 0-.937-.937h-.009zm-17.812.938a.94.94 0 0 1 .938-.937h.009a.94.94 0 0 1 .938.938v.009a.94.94 0 0 1-.937.938h-.009a.94.94 0 0 1-.937-.937v-.009z"
                    />
                    <path d="M2.813 22.5a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938c6.75 0 13.288.903 19.5 2.594 1.488.405 3-.698 3-2.275v-1.256a.94.94 0 0 0-.937-.937H2.813z" />
                  </svg>
                </div>
                <p>Cash Flow Management</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* presentation-chart-bar-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.813 2.813a.94.94 0 0 0-.937.938.94.94 0 0 0 .938.938h.938v13.125a3.75 3.75 0 0 0 3.75 3.75h1.512l-1.464 4.391a.94.94 0 0 0 .593 1.186.94.94 0 0 0 1.186-.593l.411-1.234h10.524l.411 1.234a.94.94 0 0 0 1.186.593.94.94 0 0 0 .593-1.186l-1.464-4.391H22.5a3.75 3.75 0 0 0 3.75-3.75V4.688h.938a.94.94 0 0 0 .938-.937.94.94 0 0 0-.937-.937H2.813zm7.551 20.625l.625-1.875h8.024l.625 1.875h-9.274zm9.324-15a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v7.5a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-7.5zm-3.75 2.813a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v4.688a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937V11.25zm-3.75 2.813a.94.94 0 0 0-.937-.937.94.94 0 0 0-.937.938v1.875a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-1.875z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p>Business Expansion</p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4">
                <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                  {/* currency-dollar-icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                  >
                    <path d="M13.08 10.933a2.81 2.81 0 0 1 .983-.492v3.494c-.368-.105-.705-.271-.983-.492-.492-.391-.683-.851-.683-1.255s.19-.864.683-1.255zm2.858 8.644v-3.529a3.17 3.17 0 0 1 1.152.526c.533.4.723.857.723 1.239s-.19.839-.723 1.239c-.322.241-.718.42-1.152.526z" />
                    <path
                      fillRule="evenodd"
                      d="M15 2.813A12.19 12.19 0 0 0 2.813 15 12.19 12.19 0 0 0 15 27.188 12.19 12.19 0 0 0 27.188 15 12.19 12.19 0 0 0 15 2.813zm.938 4.688A.94.94 0 0 0 15 6.563a.94.94 0 0 0-.937.938v1.02c-.784.139-1.531.454-2.149.945-.89.707-1.391 1.687-1.391 2.723s.501 2.015 1.391 2.723c.628.499 1.378.809 2.149.945v3.721c-.434-.105-.829-.284-1.151-.526l-1.099-.824a.94.94 0 0 0-1.312.188.94.94 0 0 0 .188 1.313l1.099.824c.667.5 1.461.806 2.276.937V22.5a.94.94 0 0 0 .938.938.94.94 0 0 0 .938-.937v-1.012c.815-.131 1.61-.437 2.277-.937.931-.699 1.473-1.681 1.473-2.739s-.542-2.04-1.473-2.739c-.667-.5-1.462-.806-2.277-.937v-3.696c.361.103.699.267.983.492l.519.412a.94.94 0 0 0 1.317-.151.94.94 0 0 0-.151-1.317l-.519-.412c-.618-.491-1.365-.806-2.149-.945V7.5z"
                    />
                  </svg>
                </div>
                <p>Payment Solutions</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:items-start lg:text-left">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium">For Business</h3>
                <p>
                  For businesses, we empower growth with working capital
                  solutions that optimize cash flow, and our tailored financing
                  options fuel business expansion. Whatever your financial
                  aspirations, Yourbank is committed to providing the right
                  tools and support to achieve them.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">65%</span>Cash Flow
                  Management
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">70%</span>Drive Business
                  Expansion
                </p>

                <div className="h-[1px] w-full bg-accent/10 md:h-full md:w-[1px]"></div>

                <p className="flex flex-col gap-2">
                  <span className="text-3xl font-bold">45%</span>Streamline
                  payroll processing
                </p>
              </div>

              <LinkButtonSecondary to="#">Learn More</LinkButtonSecondary>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <TabSection hasTitle isTablistWithTitle={false} data={features}>
          <TabSectionTitle>
            <h2 className="text-2xl font-semibold">
              Our <span className="text-brand">Features</span>
            </h2>
            <p>
              Experience a host of powerful features at Yourbank, including
              seamless online banking, secure transactions, and personalized
              financial insights, all designed to enhance your banking
              experience
            </p>
          </TabSectionTitle>
        </TabSection>
      </div>

      <div className="flex flex-col items-center gap-8 lg:items-start">
        <div className="flex flex-col gap-4 lg:text-left">
          <h2 className="text-2xl font-semibold">
            <span className="text-brand">Frequently</span> Asked Questions
          </h2>
          <p>
            Still you have any questions? Contact our Team via
            support@yourbank.com
          </p>
        </div>

        <FaqSection />
      </div>

      <Testimonials />

      <OpenAccountBanner />
    </>
  );
}
