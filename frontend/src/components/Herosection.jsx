import { useEffect, useState } from 'react';
import Mri from '../assets/mri.jpg';
import Xray from '../assets/xrayImage.jpg';
import FemaleDoc from '../assets/doctorFemale.jpg';
import { TypeAnimation } from 'react-type-animation';


const Herosection = () => {
  const images = [FemaleDoc, Xray, Mri];
  const [topIndex, setTopIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between gap-10 px-4 sm:px-6 lg:px-8 py-30 container mx-auto"
    >

      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <div className="sticky mx-auto md:mx-0 w-fit flex items-center gap-3 bg-white shadow-lg shadow-blue-500 px-4 py-2 rounded-full">
          <span className="text-blue-500">★</span>
          <span className="text-sm font-medium font-doto">Welcome to Hello Doctor</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="block">AI-Powered Diagnosis at Your</span>
          <span className="text-blue-600">Fingertips</span>
          <span className="inline-block ml-2 animate-pulse">🩺</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-lg mx-auto md:mx-0">
          <TypeAnimation
            sequence={[
              'Your Report. Our AI. A Doctor’s Backup—Just in Case.',
              1500,
              'Revolutionizing Medical Diagnosis with AI',
              1500,
              'Understand Your Medical Report Like Never Before',
              1500,
              'Upload. Analyze. Act.',
              1500,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </p>

        <div className="flex flex-row w-full sm:flex-row gap-4 pt-5 items-center justify-center md:justify-start">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex  w-2/3  px-4 py-3 sm:px-6 sm:py-4 ring-2 ring-blue-500 focus:ring-blue-700 rounded-lg"
          />
          <button
            type="submit"
            className="text-white bg-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition-all hover:scale-130"
          >
            →
          </button>
        </div>
      </div>

      {/* Right Column - Auto-animated stacked images */}
      <div className="w-full md:w-1/2">
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] max-w-[350px] sm:max-w-[400px] md:max-w-[500px] mx-auto">
          {images.map((img, index) => {
            const offset =
              10 * ((index - topIndex + images.length) % images.length);
            const z = index === topIndex ? 30 : 10 + index;

            return (
              <img
                key={index}
                src={img}
                alt=""
                className="absolute left-0 w-full h-full object-cover transition-all duration-700 ease-in-out rounded-xl shadow-lg shadow-blue-600"
                style={{
                  top: `${offset}px`,
                  zIndex: z,
                  opacity: index === topIndex ? 1 : 0.7,
                  transform:
                    index === topIndex
                      ? 'scale(1)'
                      : 'scale(-0.95) rotate(360deg)',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Herosection;
