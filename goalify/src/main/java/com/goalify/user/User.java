package com.goalify.user;

import java.time.LocalDateTime;
import java.util.List;

import com.goalify.goal.Goal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String image;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Goal> goals;

    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;

    }

      @PrePersist
      protected void onCreate() {
          this.createdAt = LocalDateTime.now();
          this.updatedAt = LocalDateTime.now();

      }
      @PreUpdate
      protected void onUpdate() {
          this.updatedAt = LocalDateTime.now();
      }
}
