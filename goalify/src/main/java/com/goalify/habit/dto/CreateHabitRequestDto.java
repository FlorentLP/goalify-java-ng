package com.goalify.habit.dto;

import java.time.LocalTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateHabitRequestDto {
    @NotNull
    private Long goalId;
    
    @NotBlank
    private String name;

    @NotNull
    @Min(1)
    @Max(10)
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
