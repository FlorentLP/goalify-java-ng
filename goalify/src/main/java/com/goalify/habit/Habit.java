package com.goalify.habit;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.goalify.goal.Goal;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "habits")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;

    @Column(nullable = false)
    private String name;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(name = "effort_point", nullable = false)
    @Min(1)
    private int effortPoint = 1;

    @Column(name = "has_data", nullable = false)
    private boolean hasData = false;

    @Column(name = "scheduled_time", nullable = false)
    private LocalTime scheduledTime = LocalTime.of(9, 0);

    @Column(name = "emoji", length = 10, nullable = true)
    private String emoji;

    @Column(name = "recurrence_monday", nullable = false)
    private boolean recurrenceMonday = true;

    @Column(name = "recurrence_tuesday", nullable = false)
    private boolean recurrenceTuesday = true;

    @Column(name = "recurrence_wednesday", nullable = false)
    private boolean recurrenceWednesday = true;

    @Column(name = "recurrence_thursday", nullable = false)
    private boolean recurrenceThursday = true;

    @Column(name = "recurrence_friday", nullable = false)
    private boolean recurrenceFriday = true;

    @Column(name = "recurrence_saturday", nullable = false)
    private boolean recurrenceSaturday = true;

    @Column(name = "recurrence_sunday", nullable = false)
    private boolean recurrenceSunday = true;

    public Habit(
        
        Goal goal,
        String name,
        int effortPoint,
        Boolean hasData,
        LocalTime scheduledTime,
        String emoji,
        boolean recurrenceMonday,
        boolean recurrenceTuesday,
        boolean recurrenceWednesday,
        boolean recurrenceThursday,
        boolean recurrenceFriday,
        boolean recurrenceSaturday,
        boolean recurrenceSunday
    ) {
    this.goal = goal;
    this.name = name;
    this.effortPoint = effortPoint;
    this.hasData = hasData;
    this.scheduledTime = scheduledTime != null ? scheduledTime : LocalTime.of(9, 0);
    this.emoji = emoji;
    this.recurrenceMonday = recurrenceMonday;
    this.recurrenceTuesday = recurrenceTuesday;
    this.recurrenceWednesday = recurrenceWednesday;
    this.recurrenceThursday = recurrenceThursday;
    this.recurrenceFriday = recurrenceFriday;
    this.recurrenceSaturday = recurrenceSaturday;
    this.recurrenceSunday = recurrenceSunday;
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
