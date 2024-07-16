import React from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
}
const FALLBACK_IMAGE = "./tokens/not-found-error.svg";
export default function FallbackImage(props: FallbackImageProps) {
  const [srcImg, setSrcImage] = React.useState<string>(props.src);

  function handleError() {
    setSrcImage(FALLBACK_IMAGE);
  }

  return (
    <img
      src={srcImg}
      alt={props.alt}
      style={{ width: "24px", height: "24px", margin: "0 12px"  }}
      onError={handleError}
    />
  );
}
