import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import Demo from "./Demo"
import FAQ from "./FAQ"
export default function Home() {

    return (
        <>
            <section className="bg-[url(https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_1280.jpg)] bg-cover">
            
                <div className = "font-[Bebas_Neue] flex flex-col items-center justify-center pt-40">
                    <h1 className="font-[Indie_Flower] bg-white animate-typing overflow-hidden whitespace-nowrap inline-block" style={{ "--typing-width": "5ch" }}
                    >
                        HELIO
                    </h1>
                    <h1 className="bg-white animate-typing overflow-hidden whitespace-nowrap inline-block" style={{ "--typing-width": "36ch" }}
                    >
                        Personalised Language Learning Platform
                    </h1>
                    <h1 className="bg-white animate-typing overflow-hidden whitespace-nowrap inline-block" style={{ "--typing-width": "19ch" }}>
                        Built for you, With You
                    </h1>
                    <p className="bg-white  animate-typing overflow-hidden whitespace-nowrap inline-block" style={{ "--typing-width": "47ch" }}>Learn from your own experiences. Don't just watch. DO</p>
                    <Link to = "/login">
                        <button
                        type="button"
                        className="relative rounded-full text-slate-40 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 
                        h-14 bg-linear-65 from-green-700 to-yellow-400 p-4 font-[Indie_Flower] text-[18px] cursor-pointer hover:animate-[spin_1s_ease-in-out_1]"
                        >
                        Start Growing
                        </button>
                    </Link>

                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>    
                    <h1></h1> 
                    <h1></h1>  
                </div>
            </section>
            {/* Demo Section */}
            <section>
                <Demo/>
            </section>
            <section>
                <FAQ/>
            </section>
        </>
    )
}