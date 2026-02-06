package com.goalify.habit;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goalify.habit.dto.CreateHabitRequestDto;
import com.goalify.habit.dto.HabitResponseDto;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/habits")
public class HabitController {
    private final HabitService habitService;

    public HabitController(HabitService habitService){
        this.habitService = habitService;
    }

    @PostMapping()
    public ResponseEntity<?> createHabit(@Valid @RequestBody CreateHabitRequestDto request) {
        try {
            HabitResponseDto response = habitService.createHabit(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalStateException e) {
            if ("Goal not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your goal".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Habit creation failed"));
        }
    }
    
    @GetMapping()
    public ResponseEntity<?> getHabits() {
        try {
            List<Habit> habits = habitService.getHabits();

            List<HabitResponseDto> response = habits.stream()
            .map(habit -> new HabitResponseDto(habit))
            .toList();

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Could not load habits"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHabit(@PathVariable Long id) {
        try {
            Habit habit = habitService.getHabit(id);

            HabitResponseDto response = new HabitResponseDto(habit);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }  catch (IllegalStateException e) {
            if ("Habit not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your habit".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Could not load habit"));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateHabit(@PathVariable Long id, @Valid @RequestBody CreateHabitRequestDto request) {
        try {
            HabitResponseDto response = habitService.updateHabit(id, request);
            return ResponseEntity.ok(response);
        }  catch (IllegalStateException e) {
            if ("Habit not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your habit".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            if ("Goal not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your goal".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Habit update failed"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHabit(@PathVariable Long id) {
        try {
            habitService.deleteHabit(id);
            return ResponseEntity.noContent().build();
        }  catch (IllegalStateException e) {
            if ("Habit not found".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
            }
            if ("Not your habit".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Habit deletion failed"));
        }
    }

}
