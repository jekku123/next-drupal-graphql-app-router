import { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGSVGElement>;

export const Icons = {
  accountIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78A7.893 7.893 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72Zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83ZM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6Zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),

  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),

  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),

  drupalIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Layer_2"
      x="0px"
      y="0px"
      viewBox="0 0 2160 2880"
      style={{ background: "new 0 0 2160 2880" }}
      xmlSpace="preserve"
      {...props}
    >
      <style type="text/css">{`.st0{fill:#767283;}`}</style>
      <g id="Livello_2_1_">
        <g id="Livello_1-2_1_">
          <path
            className="st0"
            d="M1186,1080.5c-36-36-74.2-74.6-108.1-113.1c-31.7,36-65.2,68.8-98.7,102.3c-8.1,8-14.7,17.4-19.5,27.7    c-7.4,16.2-9.8,34.3-6.8,51.9c0,1.8,0,3.6,0,5.4c3.1,9.7,7.7,18.8,13.7,27c1,1.4,1.8,2.8,2.5,4.3c22,27.4,74.2,77.8,103.4,105.9    l173,180.2l51.9,54.8c42.8,44.4,81.4,92.6,115.3,144.1l0,0c4.1,7.1,10.6,12.3,18.4,14.8h3.6c8.4-1.4,15.3-7.4,18-15.5l0,0    c11.2-36.2,16.9-73.8,16.9-111.7c-1-87.7-28.8-172.9-79.6-244.3c-59.9-83.7-127.9-161.2-203.2-231.3L1186,1080.5z"
          />
          <path
            className="st0"
            d="M1234.3,1660.7c-42.9-52.3-84.3-100.2-149.5-169.7c-55.1,63.1-105.6,111.7-147.4,161.1    c-73.6,79.7-68.7,203.9,11,277.5c79.7,73.6,203.9,68.7,277.5-11c62.5-67.6,69.6-169.6,17.1-245.3    C1240.4,1668.8,1237.5,1664.6,1234.3,1660.7z"
          />
          <path
            className="st0"
            d="M979.9,1405.5c4.8-5.5,4.8-13.6,0-19.1l-127.2-130.1l-27.4-25.9c-22,25.6-42.6,52.4-61.6,80.4    c-30.8,44.4-53.7,93.8-67.7,145.9l0,0c-15.3,60-13.9,123.1,4.3,182.3l2.5,5.4c3.2,6.4,6.8,12.5,10.8,18.4l0,0    c0,0,14.8,23.8,27.7,24.9h4.7c4.4-1,8-4.1,9.7-8.3c12-25.2,27-48.7,44.7-70.3l46.5-56.6l0,0L979.9,1405.5z"
          />
          <path
            className="st0"
            d="M1082.6,363.4C487.3,363.2,4.6,845.6,4.4,1440.8s482.2,1078,1077.4,1078.2    c595.3,0.2,1078-482.2,1078.2-1077.4c0-0.1,0-0.2,0-0.4C2160,846.1,1677.7,363.6,1082.6,363.4z M1076.4,2124.8    c-313.2-0.8-566.8-254.7-567.2-567.9c0-266.3,177.7-443.6,334-600.3c104.5-104.5,204.3-204,233.9-316    c29.5,112.1,129.4,211.5,233.9,316c156.8,156.8,334,334,334,600.3C1644.7,1870.6,1390.2,2124.8,1076.4,2124.8z"
          />
        </g>
      </g>
    </svg>
  ),

  nextJsIcon: (props: IconProps) => (
    <svg role="img" viewBox="0 0 394 79" {...props}>
      <path
        d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"
        fill="#767283"
      ></path>
      <path
        d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"
        fill="#767283"
      ></path>
      <path
        d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"
        fill="#767283"
      ></path>
      <path
        d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"
        fill="#767283"
      ></path>
      <path
        clipRule="evenodd"
        d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
        fill="#767283"
        fillRule="evenodd"
      ></path>
      <path
        d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z"
        fill="#767283"
      ></path>
      <path
        d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z"
        fill="#767283"
      ></path>
      <path
        d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z"
        fill="#767283"
      ></path>
    </svg>
  ),

  tailwindCssIcon: (props: IconProps) => (
    <svg
      viewBox="0 0 248 31"
      className="w-auto h-5 text-slate-900 dark:text-white"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
        fill="#767283"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
        fill="#767283"
      ></path>
    </svg>
  ),

  reactIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348"
      {...props}
    >
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#767283" />
      <g stroke="#767283" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),

  facebook: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z"
      />
    </svg>
  ),

  twitter: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.292 20.25c7.545 0 11.673-6.252 11.673-11.673 0-.176-.004-.355-.012-.531A8.332 8.332 0 0 0 22 5.922a8.09 8.09 0 0 1-2.355.644 4.125 4.125 0 0 0 1.804-2.269 8.247 8.247 0 0 1-2.605.996 4.108 4.108 0 0 0-6.994 3.741A11.654 11.654 0 0 1 3.394 4.75a4.108 4.108 0 0 0 1.27 5.476 4.109 4.109 0 0 1-1.86-.512v.05a4.102 4.102 0 0 0 3.293 4.024 4.078 4.078 0 0 1-1.851.07 4.111 4.111 0 0 0 3.83 2.852 8.23 8.23 0 0 1-6.076 1.698 11.64 11.64 0 0 0 6.292 1.843Z"
      />
    </svg>
  ),

  linkedIn: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20.52 2H3.477C2.66 2 2 2.645 2 3.441v17.114C2 21.352 2.66 22 3.477 22H20.52c.816 0 1.48-.648 1.48-1.441V3.44C22 2.645 21.336 2 20.52 2ZM7.934 19.043h-2.97V9.496h2.97v9.547ZM6.449 8.195a1.72 1.72 0 1 1-.006-3.439 1.72 1.72 0 0 1 .006 3.44Zm12.594 10.848h-2.965v-4.64c0-1.106-.02-2.532-1.543-2.532-1.543 0-1.777 1.207-1.777 2.453v4.719H9.797V9.496h2.844v1.305h.039c.394-.75 1.363-1.543 2.804-1.543 3.004 0 3.559 1.976 3.559 4.547v5.238Z"
      />
    </svg>
  ),

  arrowIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),

  wunderCarrot: (props: IconProps) => (
    <svg viewBox="-30 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M59.903 16.3c.066.774.097 1.547.097 2.323 0 6.611-2.41 13.038-7.274 17.904-4.866 4.861-11.29 7.27-17.9 7.273-.772.001-1.55-.031-2.33-.098a27.042 27.042 0 01-.096-2.326c0-6.611 2.413-13.035 7.276-17.9 4.864-4.866 11.293-7.275 17.907-7.276.768 0 1.546.033 2.32.1zm-58.004 0c.781-.066 1.563-.1 2.342-.1 4.82.004 9.548 1.283 13.647 3.85a31.018 31.018 0 00-.366 4.699c0 6.952 2.372 13.578 6.478 19.051-5.518-.65-10.752-3.015-14.876-7.132-4.896-4.9-7.318-11.371-7.324-18.03 0-.777.034-1.557.1-2.338zm20.124 3.638C23.546 11.292 28.926 4.23 36.28 0c3.961 4.701 6.43 10.45 6.92 16.544a26.926 26.926 0 00-6.923 5.02c-5.364 5.369-8.02 12.486-8.02 19.717 0 .638.023 1.277.066 1.919-4.258-5.212-6.723-11.65-6.723-18.405 0-1.606.137-3.228.423-4.857zm28.014 35.198C56.141 60.64 60 68.593 60 77.472a30.003 30.003 0 01-8.581 21.045L29.995 120 8.575 98.517c-.902-.922-1.716-1.92-2.497-2.952C2.278 90.528 0 84.272 0 77.472 0 60.862 13.426 47.4 30 47.4c7.713 0 14.725 2.943 20.037 7.736z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  ),

  pdfIcon: (props: IconProps) => (
    <svg
      viewBox="0 0 50 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.992018 47.0302C-1.73495 44.3033 1.21445 40.5576 9.22186 36.5806L14.2576 34.076L16.2194 29.7832C17.3005 27.421 18.9108 23.5685 19.8005 21.2197L21.4198 16.9491L20.3032 13.7906C18.9331 9.90698 18.4437 4.06601 19.3156 1.97074C20.4945 -0.871891 24.3514 -0.582734 25.8773 2.46898C27.0695 4.84896 26.9494 9.15962 25.5347 14.5958L24.3737 19.0532L25.3968 20.7882C25.9574 21.7402 27.5989 24.0045 29.0402 25.8195L31.7538 29.1915L35.1303 28.7511C45.8513 27.3498 49.5258 29.7298 49.5258 33.1418C49.5258 37.4436 41.1047 37.7995 34.0359 32.8349C32.4434 31.7183 31.3535 30.6061 31.3535 30.6061C31.3535 30.6061 26.9227 31.5092 24.7429 32.0964C22.4919 32.7014 21.3709 33.084 18.0701 34.1961C18.0701 34.1961 16.9134 35.8777 16.1572 37.0966C13.3501 41.643 10.076 45.4065 7.74049 46.7767C5.12028 48.3114 2.37552 48.4137 0.992018 47.0347V47.0302ZM5.27154 45.4999C6.80629 44.5524 9.90694 40.8823 12.0556 37.4792L12.9231 36.1001L8.96384 38.0886C2.84707 41.167 0.0533707 44.0675 1.50805 45.8158C2.32659 46.7989 3.30082 46.7188 5.27154 45.4999ZM44.9839 34.3518C46.483 33.302 46.265 31.1845 44.5701 30.3348C43.2534 29.6719 42.1902 29.534 38.7603 29.583C36.6562 29.7253 33.2708 30.1524 32.6969 30.2814C32.6969 30.2814 34.5564 31.567 35.3839 32.0386C36.4827 32.6658 39.1562 33.8314 41.1047 34.4275C43.0265 35.0147 44.1431 34.9524 44.9839 34.3518ZM29.0135 27.7146C28.106 26.7626 26.5624 24.7696 25.5837 23.2927C24.3025 21.6156 23.6619 20.4323 23.6619 20.4323C23.6619 20.4323 22.7277 23.4395 21.9581 25.2501L19.5648 31.1667L18.8708 32.5101C18.8708 32.5101 22.5587 31.3001 24.4359 30.8108C26.4245 30.2903 30.4593 29.4985 30.4593 29.4985L29.0091 27.719L29.0135 27.7146ZM23.8665 7.07769C24.0979 5.13367 24.1957 3.19854 23.5729 2.21986C21.8424 0.329222 19.7516 1.90401 20.1075 6.40151C20.2276 7.91402 20.6013 10.5031 21.104 12.0957L22.0159 14.9961L22.661 12.8119C23.0169 11.6108 23.5551 9.03061 23.8665 7.07769Z"
        fill="#FF2116"
      />
    </svg>
  ),

  textIcon: (props: IconProps) => (
    <svg
      viewBox="0 0 50 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="-1" width="50" height="50" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        ></pattern>
        <image id="image0_270_4137" width="512" height="512" />
      </defs>
    </svg>
  ),

  listIcon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M7 17h2v-2H7v2Zm0-4h2v-2H7v2Zm0-4h2V7H7v2Zm4 8h6v-2h-6v2Zm0-4h6v-2h-6v2Zm0-4h6V7h-6v2ZM3 21V3h18v18H3Zm2-2h14V5H5v14Zm0 0V5v14Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
};
