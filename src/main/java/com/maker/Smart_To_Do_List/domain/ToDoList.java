package com.maker.Smart_To_Do_List.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "list", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "list_id")})
public class ToDoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="list_id", unique = true, nullable = false)
    private Long listId;

    @Column(name = "list_name", nullable = false)
    private String listName;

    @Column(name = "created_at")
    private Date createdAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "list", cascade = CascadeType.ALL)
    private List<ToDo> toDos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}