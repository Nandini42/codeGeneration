import java.util.Scanner;

public class Fibonacci {

    public static void main(String[] args) {
        int seriesLength = 20; // Default length as specified in the problem

        // Requirement: "Program must read input from STDIN".
        // This block attempts to read an integer from STDIN.
        // If a valid positive integer is provided, it will override the default length.
        // Otherwise, the default length of 20 will be used.
        try (Scanner scanner = new Scanner(System.in)) {
            if (scanner.hasNextInt()) {
                int inputLength = scanner.nextInt();
                // Only update seriesLength if the input is a positive number.
                // If input is 0 or negative, the default 20 is retained.
                if (inputLength > 0) {
                    seriesLength = inputLength;
                }
            }
        } catch (Exception e) {
            // In case of any error during input reading, proceed with the default length.
            // No error message is printed as per "No explanation, ONLY code" requirement.
        }

        // If, by some unforeseen circumstance (e.g., initial seriesLength was negative which is not the case here),
        // the length ends up being non-positive, exit.
        if (seriesLength <= 0) {
            return;
        }

        long a = 0; // First Fibonacci number
        long b = 1; // Second Fibonacci number

        // Print the Fibonacci series
        if (seriesLength >= 1) {
            System.out.print(a);
        }
        if (seriesLength >= 2) {
            System.out.print(", " + b);
        }

        // Calculate and print the rest of the series
        for (int i = 2; i < seriesLength; i++) {
            long next = a + b;
            System.out.print(", " + next);
            a = b;
            b = next;
        }
        System.out.println(); // Print a new line at the end for clean output
    }
}