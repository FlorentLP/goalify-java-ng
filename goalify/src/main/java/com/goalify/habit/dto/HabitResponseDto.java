package com.goalify.habit.dto;

import java.time.LocalTime;

import com.goalify.habit.Habit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HabitResponseDto {
    private Long goal_id;
    
    private String name;

    private Integer effortPoint;

    private Boolean hasData;

    private LocalTime scheduledTime;

    private String emoji;

    private Boolean recurrenceMonday;

    private Boolean recurrenceTuesday;
    
    private Boolean recurrenceWednesday;

    private Boolean recurrenceThursday;

    private Boolean recurrenceFriday;

    private Boolean recurrenceSaturday;

    private Boolean recurrenceSunday;

    public HabitResponseDto(Habit habit){
        this.goal_id = habit.getGoal().getId();
        this.name = habit.getName();
        this.effortPoint = habit.getEffortPoint();
        this.hasData = habit.isHasData();
        this.scheduledTime = habit.getScheduledTime();
        this.emoji = habit.getEmoji();
        this.recurrenceMonday = habit.isRecurrenceMonday();
        this.recurrenceTuesday = habit.isRecurrenceTuesday();
        this.recurrenceWednesday = habit.isRecurrenceWednesday();
        this.recurrenceThursday = habit.isRecurrenceThursday();
        this.recurrenceFriday = habit.isRecurrenceFriday();
        this.recurrenceSaturday = habit.isRecurrenceSaturday();
        this.recurrenceSunday = habit.isRecurrenceSunday();

    }
}
