import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import Demo from "./Demo"
import FAQ from "./FAQ"
import ClickSpark from '../../components/Clickable'
import RotatingText from '../../components/RotatingText'
import Background from '../../assets/hello.gif'


export default function Home() {
  return (
    <div className="home-page">

      <div className="home-content">
        <ClickSpark
          sparkColor="#000000"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >

          <section className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-80 w-260 h-200"
              style={{ backgroundImage: `url(${Background})` }}
            />

            <div className="relative z-10 font-[Bebas_Neue] flex flex-col items-center justify-center pt-40">

              <h1
                className="font-[Indie_Flower] text-black animate-typing overflow-hidden whitespace-nowrap inline-block text-5xl"
                style={{ "--typing-width": "5ch" }}
              >
                HELIO
              </h1>

              <h1
                className="animate-typing overflow-hidden whitespace-nowrap flex items-center gap-2 inline-flex"
                style={{ "--typing-width": "36.7ch" }}
              >
                <RotatingText
                  texts={['Personalized', 'Effective', 'Streamlined', 'Practical']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-blue-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg w-32"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400
                  }}
                  rotationInterval={2000}
                  splitBy="characters"
                  auto
                  loop
                />

                <span>Language Learning Platform</span>
              </h1>

              <h1
                className="animate-typing overflow-hidden whitespace-nowrap inline-block"
                style={{ "--typing-width": "19ch" }}
              >
                Built for you, With You
              </h1>

              <p
                className="animate-typing overflow-hidden whitespace-nowrap inline-block"
                style={{ "--typing-width": "47ch" }}
              >
                Learn from your own experiences. Don't just watch. DO
              </p>

              <Link to="/login">
                <button
                  type="button"
                  className="relative rounded-full text-slate-40 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 h-14 bg-linear-65 from-green-700 to-yellow-400 p-4 font-[Indie_Flower] text-[18px] cursor-pointer hover:animate-[spin_1s_ease-in-out_1]"
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

          <section>
            <Demo />
          </section>

          <section>
            <FAQ />
          </section>

        </ClickSpark>
      </div>

    </div>
  );
}