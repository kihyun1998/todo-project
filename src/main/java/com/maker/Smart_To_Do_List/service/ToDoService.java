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


// @RequireArgsConstructor를 사용하면
// final 또는 @NotNull을 사용하여 생성자를 자동으로 생성해준다.
@Service
@RequiredArgsConstructor
public class ToDoService {
    private final ListRepository listRepository;
    private final ToDoRepository toDoRepository;
    private final VerificationService verificationService;


    /**
     [createToDo]:ToDo를 생성하는 서비스
     userId: 생성한 유저의 아이디
     listId: 들어갈 list 아이디
     createToDoRequest: ToDo를 생성할 때 사용하는 dto
     **/
    public void createToDo(Long userId,
                           Long listId,
                           CreateToDoRequest createToDoRequest) {
        // 해당 리스트를 소유한 유저인지 체크
        verificationService.checkListUser(
                userId,
                listId
        );

        // builder를 통해 ToDo를 생성한다.
        ToDo toDo = ToDo.builder()
                .todoTitle(createToDoRequest.getTodoTitle())
                .estimatedTime(createToDoRequest.getEstimatedTime())
                .deadline(createToDoRequest.getDeadline())
                .difficulty(createToDoRequest.getDifficulty())
                .importance(createToDoRequest.getImportance())
                .status(createToDoRequest.getStatus())
                .build();

        // 해당 리스트 아이디가 존재하는지 확인한다.
        // verificationService가 아니라 listService에 있어야 할 듯
        ToDoList selectedList = verificationService.foundList(listId);
        selectedList.addToDo(toDo); // 입력받은 리스트에 ToDo추가
        listRepository.save(selectedList); // ToDo를 추가한 리스트 저장
    }

    /**
     [getToDos]: 유저아이디와 리스트 아이디를 받아 모든 todo를 조회
     userId: 유저가 소유한 리스트만 보여주고 싶어서 유저 아이디도 입력
     listId: 반환하고 싶은 리스트 입력
     **/
    public List<ToDo> getToDos(long userId,long listId){
        // 해당 리스트를 소유한 유저인지 체크
        verificationService.checkListUser(
                userId,
                listId
        );

        // JPA를 사용하여 리스트를 통한 모든 ToDo조회 후 return
        return toDoRepository.findByToDoList_ListId(listId);
    }

    public CreateToDoRequest updateToDoValue(long userId,
                                             long listId,
                                             long toDoId,
                                             CreateToDoRequest createToDoRequest) {
        // 해당 리스트를 소유한 유저인지 체크
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
        ToDo saveToDo = toDoRepository.save(updateToDo);
        return ToDoMapper.convertToToDoRequest(saveToDo);
    }

    /**
     [changeStatus]: todo 상태 변경
     userId: 검증을 위한 유저 아이디
     listId: 검증을 위한 리스트 아이디
     toDoId: 상태를 변경할 todo아이디
     **/
    public void changeStatus(long userId,
                             long listId,
                             long toDoId,
                             ChangeStatus changeStatus){
        // 해당 리스트를 소유한 유저인지 체크
        verificationService.checkListUser(
                userId,
                listId
        );

        ToDo updateToDo = verificationService.foundToDo(toDoId);
        updateToDo.setStatus(changeStatus.getStatus());
        toDoRepository.save(updateToDo);
    }

    /**
     [deleteToDo]: todo 제거
     userId: 검증을 위한 유저 아이디
     listId: 검증을 위한 리스트 아이디
     toDoId: 삭제할 todo아이디
     **/
    public void deleteToDo(long userId,
                           long listId,
                           long toDoId)throws IOException {

        // 해당 리스트를 소유한 유저인지 체크
        verificationService.checkListUser(
                userId,
                listId
        );
        toDoRepository.deleteById(toDoId);
    }
}
