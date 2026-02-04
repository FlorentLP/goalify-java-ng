package com.goalify.goal.dto;

import com.goalify.goal.Goal;
import com.goalify.goal.GoalCategory;
import com.goalify.goal.GoalStatus;
import com.goalify.goal.GoalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GoalResponseDto {
    private Long id;

    private String name;

    private GoalStatus goalStatus;

    private GoalType goalType;

    private GoalCategory goalCategory;
    
    private int priority;

    private String image;

    private Integer daysNeeded;

    private Integer effortsNeeded;

    public GoalResponseDto(Goal goal){
        this.id = goal.getId();
        this.name = goal.getName();
        this.goalStatus = goal.getGoalStatus();
        this.goalType = goal.getGoalType();
        this.goalCategory = goal.getGoalCategory();
        this.priority = goal.getPriority();
        this.image = goal.getImage();
        this.daysNeeded = goal.getDaysNeeded();
        this.effortsNeeded = goal.getEffortsNeeded();

    }
}