document.addEventListener("DOMContentLoaded", function () {
    const questionForm = document.getElementById("question-form");
    const questionList = document.getElementById("question-list");
    const addQuestionButton = document.getElementById("add-question");
    const optionsContainer = document.getElementById("options-container");
    const questionTypeSelect = document.getElementById("question-type");
    const addOptionButton = document.getElementById("add-option");
    const removeOptionButton = document.getElementById("remove-option");
    const optionText = document.getElementById("option-text");
    const correctAnswerInput = document.getElementById("correct-answer"); // Add this line

    let optionCount = 0;

    questionTypeSelect.addEventListener("change", function () {
        const isMultipleChoice = this.value === "multiple-choice";
        const isOpenEnded = this.value === "open-ended";
        optionsContainer.style.display = isMultipleChoice ? "block" : "none";
        optionText.style.display = isMultipleChoice ? "block" : "none";
        if (isOpenEnded) {
            optionText.style.display = "none";
        }
    });

    addOptionButton.addEventListener("click", function () {
        if (optionCount < 4) {
            addMultipleChoiceOptionInput(optionText.value);
            optionText.value = "";
            optionCount++;
        }
    });

    removeOptionButton.addEventListener("click", function () {
        const optionInputs = document.querySelectorAll(".option-input");
        if (optionInputs.length > 0) {
            const lastOptionInput = optionInputs[optionInputs.length - 1];
            optionsContainer.removeChild(lastOptionInput);
            optionCount--;
        }
    });

    addQuestionButton.addEventListener("click", function () {
        const questionType = document.getElementById("question-type").value;
        const questionText = document.getElementById("question-text").value;
        const isRequiredQuestion = document.getElementById("required-question").checked;
        const correctAnswer = correctAnswerInput.value; // Get the correct answer value

        const question = {
            type: questionType,
            text: questionText,
            required: isRequiredQuestion,
            correctAnswer: correctAnswer, // Include the correct answer in the question object
            options: [],
        };

        if (questionType === "multiple-choice") {
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

            if (question.options.length < 2) {
                alert("Please provide at least two options for multiple-choice questions.");
                return;
            }
        }

        addQuestionToList(question);
    });

    function addQuestionToList(question) {
        const questionItem = document.createElement("div");
        questionItem.classList.add("question-item");
        questionItem.innerHTML = `
            <p>Type: ${question.type}</p>
            <p>Question: ${question.text}</p>
            <p>Required: ${question.required ? "Yes" : "No"}</p>
            ${question.type === "open-ended" ? `
                <label for="open-ended-answer">Your Answer:</label>
                <textarea id="open-ended-answer" rows="4" cols="50"></textarea>
            ` : `
                <p>Options:</p>
                <ul>
                    ${question.options.map((option, index) => `
                        <li>
                            <input type="radio" name="options-${optionCount}" id="option-${index}">
                            <label for="option-${index}">${option.text}</label>
                        </li>
                    `).join("")}
                </ul>
            `}
        `;
        questionList.appendChild(questionItem);
    }

    function addMultipleChoiceOptionInput(initialOptionText) {
        const optionInput = document.createElement("input");
        optionInput.classList.add("option-input");
        optionInput.type = "text";
        optionInput.value = initialOptionText;
        optionsContainer.appendChild(optionInput);
    }
});
