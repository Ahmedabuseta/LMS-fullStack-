'use client'

import dynamic from "next/dynamic"
import { useMemo } from "react"
import 'react-quill/dist/quill.snow.css'

interface iProps {
  value: string
  onChange: (value: string) => void
}

export const TextEditor = ({ value, onChange }: iProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
    />
  )
}