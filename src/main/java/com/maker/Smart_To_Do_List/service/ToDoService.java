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

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ListRepository listRepository;
    private final ToDoRepository toDoRepository;
    private final VerificationService verificationService;

    public String createToDo(Long userId, Long listId, CreateToDoRequest createToDoRequest) {

        verificationService.checkListUser(
                userId,
                listId
        );

        ToDo toDo = ToDo.builder()
                .todoTitle(createToDoRequest.getTodoTitle())
                .estimatedTime(createToDoRequest.getEstimatedTime())
                .deadline(createToDoRequest.getDeadline())
                .difficulty(createToDoRequest.getDifficulty())
                .importance(createToDoRequest.getImportance())
                .status(createToDoRequest.getStatus())
                .build();

        ToDoList selectedList = listRepository.findByListId(listId)
                .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND, listId + "is not found!!"));

        selectedList.addToDo(toDo);
        listRepository.save(selectedList);

        return null;
    }

    public List<ToDo> getToDos(long userId,long listId){
        verificationService.checkListUser(
                userId,
                listId
        );

        return toDoRepository.findByToDoList_ListId(listId);
    }
}
