import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Game() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [score, setScore] = useState(0)
    const [gameCharacters, setGameCharacters] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [options, setOptions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [timeLeft, setTimeLeft] = useState(20)
    const [isRevealed, setIsRevealed] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)
    const [username, setUsername] = useState("")
    const [isSaved, setIsSaved] = useState(false)
    const [rank, setRank] = useState(null)
    const [bestScore, setBestScore] = useState(null)
    const currentCharacter = gameCharacters[currentQuestion];

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(
                    "https://akabab.github.io/superhero-api/api/all.json"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch characters");
                }

                const data = await response.json();

                const marvelCharacters = data.filter(
                    (character) =>
                        character.biography.publisher === "Marvel Comics"
                );

                setCharacters(marvelCharacters)

                const shuffled = [...marvelCharacters].sort(
                    () => Math.random() - 0.5
                );
                const selectedCharacters = shuffled.slice(0, 20);
                setGameCharacters(selectedCharacters)


            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const generateOptions = () => {
        const wrongCharacters = characters.filter((char) => char.id !== currentCharacter.id).sort(() => Math.random() - 0.5).slice(0, 3)
        const shuffledOptions = [currentCharacter, ...wrongCharacters].sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions)
    }

    useEffect(() => {
        if (gameCharacters.length > 0 && characters.length > 0) {
            generateOptions();
            setSelectedAnswer(null)
        }
    }, [gameCharacters, currentQuestion])

    const handleAnswer = (option) => {
        if (selectedAnswer !== null) {
            return
        }
        setSelectedAnswer(option.id)
        setIsRevealed(true);

        if (option.id === currentCharacter.id) {
            setScore((prev) => prev + 10)
        }

        setTimeout(() => {
            setIsRevealed(false)
            if (currentQuestion === 19) {
                setIsGameOver(true)
            } else {
                setCurrentQuestion((prev) => prev + 1)
            }
        }, 1000);
    }

    useEffect(() => {

        if (selectedAnswer !== null) {
            return;
        }

        setTimeLeft(20);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsRevealed(false)
                    if (currentQuestion === 19) {
                        setIsGameOver(true)
                    } else {
                        setCurrentQuestion((prev) => prev + 1)
                    }
                    return 20;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentQuestion, selectedAnswer]);

    const saveScore = async () => {
        if (!username.trim()) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    score
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save score");
            }

            setRank(data.data.rank);
            setBestScore(data.data.savedUser.score);
            setIsSaved(true);

        } catch (error) {
            setError(error);
        }
    };

    const playAgain = () => {
        const shuffled = [...characters].sort(() => Math.random() - 0.5);
        const selectedCharacters = shuffled.slice(0, 20);

        setGameCharacters(selectedCharacters);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsRevealed(false);
        setTimeLeft(20);
        setIsGameOver(false);
        setUsername("");
        setRank(null);
        setIsSaved(false);
        setError(null);
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Something went wrong. Please try again.</h2>;
    }


    return (
        isGameOver ? (
            <div className="flex min-h-screen items-center justify-center bg-[#F5E6C8] px-6 pt-20">
                <div className="w-full max-w-md">

                    <div className="mb-6 text-center">
                        <h1 className="font-lilita text-6xl uppercase text-black">
                            GAME OVER
                        </h1>

                        <p className="mt-2 font-lilita text-xl uppercase text-black">
                            That's a wrap, hero!
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-3xl border-4 border-black bg-[#FFF8E7] shadow-[8px_8px_0px_#000]">

                        <div className="border-b-4 border-black bg-black px-6 py-4 text-center">
                            <p className="font-lilita text-xl uppercase tracking-wide text-white">
                                FINAL SCORE
                            </p>
                        </div>

                        <div className="px-8 py-8 text-center">

                            <p className="font-lilita text-6xl text-red-600">
                                {score}
                                <span className="text-3xl text-gray-800"> / 200</span>
                            </p>

                            {isSaved ? (
                                <>
                                    <div className="my-8 border-t-2 border-dashed border-gray-400" />

                                    <p className="font-lilita text-2xl uppercase text-gray-800">
                                        Your Best Score : {bestScore}
                                    </p>

                                    <p className="font-lilita text-2xl uppercase text-gray-800">
                                        Your Rank
                                    </p>

                                    <p className="mt-2 font-lilita text-5xl text-red-600">
                                        #{rank}
                                    </p>

                                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">

                                        <button
                                            onClick={playAgain}
                                            className="rounded-xl border-4 border-black bg-red-600 px-7 py-3 font-lilita text-xl text-white shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
                                        >
                                            PLAY AGAIN
                                        </button>

                                        <button
                                            onClick={() => navigate("/leaderboard")}
                                            className="rounded-xl border-4 border-black bg-gray-900 px-7 py-3 font-lilita text-xl text-white shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
                                        >
                                            LEADERBOARD
                                        </button>

                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="mt-4 font-lilita text-lg uppercase text-gray-600">
                                        Enter your name to save your score
                                    </p>

                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.currentTarget.value)}
                                        placeholder="Enter username"
                                        className="mt-6 w-full rounded-xl border-4 border-black bg-white px-5 py-3 text-center font-lilita text-lg outline-none placeholder:text-gray-400 focus:border-red-600"
                                    />

                                    <button
                                        onClick={saveScore}
                                        className="mt-5 w-full rounded-xl border-4 border-black bg-red-600 px-8 py-3 font-lilita text-xl text-white shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
                                    >
                                        SAVE SCORE
                                    </button>
                                </>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        ) : (
            <div className="flex min-h-screen items-center justify-center px-6 pt-20 pb-10">

                <div className="w-full max-w-3xl">

                    {/* Question + Timer */}
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="font-lilita text-2xl">
                            QUESTION {currentQuestion + 1} / 20
                        </h2>

                        <div className="font-lilita text-xl">
                            TIME: {timeLeft}
                        </div>
                    </div>

                    {/* Character Image */}
                    <div className="mb-6 flex justify-center">
                        <div className="h-72 w-56 overflow-hidden rounded-xl">
                            <img
                                key={currentQuestion}
                                src={currentCharacter.images.md}
                                alt="Mystery character"
                                className={`h-full w-full object-cover ${!isRevealed
                                    ? "blur-lg saturate-50 brightness-90"
                                    : ""
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <h1 className="mb-6 text-center font-lilita text-3xl">
                        WHO IS THIS CHARACTER?
                    </h1>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {options.map((option) => (
                            <button key={option.id}
                                className={`rounded-xl px-6 py-4 font-lilita text-xl transition-all
                                ${selectedAnswer !== null
                                        ? option.id === currentCharacter.id
                                            ? "bg-green-500 text-white"
                                            : selectedAnswer === option.id
                                                ? "bg-red-500 text-white"
                                                : "bg-white"
                                        : "bg-white"
                                    }`}
                                onClick={() => handleAnswer(option)}
                                disabled={selectedAnswer !== null}>
                                {option.name}
                            </button>
                        ))}

                    </div>

                </div>

            </div>
        )
    )

}

export default Game