package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ChangeListNameRequest;
import com.maker.Smart_To_Do_List.dto.GetListDto;
import com.maker.Smart_To_Do_List.dto.SortDto;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.mapper.ToDoListMapper;
import com.maker.Smart_To_Do_List.mapper.UserMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ListService {

    private final ListRepository listRepository;
    private final UserRepository userRepository;
    private final VerificationService verificationService;

    /**
     [createList]: ToDoList를 생성하는 서비스
     listName: 리스트 이름
     userId: 생성한 유저의 아이디
     **/
    public ToDoListDto createList(String listName, String userId){

        // 유저 조회 및 검증
        User selectedUser = verificationService.foundUser(userId);

        // ToDoList 이름 중복 검증(동일 유저에 한해서)
        verificationService.checkListNameDuplicate(
                userId,
                listName
        );

        // ToDoList 도메인에 리스트 이름, 소유자 저장
        ToDoList toDoList = ToDoList.builder()
                .listId(UUID.randomUUID().toString().replace("-", ""))
                .listName(listName)
                .user(selectedUser)
                .build();

        // DB에 저장
        ToDoList savedToDoList = listRepository.save(toDoList);

        // ToDoList 도메인 -> ToDoList 아이디, 이름이 담긴 Dto
        return ToDoListMapper.convertToDto(savedToDoList);
    }

    /**
     [getToDoLists]: 특정 유저가 소유한 ToDoList를 모두 조회하는 서비스
     userId: ToDoList를 조회할 유저의 아이디
     **/
    public List<ToDoListDto> getToDoLists(String userId){

        // 유저 조회 및 검증
        User user = verificationService.foundUser(userId);

        List<ToDoList> toDoLists = listRepository.findByUser_UserIdOrderByCreatedDateAsc(userId);

        return ToDoListMapper.convertToDtoList(toDoLists);
    }

    /**
     [getToDoList]: ToDoList를 조회하는 서비스
     userId: ToDoList를 조회할 유저의 아이디
     listId: 조회할 ToDoList의 아이디
     **/
    public ToDoListDto getToDoList(String userId, String listId){

        // 접근한 ToDoList에 대해 접근자와 소유자가 동일한지 검증
        verificationService.checkListUser(
                userId,
                listId
        );

        // ToDoList 조회 및 검증
        ToDoList selectList = verificationService.foundList(listId);
        return ToDoListMapper.convertToDto(selectList);

    }


    /**
     [changeListName]: ToDoList 이름을 변경하는 서비스
     userId: ToDoList 이름 변경을 요청한 유저의 아이디
     listId: 변경할 ToDoList의 아이디
     changeListNameRequest: 바꿀 이름
     **/
    public ToDoListDto changeListName(String userId,String listId,ChangeListNameRequest changeListNameRequest){

        // 변경할 ToDoList에 대해 접근자와 소유자가 동일한지 검증
        verificationService.checkListUser(
                userId,
                listId
        );

        // 변경할 이름이 중복되는지 검증 (해당 유저에 한해)
        verificationService.checkListNameDuplicate(
                userId,
                changeListNameRequest.getChangeListName()
        );

        ToDoList updateToDoList = verificationService.foundList(listId);

        // ToDoList 이름 변경
        updateToDoList.setListName(changeListNameRequest.getChangeListName());
        ToDoList saveList = listRepository.save(updateToDoList);
        return ToDoListMapper.convertToDto(saveList);
    }

    /**
     [deleteToDoList]: ToDoList 삭제 서비스
     userId: ToDoList 삭제 요청한 유저의 아이디
     listId: 삭제할 ToDoList의 아이디
     **/
    public void deleteToDoList(String userId, String listId) throws IOException{

        // 삭제할 ToDoList에 대해 접근자와 소유자가 동일한지 검증
        verificationService.checkListUser(
                userId,
                listId
        );

        // ToDoList 삭제
        listRepository.deleteById(listId);
    }
}
