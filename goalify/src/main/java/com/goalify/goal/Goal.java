package com.goalify.goal;

import java.time.LocalDateTime;

import com.goalify.user.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "goals")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus goalStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalType goalType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalCategory goalCategory;

    @Column(nullable = false)
    @Min(1)
    @Max(5)
    private int priority = 1;

    @Column(columnDefinition = "TEXT")
    private String image;

    public Goal(
            User user,
            String name,
            GoalStatus goalStatus,
            GoalType goalType,
            GoalCategory goalCategory,
            int priority,
            String image
    ) {
        this.user = user;
        this.name = name;
        this.goalStatus = goalStatus;
        this.goalType = goalType;
        this.goalCategory = goalCategory;
        this.priority = priority;
        this.image = image;
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
