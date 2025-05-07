import { RingLoader } from "react-spinners";

export default function Hero({ isLoading, responseText }) {
    return (
        <div className="flex-1 px-4 sm:px-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-wide font-bold bangers-font mb-4 text-center sm:text-left">
                Chill-o-Meter
            </h1>
            <p className="text-lg sm:text-xl mb-4 text-gray-600 text-center sm:text-left">
                Let’s find out how chill your message is today!
            </p>

            {isLoading ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6 text-center">
                    <RingLoader color="#FFEB3B" size={60} />
                    <span className="text-lg sm:text-xl">Fetching response...</span>
                </div>
            ) : responseText ? (
                responseText.startsWith("❌") ? (
                  <div className="mt-6 p-4 bg-red-100 rounded-xl shadow-sm">
                    <p className="text-red-500 font-semibold">{responseText}</p>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-yellow-100 rounded-xl shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Response:</h2>
                    <p className="text-gray-800 text-base sm:text-lg">{responseText}</p>
                  </div>
                )
              ) : (
                <p className="text-gray-400 italic text-center sm:text-left">
                  Please enter your message...
                </p>
              )}

        </div>
    );
}
