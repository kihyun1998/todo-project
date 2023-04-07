package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListService {

    private final ListRepository listRepository;

    public String createList(String listName){

        listRepository.findByListName(listName)
                .ifPresent(list -> {
                    throw new AppException(ErrorCode.DUPLICATED, listName + " is already exits");
                });

        ToDoList toDoList = ToDoList.builder()
                .listName(listName)
                .build();

        listRepository.save(toDoList);

        return "SUCCESS !!";
    }

}
