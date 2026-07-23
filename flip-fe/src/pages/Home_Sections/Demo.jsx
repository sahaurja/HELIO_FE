import TranslatorDemo from "../../assets/TranslatorDemo.png"

export default function Demo () {
    return(
        <>
            <h1>Some catchy pun</h1>
            {/* Translator Demo */}
            <section>
                <div className = "flex">
                    <img src = {TranslatorDemo} className = "h-200 w-150 object-contain"/>
                    <div>
                        <p>Translate what you actually use</p>
                        <p>Make flashcards rooted in Experience </p>
                    </div>
                </div>
            </section>
            {/* Flashcard Demo */}
        </>
    )
}