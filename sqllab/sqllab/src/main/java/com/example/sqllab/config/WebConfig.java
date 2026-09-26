package com.example.sqllab.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${FRONTEND_USER_URL:}")
    private String frontendUserUrl;

    @Value("${FRONTEND_DEVELOPER_URL:}")
    private String frontendDeveloperUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:5173");
        origins.add("http://localhost:5174");
        origins.add("http://127.0.0.1:5173");
        origins.add("http://127.0.0.1:5174");
        origins.add("https://sql-injection-user.yashavanthtswamy16.workers.dev");
        origins.add("https://sql-injection-developer.yashavanthtswamy16.workers.dev");

        if (frontendUserUrl != null && !frontendUserUrl.trim().isEmpty()) {
            origins.add(frontendUserUrl.trim());
        }
        if (frontendDeveloperUrl != null && !frontendDeveloperUrl.trim().isEmpty()) {
            origins.add(frontendDeveloperUrl.trim());
        }

        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedOrigins(origins.toArray(new String[0]))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
