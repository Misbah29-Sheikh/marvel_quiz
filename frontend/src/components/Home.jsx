import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    return (
        <main
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('../public/images/marvel.jpg')",
            }}
        >
            <div className="flex min-h-screen items-center justify-center bg-black/50 px-6 pt-20">
                <div className="text-center text-white">

                    <h1 className="font-lilita text-6xl tracking-wide md:text-8xl">
                        WHO'S THAT
                        <br />
                        CHARACTER?
                    </h1>

                    <p className="mt-6 text-lg text-white/80 md:text-xl">
                        Think you know your Marvel characters?
                    </p>

                    <p className="mt-2 text-sm text-white/60">
                        Guess 20 characters. How many can you recognize?
                    </p>

                    <button className="mt-8 rounded-lg bg-red-700 px-8 py-4 font-lilita text-xl cursor-pointer tracking-wide text-white shadow-lg transition hover:bg-red-800"
                        onClick={() => navigate("/game")}>
                        START QUIZ
                    </button>

                </div>
            </div>
        </main>
    );
}

export default Home;