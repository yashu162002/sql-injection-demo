package com.example.sqllab.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LoginService {

    private final JdbcTemplate jdbcTemplate;

    public LoginService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * VULNERABLE APPROACH: Direct String Concatenation.
     * 
     * Difference:
     * User inputs are directly pasted into the SQL command string.
     * If input contains single quotes or SQL syntax (e.g. ' OR '1'='1), the database parser
     * interprets user input as SQL commands rather than literal text string data.
     * This alters the logical structure of the query execution plan.
     */
    public List<Map<String, Object>> vulnerableLogin(
            String username,
            String password) {

        String sql =
                "SELECT id, username, role FROM users " +
                "WHERE username = '" + username + "' " +
                "AND password = '" + password + "'";

        System.out.println("Executing Vulnerable SQL: " + sql);

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * SECURE APPROACH: Parameterized Query (Prepared Statements).
     * 
     * Difference:
     * The SQL statement structure is pre-compiled using placeholders ('?').
     * The database driver sends the user inputs separately as pure data parameters.
     * Even if input contains SQL operators or single quotes, the database engine treats it strictly
     * as literal data values for the username/password fields, preventing query logic manipulation.
     */
    public List<Map<String, Object>> secureLogin(
            String username,
            String password) {

        String sql =
                "SELECT id, username, role FROM users " +
                "WHERE username = ? AND password = ?";

        System.out.println("Executing Secure SQL (Parameterized): " + sql);

        return jdbcTemplate.queryForList(
                sql,
                username,
                password
        );
    }
}