package com.goalify.habit;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.goalify.goal.Goal;
import com.goalify.goal.GoalRepository;
import com.goalify.habit.dto.CreateHabitRequestDto;
import com.goalify.habit.dto.HabitResponseDto;

@Service
public class HabitService {
    private final HabitRepository habitRepository;
    private final GoalRepository goalRepository;


    public HabitService (HabitRepository habitRepository, GoalRepository goalRepository){
        this.habitRepository = habitRepository;
        this.goalRepository = goalRepository;
    }

    public HabitResponseDto createHabit(CreateHabitRequestDto dto){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        Goal goal = goalRepository.findById(dto.getGoal_id()).orElseThrow(() -> new IllegalStateException("Goal not found"));
        if (!goal.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Not your goal");
        }
        Habit habit = new Habit(
            goal,
            dto.getName(),
            dto.getEffortPoint(),
            dto.getHasData(),
            dto.getScheduledTime(),
            dto.getEmoji(),
            dto.isRecurrenceMonday(),
            dto.isRecurrenceTuesday(),
            dto.isRecurrenceWednesday(),
            dto.isRecurrenceThursday(),
            dto.isRecurrenceFriday(),
            dto.isRecurrenceSaturday(),
            dto.isRecurrenceSunday()
        );

        habitRepository.save(habit);

        return new HabitResponseDto(habit);
    }

    public List<Habit> getHabits(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        return habitRepository.findByUserId(userId);
    }

    public Habit getHabit(Long id){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        Habit habit = habitRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException("Habit not found"));

        if (!habit.getGoal().getUser().getId().equals(userId)) {
        throw new IllegalStateException("Not your habit");
        }
        return habit;
    }
    public HabitResponseDto updateHabit(Long id, CreateHabitRequestDto dto){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        Habit habit = habitRepository.findById(id)
        .orElseThrow(() -> new IllegalStateException("Habit not found"));

        if (!habit.getGoal().getUser().getId().equals(userId)) {
        throw new IllegalStateException("Not your habit");
        }
        if (!habit.getGoal().getId().equals(dto.getGoal_id())) {
            Goal dtoGoal = this.goalRepository.findById(dto.getGoal_id())
            .orElseThrow(() -> new IllegalStateException("Goal not found"));
            
            if (!dtoGoal.getUser().getId().equals(userId)) {
                throw new IllegalStateException("Not your goal");
            }
            habit.setGoal(dtoGoal);
        }
        habit.setName(dto.getName());
        habit.setEffortPoint(dto.getEffortPoint());
        habit.setHasData(dto.getHasData());
        habit.setScheduledTime(dto.getScheduledTime());
        habit.setEmoji(dto.getEmoji());
        habit.setRecurrenceMonday(dto.isRecurrenceMonday());
        habit.setRecurrenceTuesday(dto.isRecurrenceTuesday());
        habit.setRecurrenceWednesday(dto.isRecurrenceWednesday());
        habit.setRecurrenceThursday(dto.isRecurrenceThursday());
        habit.setRecurrenceFriday(dto.isRecurrenceFriday());
        habit.setRecurrenceSaturday(dto.isRecurrenceSaturday());
        habit.setRecurrenceSunday(dto.isRecurrenceSunday());

        habitRepository.save(habit);
        return new HabitResponseDto(habit);
    }
    public void deleteHabit(Long habitId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

    
        Habit habit = habitRepository.findById(habitId)
                .orElseThrow(() -> new IllegalStateException("Habit not found"));
    
        if (!habit.getGoal().getUser().getId().equals(userId)) {
            throw new IllegalStateException("Not your habit");
        }
        habitRepository.delete(habit);
    }
}
