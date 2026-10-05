import { Score } from "../models/score.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const saveScore = asyncHandler(async (req, res) => {
    const { username, score } = req.body;

    const normalizedUsername = username.toLowerCase().trim()

    const existingUser = await Score.findOne({
        username: normalizedUsername
    })

    let savedUser;

    if (existingUser) {
        if (score > existingUser.score) {
            existingUser.score = score
            await existingUser.save()
        }
        savedUser = existingUser;
    }
    else {
        savedUser = await Score.create({
            username: normalizedUsername,
            score
        })
    }

    const higherScores = await Score.countDocuments({
        score: { $gt: savedUser.score }
    });

    const rank = higherScores + 1;

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {savedUser, rank},
            "Score saved successfully"
        ))

})

const getScores = asyncHandler(async (req, res) => {
    const scores = await Score.find().sort({ score: -1 }).limit(10);

    const scoresWithRank = scores.map((user, index) => {
        const rank = scores.filter(
            (item) => item.score > user.score
        ).length + 1;

        return {
            ...user.toObject(),
            rank
        };
    });

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            scoresWithRank,
            "Scores fetched successfully"
        ));
});

export { saveScore, getScores }