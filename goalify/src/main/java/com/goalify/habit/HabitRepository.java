package com.goalify.habit;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HabitRepository extends JpaRepository<Habit, Long>{
    
    @Query("SELECT h FROM Habit h WHERE h.goal.user.id = :userId")
    List<Habit> findByUserId(@Param("userId") Long userId);
}
