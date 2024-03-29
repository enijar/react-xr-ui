import React from "react";

type Props = {
  pathname: string;
};

export default function ViewCode({ pathname }: Props) {
  return (
    <a
      target="_blank"
      rel="nofollow"
      href={`https://github.com/Enijar/react-xr-ui/tree/main/examples/examples/${pathname}.tsx`}
      style={{
        display: "flex",
        gap: "1ch",
        position: "absolute",
        insetInlineEnd: "1em",
        insetBlockStart: "1em",
        blockSize: "2em",
        alignItems: "center",
        textDecoration: "none",
        backgroundColor: "#111111",
        paddingInline: "1em",
        paddingBlock: "0.5em",
        borderRadius: "0.25em",
        cursor: "pointer",
      }}
    >
      <span>View Code</span>
      <svg
        height="157.06"
        viewBox="0 0 161.03 157.06"
        width="161.03"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          inlineSize: "auto",
          blockSize: "100%",
        }}
      >
        <g fill="currentColor">
          <path
            d="m80.52 0c-44.47 0-80.52 36.05-80.52 80.52 0 35.57 23.07 65.76 55.06 76.4 4.02.75 5.5-1.75 5.5-3.87 0-1.92-.07-8.26-.11-14.99-22.4 4.87-27.13-9.5-27.13-9.5-3.66-9.31-8.94-11.78-8.94-11.78-7.31-5 .55-4.89.55-4.89 8.09.57 12.34 8.3 12.34 8.3 7.18 12.31 18.84 8.75 23.43 6.69.72-5.2 2.81-8.76 5.11-10.77-17.88-2.04-36.68-8.94-36.68-39.79 0-8.79 3.15-15.97 8.3-21.61-.84-2.03-3.59-10.22.78-21.31 0 0 6.76-2.16 22.15 8.25 6.42-1.78 13.31-2.68 20.15-2.71 6.84.03 13.74.93 20.17 2.71 15.37-10.42 22.12-8.25 22.12-8.25 4.38 11.09 1.63 19.28.79 21.31 5.16 5.64 8.29 12.82 8.29 21.61 0 30.93-18.84 37.73-36.77 39.73 2.89 2.5 5.46 7.4 5.46 14.91 0 10.77-.09 19.44-.09 22.1 0 2.14 1.45 4.65 5.53 3.86 31.97-10.66 55.02-40.83 55.02-76.39 0-44.48-36.05-80.53-80.51-80.53"
            fillRule="evenodd"
          />
          <path d="m30.5 115.61c-.18.4-.81.52-1.38.25-.58-.26-.91-.81-.72-1.21.17-.41.8-.53 1.39-.25.59.26.92.81.72 1.22" />
          <path d="m33.76 119.24c-.38.36-1.13.19-1.64-.37-.53-.56-.63-1.31-.24-1.67.4-.35 1.12-.19 1.65.37.53.57.63 1.31.23 1.67z" />
          <path d="m36.93 123.88c-.49.34-1.3.02-1.8-.69-.49-.72-.49-1.57.01-1.92.5-.34 1.29-.03 1.8.68.49.73.49 1.59-.01 1.94" />
          <path d="m41.28 128.36c-.44.49-1.38.36-2.07-.31-.7-.65-.9-1.57-.46-2.06.45-.49 1.39-.35 2.09.31.7.65.91 1.58.44 2.06z" />
          <path d="m47.28 130.96c-.19.63-1.1.92-2.01.65-.91-.28-1.51-1.01-1.32-1.65.19-.63 1.1-.93 2.02-.65.91.27 1.51 1.01 1.32 1.65" />
          <path d="m53.87 131.44c.02.66-.75 1.21-1.71 1.23s-1.74-.52-1.75-1.17c0-.67.76-1.22 1.72-1.23.96-.02 1.74.51 1.74 1.17z" />
          <path d="m60 130.4c.11.65-.55 1.31-1.5 1.49-.93.17-1.8-.23-1.92-.87-.12-.66.56-1.33 1.49-1.5.95-.17 1.8.22 1.93.88z" />
        </g>
      </svg>
    </a>
  );
}
