package com.goalify.habit.dto;

import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateHabitRequestDto {
    @NotNull
    private Long goal_id;
    
    @NotBlank
    private String name;

    @NotNull
    private Integer effortPoint;

    @NotNull
    private Boolean hasData;

    @NotNull
    private LocalTime scheduledTime;

    private String emoji;

    private boolean recurrenceMonday;
    private boolean recurrenceTuesday;
    private boolean recurrenceWednesday;
    private boolean recurrenceThursday;
    private boolean recurrenceFriday;
    private boolean recurrenceSaturday;
    private boolean recurrenceSunday;
}
