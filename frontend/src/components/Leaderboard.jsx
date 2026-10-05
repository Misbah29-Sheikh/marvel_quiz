import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/score`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to get scores");
                }

                const data = await response.json();
                console.log(data.data)
                setScores(data.data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchScores();
    }, [])

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Something went wrong. Please try again.</h2>;
    }


    return (
        <div className="min-h-screen bg-[#F5E6C8] px-6 pb-12 pt-24">
            <div className="mx-auto w-full max-w-3xl">

                <h1 className="mb-10 text-center font-lilita text-5xl">
                    LEADERBOARD
                </h1>

                <div className="overflow-hidden rounded-2xl border-4 border-gray-900 bg-white shadow-[6px_6px_0px_#111]">

                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="px-5 py-4 text-left font-lilita text-lg">
                                    RANK
                                </th>
                                <th className="px-5 py-4 text-left font-lilita text-lg">
                                    PLAYER
                                </th>
                                <th className="px-5 py-4 text-right font-lilita text-lg">
                                    SCORE
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {scores.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b-2 border-gray-200 last:border-b-0"
                                >
                                    <td className="px-5 py-4 font-lilita text-xl">
                                        #{user.rank}
                                    </td>

                                    <td className="px-5 py-4 font-lilita text-xl">
                                        {user.username}
                                    </td>

                                    <td className="px-5 py-4 text-right font-lilita text-xl text-red-600">
                                        {user.score}/200
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => navigate("/game")}
                        className="rounded-xl border-4 border-black bg-red-600 px-7 py-3 font-lilita text-xl text-white shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
                    >
                        PLAY AGAIN
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Leaderboard;