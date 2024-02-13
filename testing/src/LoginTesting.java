import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;

public class LoginTesting {
    public static void main(String[] args){
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\civbf\\Downloads\\personal-page\\testing\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/");

        WebElement element = driver.findElement(By.className("music-play-btn"));
        element.click();

        
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.quit();
        
    
    }
}
