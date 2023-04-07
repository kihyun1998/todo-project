package com.maker.Smart_To_Do_List.repository;


import com.maker.Smart_To_Do_List.domain.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListRepository extends JpaRepository<ToDoList, Long> {
    Optional<ToDoList> findByListName(String listName);
}
