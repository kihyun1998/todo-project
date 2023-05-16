package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.auth.JwtUtil;
import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.CreateToDoRequest;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.ToDoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ListRepository listRepository;
    private final ToDoRepository toDoRepository;

    public String createToDo(CreateToDoRequest createToDoRequest, Long listId) {

        ToDoList selectedList = listRepository.findByListId(listId)
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND, listId + "is not found!!"));

        ToDo toDo = ToDo.builder()
                .todoTitle(createToDoRequest.getTodoTitle())
                .estimatedTime(createToDoRequest.getEstimatedTime())
                .deadline(createToDoRequest.getDeadline())
                .difficulty(createToDoRequest.getDifficulty())
                .importance(createToDoRequest.getImportance())
                .status(createToDoRequest.getStatus())
                .build();
//              .toDoList(selectedList)

        selectedList.addToDo(toDo);
        listRepository.save(selectedList);
//        toDoRepository.save(toDo);
        return listId + "에 저장 완료";
    }

    public List<ToDo> getToDos(long listId){
        return toDoRepository.findByToDoList_ListId(listId);
    }
}
