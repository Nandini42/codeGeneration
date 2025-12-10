import java.util.Scanner;

public class FibonacciRecursive {

    /**
     * Recursively calculates the Nth Fibonacci number.
     * F(0) = 0
     * F(1) = 1
     * F(n) = F(n-1) + F(n-2) for n > 1
     *
     * @param n The index of the Fibonacci number to calculate.
     * @return The Nth Fibonacci number.
     */
    public static int calculateFibonacci(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Fibonacci index cannot be negative.");
        }
        if (n == 0) {
            return 0;
        } else if (n == 1) {
            return 1;
        } else {
            return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read the number of Fibonacci terms to generate from STDIN
        // For example, if n is 5, it will print F(0), F(1), F(2), F(3), F(4)
        int numberOfTerms = scanner.nextInt();

        if (numberOfTerms < 0) {
            System.err.println("Input must be a non-negative integer.");
            scanner.close();
            return;
        }

        for (int i = 0; i < numberOfTerms; i++) {
            System.out.print(calculateFibonacci(i));
            if (i < numberOfTerms - 1) {
                System.out.print(" "); // Print space between numbers
            }
        }
        System.out.println(); // Print a newline at the end of the series

        scanner.close();
    }
}