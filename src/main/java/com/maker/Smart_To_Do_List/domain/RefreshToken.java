package com.maker.Smart_To_Do_List.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ref_token", schema = "mydatabase", uniqueConstraints = {@UniqueConstraint(columnNames = "token_id")})
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id", unique = true, nullable = false)
    private Long tokenId;

    @Column(name = "refresh_token",nullable = false)
    private String refreshToken;

    @Column(name = "user_email",nullable = false)
    private String userEmail;
}
