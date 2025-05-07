'use client'
import { useState } from "react"
import Form from "@/components/formItems/form"
import FormSlider from "@/components/formItems/formSlider"

export default function Home() {
  const [sliderValue, setSliderValue] = useState(5);
  return (
    <div>
      <div className="min-h-screen overflow-hidden flex flex-col lg:flex-row items-center gap-2 lg:gap-18 px-4">
        <Form sliderValue={sliderValue} />
        <FormSlider inputValue={sliderValue} setInputValue={setSliderValue} />
      </div>

    </div>
  );
}
