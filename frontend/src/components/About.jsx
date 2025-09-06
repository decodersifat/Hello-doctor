
import { motion } from "motion/react"

const About = () => {
    return (
        <section id="about" className="w-full bg-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12  pt-30 pb-55">

                <div className="w-full md:w-1/2 mb-10 md:mb-0">
                    <div className="flex gap-2 mt-6">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1 }}
                            className="bg-rose-700/90 font-doto text-6xl hover:bg-rose-700 size-50  rounded-full flex items-center justify-center text-white font-bold transition-opacity cursor-pointer">
                            H
                        </motion.div>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1 }}
                            className="hover:bg-blue-700/80 bg-blue-700 size-50 font-doto text-6xl -ml-16 rounded-full flex items-center justify-center text-white  font-bold transition-opacity cursor-pointer">
                            D
                        </motion.div>
                    </div>
                </div>


                {/* Right Side - About Us Text */}
                <div className="w-full md:w-1/2 px-3 border-l-2 border-blue-600 pr-3">

                    <div className="flex md:flex-row gap-2">
                        <h2 className="text-6xl font-doto font-extrabold text-gray-800 mb-6">About </h2>
                        <h2 className="text-6xl  text-blue-600 mb-6"> Us</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        <strong className="text-blue-600 animate-pulse">Hello Doctor</strong> is an AI-powered health platform that helps patients understand their medical reports—like MRI, ECG, and X-ray—within minutes.
                        Our goal is to make diagnostics accessible, especially for those in rural or underserved areas.
                    </p>
                    <p className="text-gray-600 mb-4">
                        We use cutting-edge AI models to detect tumors, abnormalities, and more. If our system detects low confidence in a result, we instantly connect you with a real specialist.
                    </p>

                </div>
            </div>
        </section>

    )
};
export default About;