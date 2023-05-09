package com.maker.Smart_To_Do_List.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "toDoList", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "toDoList_id")})
public class ToDoList extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="toDoList_id", unique = true, nullable = false)
    private Long listId;

    @NotNull
    @Column(name = "toDoList_name")
    private String listName;

    /***
     ASC_DATE : 생성 날짜 오름차순
     DESC_DATE : 생성 날자 내림차순
     ASC_NAME : 이름 오름차순
     DESC_NAME : 이름 내림차순
     ***/
    @Column(name = "sort_by")
    private String sortBy = "ASC_Date";

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}