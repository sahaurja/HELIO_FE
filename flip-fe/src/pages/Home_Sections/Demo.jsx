import TranslatorDemo from "../../assets/TranslatorDemo.png"
import FlashCardDemo from "../../assets/FlashCardDemo.png"

export default function Demo () {
    return(
        <>
            <h1 className="text-center">Some catchy pun</h1>
            {/* Translator Demo */}
            <section>
                <div className = "flex items-center justify-center">
                    <img src = {TranslatorDemo} className = "w-150 object-contain mr-20"/>
                    <div>
                        <p>Translate what you actually use</p>
                        <p>Make flashcards rooted in Experience </p>
                    </div>
                </div>
            </section>
            {/* Flashcard Demo */}
            <section className = "mt-20">
                <div className = "flex items-center justify-center">
                    <div className= "pl-95">
                        <p>Interactive Review</p>
                        <p>Stay in touch with your Learning</p>
                    </div>
                    <img src = {FlashCardDemo} className = "w-150 object-contain mr-20 pl-30"/>
                </div>
            </section>
        </>
    )
}