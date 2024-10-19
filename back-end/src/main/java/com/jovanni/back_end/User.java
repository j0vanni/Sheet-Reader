package com.jovanni.back_end;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 45)
    private String username;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(name = "date_created")
    private Long dateCreated;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PerformanceSummary> tests;

    public User() {
        this.tests = new ArrayList<>();
        this.dateCreated = new Date().getTime();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.tests = new ArrayList<>();
        this.dateCreated = new Date().getTime();
    }

    public Long getDateCreated() {
        return dateCreated;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<PerformanceSummary> getTests() {
        return tests;
    }

    public void addTest(PerformanceSummary test) {
        test.setUser(this);
        tests.add(test);
    }

    public void setTests(List<PerformanceSummary> tests) {
        this.tests = tests;
    }
}
