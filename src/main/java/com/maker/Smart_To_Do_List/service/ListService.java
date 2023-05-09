package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.dto.ToDoListDto;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import com.maker.Smart_To_Do_List.auth.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ListService {

    private final ListRepository listRepository;
    private final UserRepository userRepository;
    private final String token = null;

    @Value("${jwt.secret}")
    private String secretKey;

    public String createList(String listName, String sortBy,String token){
        if( token != null ){
            String loginId = JwtUtil.getLoginId(token,secretKey);
            User selectedUser = userRepository.findByLoginId(loginId)
                    .orElseThrow(()->new AppException(ErrorCode.NOT_FOUND, loginId + "is not found!!"));;

            listRepository.findByListName(listName)
                    .ifPresent(list ->{

                        if (list.getUser().getLoginId().equals(loginId)){
                            throw new AppException(ErrorCode.DUPLICATED, listName + " is already exits");
                        }
                    });

            ToDoList toDoList = ToDoList.builder()
                    .listName(listName)
                    .user(selectedUser)
                    .sortBy(sortBy)
                    .build();

            listRepository.save(toDoList);
            return loginId + "의 To Do List 등록 완료";
        }
        return "Token is wrong";
    }

    public List<ToDoList> getToDoList(long userId){
        List<ToDoList> toDoLists = listRepository.findByUser_UserId(userId);
        return toDoLists;
    }

    //get  return > ListId, ListName

}
