package com.maker.Smart_To_Do_List.repository;


import com.maker.Smart_To_Do_List.domain.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ListRepository extends JpaRepository<ToDoList, Long> {
    Optional<ToDoList> findByListName(String listName);
    Optional<ToDoList> findByListId(Long listId);
    List<ToDoList> findByUser_UserId(Long userId);
    List<ToDoList> findByUser_UserIdOrderByCreatedDateAsc(Long userId);
    List<ToDoList> findByUser_UserIdOrderByCreatedDateDesc(Long userId);
    List<ToDoList> findByUser_UserIdOrderByListNameAsc(Long userId);
    List<ToDoList> findByUser_UserIdOrderByListNameDesc(Long userId);
}
