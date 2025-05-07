import "./globals.css";


export const metadata = {
  title: "Fiddle",
  description: "Text Tone Slider",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
              {/* <h1 className="bangers-font text-center text-blue-400 text-9xl pt-10">Chill-o-Meter</h1> */}
        
        {children}

      </body>
    </html>
  );
}
