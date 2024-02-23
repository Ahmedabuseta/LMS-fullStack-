"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface iProps {
  value: string;
}

export const TextPreview = ({ value }: iProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return <ReactQuill theme="bubble" value={value} readOnly />;
};
