import java.util.Random;
import java.util.Scanner;

public class RockPaperScissors {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        String[] choices = {"Rock", "Paper", "Scissors"};
        int playerWins = 0, computerWins = 0;

        System.out.println("Welcome to Rock, Paper, Scissors!");
        System.out.println("Enter 'Rock', 'Paper', or 'Scissors'. Type 'exit' to quit the game.");

        while (true) {
            System.out.print("Your move: ");
            String playerMove = scanner.nextLine().trim().toLowerCase();

            if (playerMove.equals("exit")) {
                break;
            }

            if (!playerMove.equals("rock") && !playerMove.equals("paper") && !playerMove.equals("scissors")) {
                System.out.println("Invalid input. Please try again.");
                continue;
            }

            // Computer randomly selects Rock, Paper, or Scissors
            String computerMove = choices[random.nextInt(3)];
            System.out.println("Computer chose: " + computerMove);

            // Determine the winner
            if (playerMove.equals(computerMove.toLowerCase())) {
                System.out.println("It's a tie!");
            } else if (
                (playerMove.equals("rock") && computerMove.equals("Scissors")) ||
                (playerMove.equals("paper") && computerMove.equals("Rock")) ||
                (playerMove.equals("scissors") && computerMove.equals("Paper"))
            ) {
                System.out.println("You win this round!");
                playerWins++;
            } else {
                System.out.println("Computer wins this round!");
                computerWins++;
            }

            // Display the score
            System.out.println("Score -> You: " + playerWins + " | Computer: " + computerWins);
        }

        System.out.println("Final Score -> You: " + playerWins + " | Computer: " + computerWins);
        System.out.println("Thanks for playing!");
        scanner.close();
    }
}
