package com.jovanni.back_end;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
    
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository repo;

    @Test
    public void testSignUpUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);

        User savedUser = repo.save(user);

        User existUser = entityManager.find(User.class, savedUser.getId());

        assert(existUser.getUsername() == username);
    }

    @Test
    public void testCreateUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);

        PerformanceSummary test = new PerformanceSummary();
        test.setBass(true);
        test.setTreble(true);
        test.setSharp(false);
        test.setFlat(false);
        test.setTestTime(30);
        test.setTempoMatch(false);
        test.setSameLine(false);
        test.setContinueOnWrong(false);
        test.setTestDate(new Date().getTime());

        user.addTest(test);

        User savedUser = repo.save(user);

        User existUser = entityManager.find(User.class, savedUser.getId());

        assert(existUser.getUsername() == username);
    }
}
