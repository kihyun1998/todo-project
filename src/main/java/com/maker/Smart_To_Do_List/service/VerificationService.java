package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.domain.ToDo;
import com.maker.Smart_To_Do_List.domain.ToDoList;
import com.maker.Smart_To_Do_List.domain.User;
import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import com.maker.Smart_To_Do_List.repository.ToDoRepository;
import com.maker.Smart_To_Do_List.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final ListRepository listRepository;
    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public boolean checkLoginIdDup(String loginId){
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isPresent()){
            return true;
        };
        return false;
    }

    public boolean checkUserNameDup(String userName){
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()){
            return true;
        };
        return false;
    }


    public void checkListUser(Long userId, Long listId){
        listRepository.findByListId(listId)
                .ifPresent(list->{
                    if(!list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.ACCESS_DENIED,"Wrong Access!");
                    }
                });
    }

    public void checkListNameDuplicate(Long userId, String listName){
        listRepository.findByListName(listName)
                .ifPresent(list ->{
                    if (list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.DUPLICATED, listName + " is already exits");
                    }
                });
    }


    public ToDoList foundList(Long listId){
        Optional<ToDoList> opToDoList = listRepository.findByListId(listId);
        if (opToDoList.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "ToDoList is not found!!");
        }
        return opToDoList.get();
    }

    public ToDo foundToDo(Long toDoId){
        Optional<ToDo> opToDo = toDoRepository.findByToDoId(toDoId);
        if (opToDo.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "ToDo is not found!!");
        }
        return opToDo.get();
    }

    public User foundUser(Long userId){
        Optional<User> user = userRepository.findByUserId(userId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "User is not found!!");
        }
        return user.get();
    }

    public User foundUserByLoginId(String loginId){
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "User is not found!!");
        }
        return user.get();
    }

    public void checkPassword(String loginPw, User user){
        if(!encoder.matches(loginPw,user.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }
    }

    public ToDoList foundMainList(Long listId){
        Optional<ToDoList> opToDoList = listRepository.findByListId(listId);
        if (opToDoList.isEmpty()){
            return null;
        }
        return opToDoList.get();
    }
}
