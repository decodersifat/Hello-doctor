
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import Teams from '../components/Teams'
import About from '../components/About'
import Footer from '../components/Footer'
import Services from '../components/Services'

function Home() {
  return (
    <main className=' relative min-h-screen overflow-hidden'>
      <div className='absolute -top-28 -left-28 md:h-[500px] md:w-[500px] h-[350px] w-[350px]  rounded-full -z-10 bg-gradient-to-tr from-blue-900/30 to-sky-300/30 blur-lg'></div>
      <div>
        <Navbar />
        <Herosection />
        <Services/>
        <About/>
        <Teams/>
        <Footer/>
      </div>
    </main>
  )
}

export default Home;