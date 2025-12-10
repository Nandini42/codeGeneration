import java.util.Scanner;

public class SumCalculator {

    public static void main(String[] args) {
        // Create a Scanner object to read input from System.in
        Scanner scanner = new Scanner(System.in);

        // Read the first number
        int number1 = scanner.nextInt();

        // Read the second number
        int number2 = scanner.nextInt();

        // Calculate the sum
        int sum = number1 + number2;

        // Print the sum
        System.out.println(sum);

        // Close the scanner to release resources
        scanner.close();
    }
}