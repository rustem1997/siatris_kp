package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.model.UserInformation;
import org.springframework.data.repository.CrudRepository;

public interface UserInformationRepository extends CrudRepository<UserInformation, Long> {
    UserInformation findByUserId(User userId);

}
