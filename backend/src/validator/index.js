import { body } from "express-validator"

const saveScoreValidator = () => {
    return [
        body("username")
            .trim()
            .notEmpty().withMessage("Username cannot be empty"),
        body("score")
            .notEmpty().withMessage("Score cannot be empty")
            .isInt({ min: 0 }).withMessage("Score must be a non-negative integer")
            .isInt({ max: 200 }).withMessage("Score cannot exceed 200")

    ]
}

export { saveScoreValidator }