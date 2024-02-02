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

    /**
     [checkLoginIdDup]: 회원가입 시, 아이디 중복 검증
     loginId: 검증할 아이디
     **/
    public boolean checkLoginIdDup(String loginId){
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isPresent()){
            return true;
        };
        return false;
    }

    /**
     [checkUserNameDup]: 회원가입 시, 유저이름 중복 검증
     userName: 중복 검증할 유저 이름
     **/
    public boolean checkUserNameDup(String userName){
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()){
            return true;
        };
        return false;
    }

    /**
     [checkListUser]: 접근한 ToDoList에 대해 접근자와 소유자가 동일한지 검증
     userId: 검증할 소유자 아이디
     listId: 검증할 리스트 아이디
     **/
    public void checkListUser(String userId, String listId){
        listRepository.findByListId(listId)
                .ifPresent(list->{
                    if(!list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.ACCESS_DENIED,"Wrong Access!");
                    }
                });
    }

    /**
     [checkListNameDuplicate]: ToDoList 이름 중복 검증(동일 유저에 한해서)
     userId: 동일 소유자인지 검증할 유저 아이디
     listName: 중복 검증할 리스트 이름
     **/

    public void checkListNameDuplicate(String userId, String listName){
        listRepository.findByListName(listName)
                .ifPresent(list ->{
                    if (list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.DUPLICATED, listName + " is already exits");
                    }
                });
    }

    /**
     [foundList]: ToDoList 조회 및 검증
     listId: 탐색할 리스트 아이디
     **/
    public ToDoList foundList(String listId){
        Optional<ToDoList> opToDoList = listRepository.findByListId(listId);
        if (opToDoList.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "ToDoList is not found!!");
        }
        return opToDoList.get();
    }
    /**
     [foundToDo]: ToDo 조회 및 검증
     toDoId: 탐색할 todo
     **/
    public ToDo foundToDo(String toDoId){
        Optional<ToDo> opToDo = toDoRepository.findByToDoId(toDoId);
        if (opToDo.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "ToDo is not found!!");
        }
        return opToDo.get();
    }
    /**
     [foundUser]: 고유번호를 통해 유저 조회 및 검증
     userId: 탐색할 유저 아이디
     **/
    public User foundUser(String userId){
        Optional<User> user = userRepository.findByUserId(userId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "User is not found!!");
        }
        return user.get();
    }
    /**
     [foundUserByLoginId]:  로그인Id를 통해 유저 조회 및 검증
     loginId: 유저를 조회할 로그인 아이디
     **/
    public User foundUserByLoginId(String loginId){
        Optional<User> user = userRepository.findByLoginId(loginId);
        if (user.isEmpty()){
            throw new AppException(ErrorCode.NOT_FOUND, "User is not found!!");
        }
        return user.get();
    }
    /**
     [checkPassword]: 패스워드 검증
     loginPw: 확인할 비밀번호
     user: 비밀번호 주인인지 확인할 user 객체
     **/
    public void checkPassword(String loginPw, User user){
        if(!encoder.matches(loginPw,user.getLoginPw())){
            throw new AppException(ErrorCode.INVALID_PASSWORD, "The password is wrong.");
        }
    }

    /**
     []
     **/
    // 미사용 함수
    public ToDoList foundMainList(String listId){
        Optional<ToDoList> opToDoList = listRepository.findByListId(listId);
        if (opToDoList.isEmpty()){
            return null;
        }
        return opToDoList.get();
    }
}
