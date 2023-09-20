document.addEventListener("DOMContentLoaded", function () {
    const questionForm = document.getElementById("question-form");
    const questionList = document.getElementById("question-list");
    const addQuestionButton = document.getElementById("add-question");
    const optionsContainer = document.getElementById("options-container");
    const questionTypeSelect = document.getElementById("question-type");
    const multipleChoiceAnswersInput = document.getElementById("multiple-choice-answers");

    questionTypeSelect.addEventListener("change", function () {
        // Enable or disable the "Number of Multiple Choice Answers"
        const isMultipleChoice = this.value === "multiple-choice";
        multipleChoiceAnswersInput.disabled = !isMultipleChoice;
        if (!isMultipleChoice) {
            multipleChoiceAnswersInput.value = ""; // Reset the input value
        }
    });

    addQuestionButton.addEventListener("click", function () {
        // Get user input values
        const questionType = document.getElementById("question-type").value;
        const questionText = document.getElementById("question-text").value;
        const requiredQuestion = document.getElementById("required-question").checked;
        const timeLimit = parseInt(document.getElementById("time-limit").value) || null; // Parse time limit as an integer
        const multipleChoiceAnswers = parseInt(document.getElementById("multiple-choice-answers").value) || 0;

        // Check if the user has selected "Multiple Choice" and provided a valid number of answers
        if (questionType === "multiple-choice" && (multipleChoiceAnswers < 1 || multipleChoiceAnswers > 4)) {
            alert("Number of Multiple Choice Answers must be between 1 and 4.");
            return;
        }

        // Create a new question object
        const question = {
            type: questionType,
            text: questionText,
            required: requiredQuestion,
            timeLimit: timeLimit,
            options: [], // Initialize an empty array for options
            answerCount: multipleChoiceAnswers,
        };

        if (questionType === "multiple-choice") {
            // Get the options for multiple-choice questions
            const optionInputs = document.querySelectorAll(".option-input");
            optionInputs.forEach((input) => {
                const optionText = input.value.trim();
                if (optionText !== "") {
                    question.options.push({
                        text: optionText,
                        selected: false,
                    });
                }
            });
        }

        // Add the question to the list
        addQuestionToList(question);
    });

    function addQuestionToList(question) {
        const questionItem = document.createElement("div");
        questionItem.classList.add("question-item");
        questionItem.innerHTML = `
            <p>Type: ${question.type}</p>
            <p>Question: ${question.text}</p>
            <p>Required: ${question.required ? "Yes" : "No"}</p>
            <p>Time Limit: ${question.timeLimit || "Not set"}</p>
            <p>Number of Answers (Multiple Choice): ${question.answerCount || "N/A"}</p>
            <p>Options:</p>
            <ul>
                ${question.options.map((option, index) => `
                    <li>
                        <input type="checkbox" disabled>
                        <label>${option.text}</label>
                    </li>
                `).join("")}
            </ul>
        `;
        questionList.appendChild(questionItem);
    }
});
