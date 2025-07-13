import sifat from '../assets/teams/sifat.jpg';
import anamul from '../assets/teams/anamul.png';
import junaedul from '../assets/teams/junaedul.png';
import anannya from '../assets/teams/anannaya.png';
import tusher from '../assets/teams/tusher.jpg';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "motion/react"

const Teams = () => {

    const photos = [

        { name: 'MD.Sifat Hossain', img: sifat, details: 'Web developer' },
        { name: 'Anannaya Sikder', img: anannya, details: 'Project Manager' },
        { name: 'MD.Tanjirul Majumder', img: tusher, details: 'AI Engineer' },
        { name: 'MD.Junaedul Islam Khan', img: junaedul, details: 'SQA' },
        { name: 'MD.Anamul Islam', img: anamul, details: 'Software Engineer' }

    ];


    return (
        <div id='teams' className="w-full container mx-auto pt-20 overflow-hidden">
            {/* Center the heading */}
            <div className="w-full text-center font-bold  text-gray-600 pb-15 bg-white py-2 z-10 text-5xl mb-8">
                <span className='font-doto'>Meet the</span> <span className='text-blue-700 border-b-4 rounded-b-md border-blue-700 rounded-full'>
                    <TypeAnimation
                        sequence={[
                            'T',
                            500,
                            'Te',
                            500,
                            'Tea',
                            500,
                            'Team',
                            500,
                            'Team:',
                            500,
                        ]}
                        speed={50}
                        repeat={Infinity}
                    />


                </span>
            </div>

            {/* Center the carousel */}



            <div className="flex justify-center">


                <motion.div
                    className="flex flex-shrink-0"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >


                    {photos.map((logo, index) => (

                        <div className='flex flex-col items-center justify-center'>

                            <img
                                key={index}
                                src={logo.img}
                                alt={`Profile ${index + 1}`}
                                className="mx-12 rounded-3xl size-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                            />
                            <div className='py-2 flex flex-col items-center'>
                                <span className='text-gray-950 text-sm font-mono' >{logo.name}</span>
                                <span className='text-gray-700 text-xs font-doto'>{logo.details}</span>
                            </div>



                        </div>



                    ))}

                </motion.div>



                <motion.div
                    className="flex flex-shrink-0"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    {photos.map((logo, index) => (
                        <div className='flex flex-col items-center justify-center'>

                            <img
                                key={index}
                                src={logo.img}
                                alt={`Profile ${index + 1}`}
                                className="mx-12 rounded-3xl size-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                            />
                            <div className='py-2 flex flex-col items-center'>
                                <span className='text-gray-950 text-sm font-mono' >{logo.name}</span>
                                <span className='text-gray-700 text-xs font-doto'>{logo.details}</span>
                            </div>



                        </div>
                    ))}
                </motion.div>


            </div>

        </div>

    );
};

export default Teams;