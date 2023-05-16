package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.auth.JwtUtil;
import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.CreateToDoRequest;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.mapper.ToDoMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.ToDoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;


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

    public CreateToDoRequest updateToDoValue(long userId,
                             long listId,
                             long todoId,
                             CreateToDoRequest createToDoRequest) {

        Optional<ToDo> todo = toDoRepository.findByToDoId(todoId);
        if (todo.isEmpty()) {
            throw new AppException(ErrorCode.NOT_FOUND, "ToDo is not found!!");
        }

        ToDo updateToDo = todo.get();

        if(!updateToDo.getTodoTitle().equals(createToDoRequest.getTodoTitle())){
            updateToDo.setTodoTitle(createToDoRequest.getTodoTitle());
        }
        if(updateToDo.getEstimatedTime() != createToDoRequest.getEstimatedTime()){
            updateToDo.setEstimatedTime(createToDoRequest.getEstimatedTime());
        }
        if(!updateToDo.getDeadline().isEqual(createToDoRequest.getDeadline()) ){
            updateToDo.setDeadline(createToDoRequest.getDeadline());
        }
        if(updateToDo.getDifficulty() != createToDoRequest.getDifficulty()){
            updateToDo.setDifficulty(createToDoRequest.getDifficulty());
        }
        if(updateToDo.getImportance() != createToDoRequest.getImportance()){
            updateToDo.setImportance(createToDoRequest.getImportance());
        }
        ToDo saveToDo = toDoRepository.save(updateToDo);
        return ToDoMapper.convertToToDoRequest(saveToDo);
    }
}
