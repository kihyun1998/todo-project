package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ChangeListNameRequest;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;
import com.maker.Smart_To_Do_List.mapper.ToDoListMapper;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ListService {

    private final ListRepository listRepository;
    private final UserRepository userRepository;
    private final VerificationService verificationService;

    public String createList(String listName, Long userId){

        User selectedUser = verificationService.foundUser(userId);

        verificationService.checkListNameDuplicate(
                userId,
                listName
        );

        ToDoList toDoList = ToDoList.builder()
                .listName(listName)
                .build();

        selectedUser.addToDoList(toDoList);
        userRepository.save(selectedUser);

        return null;

    }

    public List<ToDoList> getToDoLists(long userId){
        return listRepository.findByUser_UserId(userId);
    }

    public ToDoListDto getToDoList(Long userId, Long listId){

        verificationService.checkListUser(
                userId,
                listId
        );


        ToDoList selectList = verificationService.foundList(listId);
        return ToDoListMapper.convertToDto(selectList);

    }

    public ToDoListDto changeListName(Long userId,Long listId,ChangeListNameRequest changeListNameRequest){

        verificationService.checkListUser(
                userId,
                listId
        );

        verificationService.checkListNameDuplicate(
                userId,
                changeListNameRequest.getChangeListName()
        );

        ToDoList updateToDoList = verificationService.foundList(listId);
        updateToDoList.setListName(changeListNameRequest.getChangeListName());
        ToDoList saveList = listRepository.save(updateToDoList);
        return ToDoListMapper.convertToDto(saveList);
    }

    public void deleteToDoList(Long userId, Long listId) throws IOException{

        verificationService.checkListUser(
                userId,
                listId
        );
        listRepository.deleteById(listId);
    }
}
