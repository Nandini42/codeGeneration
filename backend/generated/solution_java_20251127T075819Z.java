import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Read the number of rows from the user
        int rows = scanner.nextInt();
        
        // Outer loop to handle number of rows
        for (int i = 1; i <= rows; i++) {
            
            // Inner loop to handle number of columns
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
                // Print a space if it's not the last star in the row
                if (j < i) {
                    System.out.print(" ");
                }
            }
            
            // Move to the next line after each row is printed
            System.out.println();
        }
        
        scanner.close();
    }
}