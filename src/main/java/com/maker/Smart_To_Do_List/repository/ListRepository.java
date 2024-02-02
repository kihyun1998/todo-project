package com.maker.Smart_To_Do_List.repository;


import com.maker.Smart_To_Do_List.domain.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ListRepository extends JpaRepository<ToDoList, String> {
    Optional<ToDoList> findByListName(String listName);
    Optional<ToDoList> findByListId(String listId);
    List<ToDoList> findByUser_UserId(String userId);
    List<ToDoList> findByUser_UserIdOrderByCreatedDateAsc(String userId);
    List<ToDoList> findByUser_UserIdOrderByCreatedDateDesc(String userId);
    List<ToDoList> findByUser_UserIdOrderByListNameAsc(String userId);
    List<ToDoList> findByUser_UserIdOrderByListNameDesc(String userId);
}
