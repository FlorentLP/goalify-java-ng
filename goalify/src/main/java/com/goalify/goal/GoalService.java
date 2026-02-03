package com.goalify.goal;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.goalify.goal.dto.CreateGoalRequestDto;
import com.goalify.goal.dto.GoalResponseDto;
import com.goalify.user.User;
import com.goalify.user.UserRepository;

@Service
public class GoalService {
    
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    
    public GoalService(GoalRepository goalRepository,
        UserRepository userRepository
    ){
        this.goalRepository =goalRepository;
        this.userRepository = userRepository;
    }

    public GoalResponseDto createGoal(CreateGoalRequestDto request){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("User not found"));

        Goal goal = new Goal(
            user,
            request.getName(),
            request.getGoalStatus(),
            request.getGoalType(),
            request.getGoalCategory(),
            request.getPriority(),
            request.getImage()
        );

        goalRepository.save(goal);

        return new GoalResponseDto(goal);

    }
    public List<Goal> getGoals(GoalStatus status){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        if (status == null) {
            return goalRepository.findByUserIdOrderByCreatedAtDesc(userId);
        }
        return goalRepository.findByUserIdAndGoalStatusOrderByCreatedAtDesc(userId, status);
    }

    public Goal getGoal(Long goalId){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new IllegalStateException("Goal not found"));
        
                if (!goal.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Not your goal");
        }
        return goal;
    }

    public GoalResponseDto updateGoal(Long goalId, CreateGoalRequestDto request) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof Long)) {
            throw new IllegalStateException("User not authenticated");
        }
        Long userId = (Long) principal;

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new IllegalStateException("Goal not found"));

        if (!goal.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Not your goal");
        }

        goal.setName(request.getName());
        goal.setGoalStatus(request.getGoalStatus());
        goal.setGoalType(request.getGoalType());
        goal.setGoalCategory(request.getGoalCategory());
        goal.setPriority(request.getPriority());
        goal.setImage(request.getImage());


        goalRepository.save(goal);

        return new GoalResponseDto(goal);
    }

    public void deleteGoal(Long goalId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof Long userId)) {
            throw new IllegalStateException("User not authenticated");
        }
    
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new IllegalStateException("Goal not found"));
    
        if (!goal.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Not your goal");
        }
    
        goalRepository.delete(goal);
    }
}
