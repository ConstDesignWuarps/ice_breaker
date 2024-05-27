import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import javax.swing.*;
import java.util.Random;

public class TombOfTheMaskGame extends JPanel {

    private static final char COIN_CHAR = '*';
    private static final int TILE_SIZE = 30; // Size of each tile on the map
    private static BufferedImage playerImage;
    private static Random random;
    private static int playerRow;
    private static int playerCol;
    private static int newPlayerRow;
    private static int newPlayerCol;
    public static int coinRow;
    public static int coinCol;
    public static int life = 3;
    public static int step = 0;
    public static int tjump = 2;
    public static int tbre = 2;
    public static long start;
    public static long finish;
    private char[][] map;

    public TombOfTheMaskGame() {
        map = new char[][]{
                {'#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', '!', '#', '#', ' ', '#', '#', '#', '#', '#', '!', '#', '#', '#', '#', '#', ' ', '#', '#', '!', '#'},
                {'#', ' ', '#', '#', ' ', ' ', ' ', '!', ' ', ' ', ' ', ' ', ' ', '!', ' ', ' ', ' ', '#', '#', ' ', '#'},
                {'#', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', '#'},
                {'#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#'},
                {'#', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#'},
                {'#', ' ', ' ', ' ', '!', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', '!', ' ', ' ', ' ', '#'},
                {'#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'},
                {'#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'},
                {'#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'},
                {'#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '!', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#'},
                {'#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#'},
                {'#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'}
        };

        playerRow = 19;
        playerCol = 4;
        map[playerRow][playerCol] = 'P'; // Placeholder for player image

        placeCoins();
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                char move = e.getKeyChar();
                movePlayer(move);
                repaint();
            }
        });
        setFocusable(true);
        setPreferredSize(new Dimension(map[0].length * TILE_SIZE, map.length * TILE_SIZE));
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (int x = 0; x < map.length; x++) {
            for (int y = 0; y < map[x].length; y++) {
                switch (map[x][y]) {
                    case '#':
                        g.setColor(Color.BLACK);
                        break;
                    case ' ':
                        g.setColor(Color.WHITE);
                        break;
                    case '*':
                        g.setColor(Color.YELLOW);
                        break;
                    case 'P':
                        g.drawImage(playerImage, y * TILE_SIZE, x * TILE_SIZE, TILE_SIZE, TILE_SIZE, this);
                        continue;
                    default:
                        g.setColor(Color.WHITE);
                }
                g.fillRect(y * TILE_SIZE, x * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }

    public static void main(String[] args) {
        try {
            playerImage = ImageIO.read(new File("path/to/player_image.png"));
        } catch (Exception e) {
            System.out.println("Player image not found.");
            return;
        }

        JFrame frame = new JFrame("Tomb of the Mask");
        TombOfTheMaskGame gamePanel = new TombOfTheMaskGame();
        frame.add(gamePanel);
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

        // Start the game timer
        start = System.currentTimeMillis();
    }

    public void placeCoins() {
        random = new Random();
        coinRow = random.nextInt(21);
        coinCol = random.nextInt(21);
        while (map[coinRow][coinCol] != ' ') {
            coinRow = random.nextInt(21);
            coinCol = random.nextInt(21);
        }
        map[coinRow][coinCol] = COIN_CHAR;
    }

    private void movePlayer(char move) {
        newPlayerRow = playerRow;
        newPlayerCol = playerCol;

        switch (move) {
            case 'W':
            case 'w':
                newPlayerRow--;
                step++;
                break;
            case 'S':
            case 's':
                newPlayerRow++;
                step++;
                break;
            case 'A':
            case 'a':
                newPlayerCol--;
                step++;
                break;
            case 'D':
            case 'd':
                newPlayerCol++;
                step++;
                break;
        }

        // Check if the new position is valid
        if (map[newPlayerRow][newPlayerCol] == ' ') {
            map[playerRow][playerCol] = ' ';
            playerRow = newPlayerRow;
            playerCol = newPlayerCol;
            map[playerRow][playerCol] = 'P'; // Placeholder for player image
        } else if (map[newPlayerRow][newPlayerCol] == COIN_CHAR) {
            System.out.println("YOU WON!");
            finish = System.currentTimeMillis();
            long timeElapsed = finish - start;
            System.out.println("Time: " + timeElapsed / 1000 + " seconds");
            System.out.println("Steps: " + step);
            System.exit(0);
        } else if (map[newPlayerRow][newPlayerCol] == '#') {
            life--;
            if (life == 0) {
                System.out.println("YOU LOST!");
                finish = System.currentTimeMillis();
                long timeElapsed = finish - start;
                System.out.println("Time: " + timeElapsed / 1000 + " seconds");
                System.out.println("Steps: " + step);
                System.exit(0);
            }
        }
    }
}
