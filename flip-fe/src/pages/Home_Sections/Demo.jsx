import TranslatorDemo from "../../assets/TranslatorDemo.png"
import FlashCardDemo from "../../assets/FlashCardDemo.png"
import ScrollFloat from '../../components/ScrollFloat';
import './Demo.css';

export default function Demo () {
    return(
        <>
        <ScrollFloat
  animationDuration={1}
  textClassName="main-language-text"
  ease='back.inOut(2)'
  scrollStart='center bottom+=0%'
  scrollEnd='bottom bottom-=60%'
  stagger={0.2}
>
Learn Language with Efficiency!
     </ScrollFloat>

            {/* Translator Demo */}
            <section>
                <div className = "flex items-center justify-center">
                    <img src = {TranslatorDemo} className = "w-150 object-contain mr-20"/>
                    <div>
                        <ScrollFloat
  animationDuration={1}
  textClassName="translate-text"
  ease='back.inOut(2)'
  scrollStart='center bottom+=10%'
  scrollEnd='bottom bottom-=60%'
  stagger={0.2}
>
Translate what you actually use
     </ScrollFloat>
<ScrollFloat
  animationDuration={1}
  textClassName="translate-text"
  ease='back.inOut(2)'
  scrollStart='center bottom+=10%'
  scrollEnd='bottom bottom-=70%'
  stagger={0.2}
>
Make flashcards rooted in Experience 
     </ScrollFloat>
                    
                    </div>
                </div>
            </section>
            {/* Flashcard Demo */}
            <section className = "mt-20">
                <div className = "flex items-center justify-center">
                    <div className= "pl-95">
                        <ScrollFloat
  animationDuration={1}
  textClassName="translate-text"
  ease='back.inOut(2)'
  scrollStart='center bottom+=70%'
  scrollEnd='bottom bottom-=60%'
  stagger={0.2}
>
Interactive Review 
     </ScrollFloat>
     <ScrollFloat
  animationDuration={1}
  textClassName="translate-text"
  ease='back.inOut(2)'
  scrollStart='center bottom+=75%'
  scrollEnd='bottom bottom-=60%'
  stagger={0.2}
>
Stay in touch with your Learning 
     </ScrollFloat>
                    </div>
                    <img src = {FlashCardDemo} className = "w-150 object-contain mr-20 pl-30"/>
                </div>
            </section>
        </>
    )
}