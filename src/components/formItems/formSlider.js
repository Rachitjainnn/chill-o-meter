// 'use client';
// import * as React from "react";
// import * as Slider from "@radix-ui/react-slider";
// import useMedia from 'use-media';

// export default function FormSlider({ inputValue, setInputValue }) {
//   const isMobile = useMedia({ maxWidth: 768 });
//   const orientation = isMobile ? 'horizontal' : 'vertical';

//   return (
//     <div className={`flex items-center justify-center ${isMobile ? 'flex gap-2 w-full mb-6' : 'flex-col lg:h-screen'}`}>
//       {/* Labels */}
//       {isMobile ? (
//         // <div className="flex justify-between w-full px-4 mb-2">
//           <span className="bangers-font text-lg">Chill</span>
//         // </div>
//       ) : (
//         <span className="bangers-font text-3xl mb-2">Formal</span>
//       )}

//       {/* Slider */}
//       <form>
//         <Slider.Root
//           orientation={orientation}
//           value={[inputValue]}
//           onValueChange={(value) => setInputValue(value[0])}
//           max={10}
//           step={1}
//           className={`relative flex ${isMobile ? 'w-64 h-10' : 'h-[90vh] w-10'
//             } touch-none select-none items-center justify-center bg-white rounded-lg`}
//         >
//           <Slider.Track className={`relative rounded-full ${isMobile ? 'h-3 w-full' : 'w-full h-full'}`}>
//             <Slider.Range  />
//           </Slider.Track>

//           <Slider.Thumb
//             className="block size-6 lg:size-12 rounded-full bg-yellow-400 shadow-lg hover:bg-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
//             aria-label="Tone"
//           />
//         </Slider.Root>
//       </form>
//       {isMobile &&  <span className="bangers-font text-lg">Formal</span>}

//       {!isMobile && <span className="bangers-font text-3xl mt-2">Chill</span>}
//     </div>
//   );
// }

'use client';
import * as React from "react";
import * as Slider from "@radix-ui/react-slider";
import useMedia from 'use-media';

export default function FormSlider({ inputValue, setInputValue }) {
  const isMobile = useMedia({ maxWidth: 768 });
  const orientation = isMobile ? 'horizontal' : 'vertical';

  return (
    <div className={`flex items-center justify-center ${isMobile ? 'flex gap-2 w-full mb-6' : 'flex-col lg:h-screen'}`}>
      {/* Labels */}
      {isMobile ? (
        <div className="flex items-center justify-between gap-2 w-full ">
          <span className="bangers-font text-m">Chill</span>
          <form>
            <Slider.Root
              orientation={orientation}
              value={[inputValue]}
              onValueChange={(value) => setInputValue(value[0])}
              max={10}
              step={1}
              className={`relative flex ${isMobile ? 'w-72 h-10' : 'h-[90vh] w-10'
                } touch-none select-none items-center justify-center bg-white rounded-lg`}
            >
              <Slider.Track className={`relative rounded-full ${isMobile ? 'h-3 w-full' : 'w-full h-[90vh]'}`}>
                <Slider.Range />
              </Slider.Track>

              <Slider.Thumb
                className="block size-6 lg:size-12 rounded-full bg-yellow-400 shadow-lg hover:bg-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                aria-label="Tone"
              />
            </Slider.Root>
          </form>
          <span className="bangers-font text-m">Formal</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full ">
          <span className="bangers-font text-2xl">Formal</span>
          <form>
            <Slider.Root
              orientation={orientation}
              value={[inputValue]}
              onValueChange={(value) => setInputValue(value[0])}
              max={10}
              step={1}
              className={`relative flex ${isMobile ? 'w-64 h-10' : 'h-[90vh] w-10'
                } touch-none select-none items-center justify-center bg-white rounded-lg`}
            >
              <Slider.Track className={`relative rounded-full ${isMobile ? 'h-3 w-full' : 'w-full h-full'}`}>
                <Slider.Range />
              </Slider.Track>

              <Slider.Thumb
                className="block size-6 lg:size-12 rounded-full bg-yellow-400 shadow-lg hover:bg-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                aria-label="Tone"
              />
            </Slider.Root>
          </form>
          {!isMobile && <span className="bangers-font text-2xl mt-2">Chill</span>}
        </div>
      )}

      {/* Slider */}


    </div>
  );
}
