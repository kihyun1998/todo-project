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

    // 회원가입 시, 아이디 중복 검증
    public boolean checkLoginIdDup(String loginId){
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isPresent()){
            return true;
        };
        return false;
    }

    // 회원가입 시, 유저이름 중복 검증
    public boolean checkUserNameDup(String userName){
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()){
            return true;
        };
        return false;
    }

    // 접근한 ToDoList에 대해 접근자와 소유자가 동일한지 검증
    public void checkListUser(Long userId, Long listId){
        listRepository.findByListId(listId)
                .ifPresent(list->{
                    if(!list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.ACCESS_DENIED,"Wrong Access!");
                    }
                });
    }

    // ToDoList 이름 중복 검증(동일 유저에 한해서)
    public void checkListNameDuplicate(Long userId, String listName){
        listRepository.findByListName(listName)
                .ifPresent(list ->{
                    if (list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.DUPLICATED, listName + " is already exits");
                    }
                });
    }


    // ToDoList 조회 및 검증
    public ToDoList foundList(Long listId){
        Optional<ToDoList> opToDoList = listRepository.findByListId(listId);
        if (opToDoList.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "ToDoList is not found!!");
        }
        return opToDoList.get();
    }

    // ToDo 조회 및 검증
    public ToDo foundToDo(Long toDoId){
        Optional<ToDo> opToDo = toDoRepository.findByToDoId(toDoId);
        if (opToDo.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "ToDo is not found!!");
        }
        return opToDo.get();
    }

    // 고유번호를 통해 유저 조회 및 검증
    public User foundUser(Long userId){
        Optional<User> user = userRepository.findByUserId(userId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "User is not found!!");
        }
        return user.get();
    }

    // 로그인Id를 통해 유저 조회 및 검증
    public User foundUserByLoginId(String loginId){
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "User is not found!!");
        }
        return user.get();
    }

    // 패스워드 검증
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
