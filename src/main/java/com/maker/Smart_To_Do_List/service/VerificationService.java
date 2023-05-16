package com.maker.Smart_To_Do_List.service;

import com.maker.Smart_To_Do_List.exception.AppException;
import com.maker.Smart_To_Do_List.exception.ErrorCode;
import com.maker.Smart_To_Do_List.repository.ListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationService {
    private final ListRepository listRepository;

    public void checkListUser(Long userId, Long listId){
        listRepository.findByListId(listId)
                .ifPresent(list->{
                    if(!list.getUser().getUserId().equals(userId)){
                        throw new AppException(ErrorCode.ACCESS_DENIED,"Wrong Access!");
                    }
                });
    }
}
