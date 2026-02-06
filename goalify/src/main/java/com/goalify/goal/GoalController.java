package com.goalify.goal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.goalify.goal.dto.CreateGoalRequestDto;
import com.goalify.goal.dto.GoalResponseDto;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/goals")
public class GoalController {
    
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping()
    public ResponseEntity<?> createGoal(@Valid @RequestBody CreateGoalRequestDto request) {
        try {
            GoalResponseDto response = goalService.createGoal(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Goal creation failed"));
        }
    }

    @GetMapping()
    public ResponseEntity<?> getGoals(
        @RequestParam(required = false) GoalStatus status
    ) {
        try {
            List<Goal> goals = goalService.getGoals(status);

            List<GoalResponseDto> dtos = goals.stream()
            .map(goal -> new GoalResponseDto(goal))
            .toList();

            return ResponseEntity.status(HttpStatus.OK).body(dtos);
        }  catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Could not load goals"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGoal(
        @PathVariable Long id 
    ) {
        try {
            Goal goal = goalService.getGoal(id);

            GoalResponseDto dto = new GoalResponseDto(goal);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (IllegalStateException e) {
            if ("Goal not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your goal".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Could not load goal"));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id, @Valid @RequestBody CreateGoalRequestDto request) {
        try {
            GoalResponseDto response = goalService.updateGoal(id, request);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            if ("Goal not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your goal".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Goal update failed"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id) {
        try {
            goalService.deleteGoal(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            if ("Goal not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your goal".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Goal delete failed"));
        }
    }
}
