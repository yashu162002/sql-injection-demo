package sqllab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"sqllab", "com.example.sqllab"})
public class SqllabApplication {

	public static void main(String[] args) {
		SpringApplication.run(SqllabApplication.class, args);
	}

}

