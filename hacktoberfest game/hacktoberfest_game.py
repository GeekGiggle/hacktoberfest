def main():
    print("Welcome to Hacktoberfest 2025 Game!")
    print("Your goal is to make 6 Pull Requests (PRs) by completing challenges.")
    print("Each challenge is a question. Answer correctly to merge the PR!\n")

    challenges = [
        {
            "question": "What is Hacktoberfest?",
            "options": ["A) A traditional festival", "B) An open-source contribution event", "C) A coding competition"],
            "correct": "B"
        },
        {
            "question": "How many PRs do you need to make in Hacktoberfest 2025?",
            "options": ["A) 4", "B) 6", "C) 10"],
            "correct": "B"
        },
        {
            "question": "What does PR stand for in this context?",
            "options": ["A) Pull Request", "B) Push Request", "C) Program Request"],
            "correct": "A"
        },
        {
            "question": "What does open-source mean?",
            "options": ["A) Code is freely available and modifiable", "B) Code is kept secret", "C) Code requires payment"],
            "correct": "A"
        },
        {
            "question": "What is Git primarily used for?",
            "options": ["A) Version control", "B) Cooking recipes", "C) Graphic design"],
            "correct": "A"
        },
        {
            "question": "In which month does Hacktoberfest occur?",
            "options": ["A) October", "B) November", "C) December"],
            "correct": "A"
        }
    ]

    pr_count = 0
    for i, challenge in enumerate(challenges, 1):
        while True:
            print(f"\nChallenge for PR {i}: {challenge['question']}")
            for option in challenge["options"]:
                print(option)
            answer = input("Your choice (A/B/C): ").strip().upper()
            if answer == challenge["correct"]:
                print(f"Correct! PR {i} merged successfully!")
                pr_count += 1
                break
            else:
                print("Incorrect. Try again!")

    if pr_count == 6:
        print("\nCongratulations! You have successfully completed Hacktoberfest 2025!")
        print("You made all 6 PRs and earned your digital badge!")
    else:
        print("\nGame over. You didn't complete all PRs.")

if __name__ == "__main__":
    main()
