package com.maker.Smart_To_Do_List.repository;

import com.maker.Smart_To_Do_List.domain.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    Optional<ToDo> findByToDoId(Long toDoId);
    List<ToDo> findByToDoList_ListId(Long listId);
}
