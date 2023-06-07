package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.dto.ChangeStatus;
import com.maker.Smart_To_Do_List.dto.CreateToDoRequest;
import com.maker.Smart_To_Do_List.mapper.ToDoMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.ToDoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ListRepository listRepository;
    private final ToDoRepository toDoRepository;
    private final VerificationService verificationService;

    public void createToDo(Long userId,
                           Long listId,
                           CreateToDoRequest createToDoRequest) {

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
                .need(createToDoRequest.getNeed())
                .status(createToDoRequest.getStatus())
                .build();

        ToDoList selectedList = verificationService.foundList(listId);
        selectedList.addToDo(toDo);
        listRepository.save(selectedList);
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
                                             long toDoId,
                                             CreateToDoRequest createToDoRequest) {
        verificationService.checkListUser(
                userId,
                listId
        );

        ToDo updateToDo = verificationService.foundToDo(toDoId);

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
        if(updateToDo.getNeed() != createToDoRequest.getNeed()){
            updateToDo.setNeed(createToDoRequest.getNeed());
        }
        ToDo saveToDo = toDoRepository.save(updateToDo);
        return ToDoMapper.convertToToDoRequest(saveToDo);
    }

    public void changeStatus(long userId,
                             long listId,
                             long toDoId,
                             ChangeStatus changeStatus){
        verificationService.checkListUser(
                userId,
                listId
        );

        ToDo updateToDo = verificationService.foundToDo(toDoId);
        updateToDo.setStatus(changeStatus.getStatus());
        toDoRepository.save(updateToDo);
    }

    public void deleteToDo(long userId,
                           long listId,
                           long toDoId)throws IOException {

        verificationService.checkListUser(
                userId,
                listId
        );
        toDoRepository.deleteById(toDoId);
    }
}
