package com.maker.Smart_To_Do_List.domain;


import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "toDoList", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "lzist_id")})
public class ToDoList extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="list_id", unique = true, nullable = false)
    private Long listId;

    @NotNull
    @Column(name = "list_name")
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