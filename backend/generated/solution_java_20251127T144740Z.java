import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<String> lines = new ArrayList<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // Stop reading if the line is empty or just whitespace,
            // which often signifies the end of the matrix input.
            if (line.trim().isEmpty()) {
                break;
            }
            lines.add(line);
        }
        scanner.close();

        if (lines.isEmpty() || lines.get(0).isEmpty()) {
            System.out.println(0);
            return;
        }

        int rows = lines.size();
        int cols = lines.get(0).length();
        char[][] grid = new char[rows][cols];
        for (int i = 0; i < rows; i++) {
            grid[i] = lines.get(i).toCharArray();
        }

        System.out.println(numIslands(grid));
    }

    /**
     * Calculates the number of islands in a grid.
     * An island is a group of '1's (land) connected horizontally or vertically.
     *
     * @param grid The 2D grid representing land ('1') and water ('0').
     * @return The total number of islands.
     */
    public static int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }

        int numRows = grid.length;
        int numCols = grid[0].length;
        int islandCount = 0;

        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                // If a cell contains '1', it's the start of a new island
                if (grid[i][j] == '1') {
                    islandCount++;
                    // Use DFS to find all parts of this island and sink them
                    dfs(grid, i, j);
                }
            }
        }

        return islandCount;
    }

    /**
     * Performs a Depth-First Search (DFS) to find and "sink" an island.
     * Sinking is done by changing '1's to '0's to mark them as visited.
     *
     * @param grid The grid containing the map.
     * @param r    The current row index.
     * @param c    The current column index.
     */
    private static void dfs(char[][] grid, int r, int c) {
        int numRows = grid.length;
        int numCols = grid[0].length;

        // Base cases for stopping the recursion:
        // 1. Out of bounds (row or column)
        // 2. Current cell is water or already visited ('0')
        if (r < 0 || c < 0 || r >= numRows || c >= numCols || grid[r][c] == '0') {
            return;
        }

        // Mark the current cell as visited by changing it to '0' (sinking it)
        grid[r][c] = '0';

        // Recursively call dfs for all 4 neighbors (up, down, left, right)
        dfs(grid, r + 1, c); // down
        dfs(grid, r - 1, c); // up
        dfs(grid, r, c + 1); // right
        dfs(grid, r, c - 1); // left
    }
}