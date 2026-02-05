package com.goalify.goal.dto;
import com.goalify.goal.GoalCategory;
import com.goalify.goal.GoalStatus;
import com.goalify.goal.GoalType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateGoalRequestDto {
    @NotBlank
    private String name;

    @NotNull
    private GoalStatus goalStatus;

    @NotNull
    private GoalType goalType;

    @NotNull
    private GoalCategory goalCategory;
    
    @Min(1)
    @Max(5)
    private int priority;

    private String image;
    
    private Integer daysNeeded;

    private Integer effortsNeeded;
}
